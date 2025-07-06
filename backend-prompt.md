
# Prompt pour développeur Backend - Kaay Scanner

## Contexte

Vous devez développer le backend Node.js/Express pour Kaay Scanner, une plateforme sénégalaise de gestion d'entreprises (restaurants, pâtisseries, etc.) avec génération de menus QR. Le frontend React/TypeScript existe déjà et utilise actuellement des données simulées.

### Informations sur l'entreprise
- **Nom**: Kaay Scanner  
- **Localisation**: Dakar, Sénégal
- **Contact**: +221 77 000 00 00 / contact@kaay-scanner.sn
- **Devise**: Franc CFA (FCFA)
- **Packages**: Basic (25k), Premium (35k), Enterprise (75k FCFA/mois)

## Votre mission

Créer un backend robuste et évolutif qui supportera:
- Gestion d'entreprises et de leurs menus
- **Limitation modifications menu client** (2/mois Basic, 5/mois Premium, illimité Enterprise)
- Génération et suivi de QR codes
- Système de notifications et emails
- Authentification et autorisation multi-niveau
- Demandes d'abonnement en ligne
- Statistiques et analytics
- APIs RESTful complètes

## Technologies imposées

- **Base de données**: Supabase (PostgreSQL)
- **Authentification**: Supabase Auth
- **Storage**: Supabase Storage
- **Backend**: Au choix (Node.js/Express, Python/FastAPI, ou Supabase Edge Functions)
- **Email**: Resend.com

## Spécifications détaillées

Référez-vous au fichier `backend-specifications.md` pour:
- Schéma de base de données complet
- Liste des endpoints API requis
- Types TypeScript existants
- Configuration et déploiement

## Objectifs prioritaires

### Phase 1 (Essentiel)
1. **Base de données**
   - Créer toutes les tables avec les bonnes relations
   - Configurer Row Level Security (RLS)
   - Ajouter les index nécessaires

2. **Authentification**
   - Système d'auth admin avec Supabase
   - Middleware de protection des routes
   - Gestion des sessions

3. **CRUD de base**
   - Types d'entreprises (business_types)
   - Entreprises (businesses) avec gestion abonnements
   - Menus (menu_items) avec catégories
   - **Système de limitations mensuelles** pour modifications menu

### Phase 2 (Important)
4. **QR Codes & Menu Public**
   - Génération automatique de QR codes (menu + paiement)
   - Suivi des scans avec analytics géolocalisées
   - URLs publiques pour consultation menus
   - **Interface client** pour gestion menu avec limitations

5. **Upload d'images**
   - Storage Supabase pour images de plats
   - Redimensionnement automatique
   - Validation des formats

### Phase 3 (Avancé)
6. **Notifications & Communications**
   - Système de notifications en temps réel
   - Emails automatiques (Resend) - rappels paiement, limites
   - **Demandes d'abonnement** avec suivi workflow
   - Templates personnalisables

7. **Analytics & Reporting**
   - Statistiques de scans QR avec géolocalisation
   - Tableaux de bord entreprises et admin
   - **Suivi modifications menu** par package
   - Métriques de performance
   - Export de données

## Contraintes techniques

- **Performance**: Toutes les listes doivent être paginées
- **Sécurité**: Validation stricte des inputs + protection CSRF
- **Évolutivité**: Architecture modulaire pour ajout de fonctionnalités
- **Monitoring**: Logs structurés + métriques de performance

## Livrables attendus

1. **Code source** avec documentation
2. **Scripts de migration** de base de données
3. **Documentation API** (Swagger/OpenAPI)
4. **Guide de déploiement** step-by-step
5. **Tests unitaires** pour les endpoints critiques

## Critères de validation

- ✅ Toutes les fonctionnalités frontend actuelles fonctionnent
- ✅ APIs documentées et testables
- ✅ Authentification sécurisée
- ✅ Performance acceptable (<500ms pour les requêtes simples)
- ✅ Gestion d'erreurs robuste
- ✅ Code maintenable et évolutif

## Questions à poser avant de commencer

1. **Backend recommandé**: Node.js/Express (stack maturité et écosystème riche)
2. **Services externes**: Supabase (DB/Auth) + Resend (emails) - budget optimisé
3. **Architecture**: Multi-tenant avec isolation par business_id (RLS Supabase)  
4. **Priorité**: MVP rapide puis optimisations (approche itérative)
5. **Sécurité**: Standard (HTTPS, validation, rate limiting, RLS)
6. **Spécificités Sénégal**: Support FCFA, numéros locaux (+221), français

## Ressources disponibles

- Frontend existant avec types TypeScript
- Compte Supabase configuré
- Spécifications détaillées dans `backend-specifications.md`
- Accès aux maquettes et workflows utilisateur

---

**Objectif**: Avoir un MVP fonctionnel en 2-3 semaines avec possibilité d'itérations rapides pour les fonctionnalités avancées.
