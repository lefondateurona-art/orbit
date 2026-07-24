# À configurer avant mise en production — ORBIT

Cette application est prête côté code, mais nécessite les éléments suivants
créés manuellement par vous avant de fonctionner réellement (aucune clé
réelle n'est présente dans le code).

## 0. Important — backend partagé avec Koraa

**Orbit utilise EXACTEMENT le même projet Supabase et le même projet
Firebase que Koraa.** Ne créez pas un second projet Supabase / Firebase :
copiez simplement les mêmes valeurs de `koraa/.env.local` dans
`orbit/.env.local` (mêmes noms de variables `NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
`NEXT_PUBLIC_FIREBASE_*`).

## 1. Projet Supabase (partagé avec Koraa)
- [ ] Si ce n'est pas déjà fait pour Koraa, créer un projet sur
      https://supabase.com.
- [ ] Récupérer dans **Project Settings > API** les mêmes clés que pour
      Koraa et les coller dans `orbit/.env.local`.

## 2. Migrations SQL — ordre d'exécution
- [ ] Si la migration Koraa n'a pas encore été exécutée sur ce projet,
      exécuter d'abord `koraa/supabase/migrations/0001_init.sql` (ou
      `orbit/supabase/migrations/0001_init.sql`, qui est une copie
      identique) dans le **SQL Editor** du dashboard Supabase.
- [ ] Exécuter ensuite `orbit/supabase/migrations/0002_orbit.sql`. Cela
      ajoute : `companies`, `team_members`, `orbit_products`,
      `subscriptions`, `transactions`, `invoices`, `affiliates`,
      `affiliate_clicks`, `ai_chats`, `ai_messages`, `audit_log`, ainsi que
      les colonnes `company_id`, `theme`, `font`,
      `presentation_video_url`, `slug` sur `shops`.
- [ ] Vérifier dans **Authentication > Policies** que RLS est bien actif sur
      toutes les nouvelles tables.

> Note : la table `orbit_products` porte ce nom (et non `products`) car
> `public.products` existe déjà côté Koraa avec un schéma différent
> (rattaché à `shop_id`). Les deux tables coexistent dans la même base.

## 3. Projet Firebase (partagé avec Koraa)
- [ ] Réutiliser le projet Firebase de Koraa, coller la même config dans
      `NEXT_PUBLIC_FIREBASE_*` de `orbit/.env.local`.

## 4. Identifiants marchands Wave
- [ ] Créer un compte marchand Wave (https://wave.com/business) et obtenir
      une clé API + un identifiant marchand.
- [ ] Coller ces valeurs dans `WAVE_API_KEY` / `WAVE_MERCHANT_ID`.
- [ ] Sans ces valeurs, `lib/payments/wave.ts` fonctionne en **mode MOCK** :
      aucun appel réseau réel, mais un reçu (`receipt_code`) réel et unique
      est quand même généré, pour développer et tester le flux complet dès
      maintenant.
- [ ] TODO code : implémenter l'appel réel à l'API Wave Checkout dans
      `charge()` (le point d'insertion est déjà marqué par un commentaire
      `TODO(real-integration)`).

## 5. Identifiants marchands Orange Money
- [ ] Créer un compte marchand Orange Money (Orange Money Web Payment API)
      et obtenir une clé API + un identifiant marchand.
- [ ] Coller ces valeurs dans `ORANGE_MONEY_API_KEY` / `ORANGE_MONEY_MERCHANT_ID`.
- [ ] Même comportement MOCK que Wave en leur absence — voir
      `lib/payments/orange-money.ts`.

## 6. Vérification de reçu (receipt_code)
- [ ] Chaque paiement (réel ou MOCK) génère un `receipt_code` unique
      (format `ORB-<PROVIDER>-<horodatage>-<aléatoire>`), destiné à être
      stocké dans la table `transactions`.
- [ ] Une page de vérification publique est déjà scaffoldée :
      `app/verify/[receiptCode]/page.tsx`. Elle ne vérifie pour l'instant
      que le **format** du code (TODO explicite dans le fichier) — il reste
      à la brancher sur une requête Supabase réelle :
      `select * from transactions where receipt_code = $1`
      (une fonction SQL `public.verify_receipt(code text)` est déjà créée
      par `0002_orbit.sql` pour exposer une lecture publique minimale sans
      ouvrir tout accès à la table `transactions`).

## 7. Buckets Supabase Storage à créer (si pas déjà fait pour Koraa)
- [ ] `avatars`, `shop-thumbnails` — déjà utilisés par Koraa, réutilisés ici.
- [ ] `company-logos` — logos des entreprises Orbit.
- [ ] `invoice-pdfs` — si vous ajoutez la génération de PDF de factures.

## 8. Assistant IA — pas de backend réel pour l'instant
- [ ] `app/ai-chats/page.tsx` et le flux `app/orders/page.tsx` (bouton
      "Terminer + Assistant IA") utilisent un générateur de réponse **mock**
      (`generateMockAiReport`), clairement marqué TODO dans le code.
- [ ] À terme : brancher un vrai appel LLM (Edge Function Supabase ou route
      handler Next.js) qui lit les commandes/ventes récentes de
      l'entreprise et écrit dans `ai_chats` / `ai_messages`.

## 9. Variables d'environnement — résumé
Voir `.env.example` pour la liste complète. Copier vers `.env.local` :

```bash
cp .env.example .env.local
```

Puis remplir chaque valeur selon les étapes ci-dessus.
