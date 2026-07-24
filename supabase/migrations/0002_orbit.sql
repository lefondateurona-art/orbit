-- ORBIT schema additions — run AFTER 0001_init.sql (same shared Supabase project as Koraa).
-- Adds companies, products (Orbit-scoped), subscriptions, transactions, invoices,
-- affiliates, ai_chats, audit_log, team_members, and extends `shops` for the
-- Koraa <-> Orbit public shop connection.

create extension if not exists "uuid-ossp";

-- ========== companies ==========
create table if not exists public.companies (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  sector text,
  logo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists companies_owner_idx on public.companies(owner_id);

alter table public.companies enable row level security;
create policy "owners can read their companies" on public.companies for select using (auth.uid() = owner_id);
create policy "owners can insert their companies" on public.companies for insert with check (auth.uid() = owner_id);
create policy "owners can update their companies" on public.companies for update using (auth.uid() = owner_id);
create policy "owners can delete their companies" on public.companies for delete using (auth.uid() = owner_id);

-- ========== team_members (grants company access to non-owner users) ==========
create table if not exists public.team_members (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'manager', 'member')),
  created_at timestamptz not null default now(),
  unique (company_id, user_id)
);
create index if not exists team_members_company_idx on public.team_members(company_id);
create index if not exists team_members_user_idx on public.team_members(user_id);

alter table public.team_members enable row level security;

-- Helper predicate used by every company-scoped policy below: the caller is
-- either the company's owner or a listed team member.
create or replace function public.is_company_member(target_company_id uuid)
returns boolean language sql stable as $$
  select exists (
    select 1 from public.companies c
    where c.id = target_company_id and c.owner_id = auth.uid()
  ) or exists (
    select 1 from public.team_members tm
    where tm.company_id = target_company_id and tm.user_id = auth.uid()
  );
$$;

create policy "company members can read team" on public.team_members for select
  using (public.is_company_member(company_id));
create policy "company owners can manage team" on public.team_members for insert
  with check (exists (select 1 from public.companies c where c.id = company_id and c.owner_id = auth.uid()));
create policy "company owners can update team" on public.team_members for update
  using (exists (select 1 from public.companies c where c.id = company_id and c.owner_id = auth.uid()));
create policy "company owners can remove team" on public.team_members for delete
  using (exists (select 1 from public.companies c where c.id = company_id and c.owner_id = auth.uid()));

-- ========== shops: extend with Orbit fields (connection point with Koraa) ==========
alter table public.shops add column if not exists company_id uuid references public.companies(id) on delete set null;
alter table public.shops add column if not exists theme text default 'default';
alter table public.shops add column if not exists font text default 'Inter';
alter table public.shops add column if not exists presentation_video_url text;
alter table public.shops add column if not exists slug text unique;
create index if not exists shops_company_idx on public.shops(company_id);
create index if not exists shops_slug_idx on public.shops(slug);

-- ========== orbit_products (Orbit-scoped, company-owned) ==========
-- NOTE: named `orbit_products` (not `products`) because `public.products` was
-- already created by Koraa's 0001_init.sql, shop-scoped (shop_id), for a
-- different purpose. Both tables coexist in the shared database.
create table if not exists public.orbit_products (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  description text,
  price integer not null,
  payment_button text not null default 'both' check (payment_button in ('wave', 'orange_money', 'both')),
  advanced_options jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists orbit_products_company_idx on public.orbit_products(company_id);

alter table public.orbit_products enable row level security;
create policy "orbit products are publicly readable" on public.orbit_products for select using (true);
create policy "company members can insert orbit products" on public.orbit_products for insert
  with check (public.is_company_member(company_id));
create policy "company members can update orbit products" on public.orbit_products for update
  using (public.is_company_member(company_id));
create policy "company members can delete orbit products" on public.orbit_products for delete
  using (public.is_company_member(company_id));

-- ========== subscriptions ==========
create table if not exists public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  company_id uuid references public.companies(id) on delete cascade,
  plan text not null check (plan in ('starter', 'pro', 'scale')),
  status text not null default 'trialing' check (status in ('trialing', 'active', 'past_due', 'cancelled')),
  trial_ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (user_id is not null or company_id is not null)
);
create index if not exists subscriptions_user_idx on public.subscriptions(user_id);
create index if not exists subscriptions_company_idx on public.subscriptions(company_id);

alter table public.subscriptions enable row level security;
create policy "owners can read their subscriptions" on public.subscriptions for select
  using (auth.uid() = user_id or (company_id is not null and public.is_company_member(company_id)));
create policy "owners can insert their subscriptions" on public.subscriptions for insert
  with check (auth.uid() = user_id or (company_id is not null and public.is_company_member(company_id)));
create policy "owners can update their subscriptions" on public.subscriptions for update
  using (auth.uid() = user_id or (company_id is not null and public.is_company_member(company_id)));

-- ========== transactions (payment receipts — Wave / Orange Money) ==========
create table if not exists public.transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete set null,
  company_id uuid references public.companies(id) on delete set null,
  subscription_id uuid references public.subscriptions(id) on delete set null,
  order_id uuid references public.orders(id) on delete set null,
  amount integer not null,
  provider text not null check (provider in ('wave', 'orange_money')),
  mode text not null default 'mock' check (mode in ('live', 'mock')),
  receipt_code text not null unique,
  provider_transaction_id text,
  status text not null default 'succeeded' check (status in ('pending', 'succeeded', 'failed')),
  created_at timestamptz not null default now()
);
create index if not exists transactions_user_idx on public.transactions(user_id);
create index if not exists transactions_company_idx on public.transactions(company_id);
create index if not exists transactions_receipt_idx on public.transactions(receipt_code);

alter table public.transactions enable row level security;
create policy "owners can read their transactions" on public.transactions for select
  using (auth.uid() = user_id or (company_id is not null and public.is_company_member(company_id)));
create policy "owners can insert their transactions" on public.transactions for insert
  with check (auth.uid() = user_id or (company_id is not null and public.is_company_member(company_id)));
-- Public receipt verification (e.g. /verify/[receiptCode]) only needs the
-- receipt_code + status/amount/provider — expose a minimal public read via a
-- security-definer function rather than opening full table access:
create or replace function public.verify_receipt(code text)
returns table (receipt_code text, amount integer, provider text, status text, created_at timestamptz)
language sql security definer stable as $$
  select receipt_code, amount, provider, status, created_at
  from public.transactions where receipt_code = code;
$$;

-- ========== invoices ==========
create table if not exists public.invoices (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid not null references public.companies(id) on delete cascade,
  number text not null unique,
  client_name text not null,
  amount integer not null,
  status text not null default 'draft' check (status in ('draft', 'sent', 'paid', 'overdue')),
  issued_at date not null default current_date,
  created_at timestamptz not null default now()
);
create index if not exists invoices_company_idx on public.invoices(company_id);

alter table public.invoices enable row level security;
create policy "company members can read invoices" on public.invoices for select using (public.is_company_member(company_id));
create policy "company members can insert invoices" on public.invoices for insert with check (public.is_company_member(company_id));
create policy "company members can update invoices" on public.invoices for update using (public.is_company_member(company_id));
create policy "company members can delete invoices" on public.invoices for delete using (public.is_company_member(company_id));

-- ========== affiliates ==========
create table if not exists public.affiliates (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  referral_code text not null unique,
  created_at timestamptz not null default now()
);
create index if not exists affiliates_owner_idx on public.affiliates(owner_id);

alter table public.affiliates enable row level security;
create policy "owners can read their affiliate profile" on public.affiliates for select using (auth.uid() = owner_id);
create policy "owners can insert their affiliate profile" on public.affiliates for insert with check (auth.uid() = owner_id);
create policy "owners can update their affiliate profile" on public.affiliates for update using (auth.uid() = owner_id);

-- ========== affiliate_clicks ==========
create table if not exists public.affiliate_clicks (
  id uuid primary key default uuid_generate_v4(),
  affiliate_id uuid not null references public.affiliates(id) on delete cascade,
  converted boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists affiliate_clicks_affiliate_idx on public.affiliate_clicks(affiliate_id);

alter table public.affiliate_clicks enable row level security;
create policy "owners can read their affiliate clicks" on public.affiliate_clicks for select
  using (exists (select 1 from public.affiliates a where a.id = affiliate_id and a.owner_id = auth.uid()));
-- Clicks are recorded anonymously (public referral links), so inserts are open;
-- writes only ever touch this narrow table and never expose PII.
create policy "anyone can record a click" on public.affiliate_clicks for insert with check (true);

-- ========== ai_chats / ai_messages ==========
create table if not exists public.ai_chats (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references public.companies(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  kind text not null default 'post_commande' check (kind in ('post_commande', 'coach')),
  title text not null,
  created_at timestamptz not null default now()
);
create index if not exists ai_chats_company_idx on public.ai_chats(company_id);

alter table public.ai_chats enable row level security;
create policy "owners can read their ai chats" on public.ai_chats for select
  using (auth.uid() = user_id or (company_id is not null and public.is_company_member(company_id)));
create policy "owners can insert their ai chats" on public.ai_chats for insert
  with check (auth.uid() = user_id or (company_id is not null and public.is_company_member(company_id)));

create table if not exists public.ai_messages (
  id uuid primary key default uuid_generate_v4(),
  chat_id uuid not null references public.ai_chats(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);
create index if not exists ai_messages_chat_idx on public.ai_messages(chat_id, created_at);

alter table public.ai_messages enable row level security;
create policy "owners can read their ai messages" on public.ai_messages for select
  using (exists (
    select 1 from public.ai_chats c where c.id = chat_id
      and (auth.uid() = c.user_id or (c.company_id is not null and public.is_company_member(c.company_id)))
  ));
create policy "owners can insert their ai messages" on public.ai_messages for insert
  with check (exists (
    select 1 from public.ai_chats c where c.id = chat_id
      and (auth.uid() = c.user_id or (c.company_id is not null and public.is_company_member(c.company_id)))
  ));

-- ========== audit_log ==========
create table if not exists public.audit_log (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references public.companies(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity text not null,
  created_at timestamptz not null default now()
);
create index if not exists audit_log_company_idx on public.audit_log(company_id, created_at desc);

alter table public.audit_log enable row level security;
create policy "company members can read audit log" on public.audit_log for select
  using (company_id is not null and public.is_company_member(company_id));
create policy "company members can insert audit log" on public.audit_log for insert
  with check (company_id is not null and public.is_company_member(company_id));

-- ========== updated_at triggers (reuse public.set_updated_at from 0001) ==========
create trigger set_companies_updated_at before update on public.companies
  for each row execute function public.set_updated_at();
create trigger set_orbit_products_updated_at before update on public.orbit_products
  for each row execute function public.set_updated_at();
create trigger set_subscriptions_updated_at before update on public.subscriptions
  for each row execute function public.set_updated_at();
