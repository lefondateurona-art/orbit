# ORBIT

Application dashboard (Next.js App Router + TypeScript + Tailwind), 2ᵉ app de
la plateforme Polaris. **Partage le même backend Supabase et le même projet
Firebase que Koraa** (`../koraa`) — voir [`SETUP_REQUIRED.md`](./SETUP_REQUIRED.md).

## Installation

```bash
npm install
```

## Configuration

```bash
cp .env.example .env.local
```

Remplir `.env.local` avec les mêmes clés Supabase / Firebase que Koraa, plus
les identifiants marchands Wave / Orange Money (optionnels — sans eux les
paiements tournent en mode simulation). Voir
[`SETUP_REQUIRED.md`](./SETUP_REQUIRED.md).

## Développement

```bash
npm run dev
```

Ouvre http://localhost:3000

## Build de production

```bash
npm run build
npm run start
```

## Vérification des types

```bash
npm run typecheck
```

## Structure

- `app/` — routes App Router : `/`, `/pricing`, `/companies`,
  `/companies/[companyId]`, `/companies/[companyId]/products`,
  `/companies/[companyId]/shop-settings`, `/orders`, `/ai-chats`,
  `/invoices`, `/reports`, `/affiliation`, `/loyalty`, `/milestones`,
  `/support`, `/messages`, `/team`, `/audit`, `/settings`,
  `/s/[shopSlug]` (boutique publique, sans auth),
  `/verify/[receiptCode]` (vérification de reçu, sans auth).
- `components/` — sidebar desktop, nav mobile, transitions de page, chrome
  applicatif (`AppChrome`), icônes.
- `lib/supabase/` — clients Supabase (browser + server, App Router).
- `lib/firebase.ts` — init Firebase App + Analytics (guard SSR).
- `lib/payments/` — adaptateurs de paiement (`PaymentProvider`) pour Wave et
  Orange Money, avec mode MOCK automatique si aucune clé API n'est présente.
- `lib/mock-data.ts` — données temporaires, à remplacer par de vraies
  requêtes Supabase.
- `supabase/migrations/0001_init.sql` — schéma initial, copié à l'identique
  depuis Koraa (même backend partagé).
- `supabase/migrations/0002_orbit.sql` — extensions spécifiques à Orbit
  (entreprises, produits, abonnements, transactions, factures, affiliation,
  assistant IA, audit, équipe).

## PWA

Service worker minimal écrit à la main (`public/sw.js`) + `public/manifest.json`,
même approche que Koraa (voir le commentaire en tête de `next.config.js`).
