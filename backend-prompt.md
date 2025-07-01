
# Prompt pour développeur Backend - Plateforme de Gestion d'Entreprises

## Contexte

Vous devez développer le backend d'une plateforme de gestion d'entreprises (restaurants, pâtisseries, etc.) avec génération de menus QR. Le frontend React/TypeScript existe déjà et utilise actuellement des données simulées.

## Votre mission

Créer un backend robuste et évolutif qui supportera:
- Gestion d'entreprises et de leurs menus
- Génération et suivi de QR codes
- Système de notifications
- Authentification et autorisation
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
   - Entreprises (businesses)
   - Menus (menu_items)

### Phase 2 (Important)
4. **QR Codes**
   - Génération automatique de QR codes
   - Suivi des scans avec analytics
   - URLs publiques pour les menus

5. **Upload d'images**
   - Storage Supabase pour images de plats
   - Redimensionnement automatique
   - Validation des formats

### Phase 3 (Avancé)
6. **Notifications**
   - Système de notifications en temps réel
   - Envoi d'emails automatiques
   - Templates personnalisables

7. **Analytics**
   - Statistiques de scans QR
   - Tableaux de bord
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

1. Préférez-vous un backend en Node.js, Python, ou Supabase Edge Functions?
2. Avez-vous des contraintes de budget pour les services externes?
3. Souhaitez-vous un système multi-tenant (plusieurs admins) ou mono-tenant?
4. Quelle est votre priorité: rapidité de développement ou performance optimale?
5. Avez-vous des exigences spécifiques de sécurité ou compliance?

## Ressources disponibles

- Frontend existant avec types TypeScript
- Compte Supabase configuré
- Spécifications détaillées dans `backend-specifications.md`
- Accès aux maquettes et workflows utilisateur

---

**Objectif**: Avoir un MVP fonctionnel en 2-3 semaines avec possibilité d'itérations rapides pour les fonctionnalités avancées.
