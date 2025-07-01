
# Spécifications Backend - Plateforme de Gestion d'Entreprises avec Menus QR

## Vue d'ensemble du projet

Application de gestion d'entreprises permettant aux administrateurs de gérer des établissements (restaurants, pâtisseries, etc.) et leurs menus avec génération de QR codes.

## Architecture actuelle (Frontend)

### Technologies utilisées
- **Frontend**: React + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui
- **Base de données**: Supabase (PostgreSQL)
- **Authentification**: Supabase Auth
- **État**: Hooks React personnalisés

### Structure des données actuelles

#### Types d'entreprises (BusinessType)
```typescript
interface BusinessType {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}
```

#### Entreprises (Business)
```typescript
interface Business {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  businessType: string;
  status: 'Actif' | 'Inactif' | 'Suspendu';
  menuItems: number;
  lastUpdate: string;
  owner: string;
  description?: string;
  qrCodeUrl?: string;
  totalScans?: number;
}
```

#### Notifications
```typescript
interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  businessId?: number;
  businessName?: string;
  timestamp: Date;
  isRead: boolean;
}
```

## Besoins Backend

### 1. Base de données (Supabase/PostgreSQL)

#### Tables à créer

**1. business_types**
```sql
CREATE TABLE business_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(10) NOT NULL,
  color VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**2. businesses**
```sql
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(100),
  business_type_id UUID REFERENCES business_types(id),
  status VARCHAR(20) DEFAULT 'Actif' CHECK (status IN ('Actif', 'Inactif', 'Suspendu')),
  owner_name VARCHAR(100),
  description TEXT,
  qr_code_url TEXT,
  total_scans INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**3. menu_items**
```sql
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  category VARCHAR(100),
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**4. qr_scans**
```sql
CREATE TABLE qr_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  scanned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  location JSONB
);
```

**5. notifications**
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(20) CHECK (type IN ('info', 'success', 'warning', 'error')),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. API Endpoints nécessaires

#### Authentification
- `POST /auth/login` - Connexion administrateur
- `POST /auth/logout` - Déconnexion
- `GET /auth/me` - Profil utilisateur courant

#### Types d'entreprises
- `GET /api/business-types` - Liste des types
- `POST /api/business-types` - Créer un type
- `PUT /api/business-types/:id` - Modifier un type
- `DELETE /api/business-types/:id` - Supprimer un type

#### Entreprises
- `GET /api/businesses` - Liste des entreprises (avec filtres)
- `GET /api/businesses/:id` - Détails d'une entreprise
- `POST /api/businesses` - Créer une entreprise
- `PUT /api/businesses/:id` - Modifier une entreprise
- `DELETE /api/businesses/:id` - Supprimer une entreprise
- `PATCH /api/businesses/:id/status` - Changer le statut

#### Menus
- `GET /api/businesses/:id/menu` - Menu d'une entreprise
- `POST /api/businesses/:id/menu` - Ajouter un plat
- `PUT /api/menu-items/:id` - Modifier un plat
- `DELETE /api/menu-items/:id` - Supprimer un plat

#### QR Codes
- `POST /api/businesses/:id/qr-code` - Générer QR code
- `GET /api/businesses/:id/qr-stats` - Statistiques de scans
- `POST /api/qr-scan` - Enregistrer un scan

#### Notifications
- `GET /api/notifications` - Liste des notifications
- `POST /api/notifications` - Créer une notification
- `PATCH /api/notifications/:id/read` - Marquer comme lu
- `DELETE /api/notifications/:id` - Supprimer

#### Statistiques
- `GET /api/stats/dashboard` - Statistiques générales
- `GET /api/stats/businesses` - Stats par entreprise
- `GET /api/export/businesses` - Export CSV

### 3. Fonctionnalités spéciales

#### Génération QR Code
- Service de génération de QR codes personnalisés
- URL format: `https://votre-domaine.com/menu/{business_id}`
- Suivi des scans avec géolocalisation

#### Notifications par email
- Service d'envoi d'emails (Resend/SendGrid)
- Templates pour différents types de notifications
- Notifications automatiques (nouveau menu, changement statut)

#### Upload d'images
- Stockage Supabase Storage
- Redimensionnement automatique
- Formats supportés: JPG, PNG, WebP

### 4. Sécurité

#### Row Level Security (RLS)
- Politiques d'accès basées sur les rôles
- Isolation des données par tenant si multi-tenant

#### Validation
- Validation des données d'entrée
- Sanitisation des inputs
- Rate limiting sur les APIs

### 5. Configuration requise

#### Variables d'environnement
```env
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
JWT_SECRET=...
RESEND_API_KEY=... (pour emails)
QR_CODE_API_KEY=... (si service externe)
```

#### Services externes
- **Supabase**: Base de données + Auth + Storage
- **Resend**: Envoi d'emails
- **QR Code API**: Génération QR codes (ou bibliothèque locale)

### 6. Déploiement

#### Recommandations
- **Backend**: Vercel, Railway, ou Supabase Edge Functions
- **Base de données**: Supabase PostgreSQL
- **Storage**: Supabase Storage
- **CDN**: Cloudflare ou AWS CloudFront

#### Performance
- Cache Redis pour les données fréquentes
- Pagination pour les listes
- Compression des images
- Indexation des requêtes fréquentes

### 7. Monitoring

#### Logs à surveiller
- Erreurs API
- Tentatives d'authentification
- Scans QR codes
- Performance des requêtes

#### Métriques importantes
- Nombre d'entreprises actives
- Scans QR par jour/mois
- Temps de réponse API
- Taux d'erreur

## Intégration Frontend existant

Le frontend utilise actuellement des hooks personnalisés qui simulent les données. Il faudra:

1. Remplacer les hooks par des appels API
2. Ajouter la gestion des états de chargement
3. Implémenter la gestion d'erreurs
4. Configurer l'authentification Supabase
5. Migrer les données simulées vers la base

## Priorités de développement

1. **Phase 1**: Base de données + Auth + CRUD de base
2. **Phase 2**: Génération QR + Menus + Upload images
3. **Phase 3**: Notifications + Email + Statistiques
4. **Phase 4**: Optimisations + Monitoring + Analytics
