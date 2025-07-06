# Spécifications Backend - Kaay Scanner

## Vue d'ensemble
Backend Node.js/Express pour la plateforme de gestion d'entreprises avec QR codes de menu.

## Architecture technique

### Technologies
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Base de données**: PostgreSQL (Supabase)
- **Authentification**: Supabase Auth
- **Storage**: Supabase Storage
- **Email**: Resend.com
- **ORM**: Prisma ou Supabase SDK
- **Validation**: Joi ou Zod
- **Testing**: Jest

## Schéma de base de données

### Tables principales

#### 1. business_types
```sql
CREATE TABLE business_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 2. businesses
```sql
CREATE TABLE businesses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  business_type_id INTEGER REFERENCES business_types(id),
  owner_name VARCHAR(200) NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  subscription_package VARCHAR(20) DEFAULT 'basic' CHECK (subscription_package IN ('basic', 'premium', 'enterprise')),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('paid', 'pending', 'overdue')),
  last_payment_date DATE,
  monthly_modifications_count INTEGER DEFAULT 0,
  monthly_modifications_reset_date DATE DEFAULT CURRENT_DATE,
  qr_code_url TEXT,
  payment_qr_code_url TEXT,
  total_scans INTEGER DEFAULT 0,
  description TEXT,
  hours VARCHAR(100),
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 3. menu_modifications
```sql
CREATE TABLE menu_modifications (
  id SERIAL PRIMARY KEY,
  business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
  modification_type VARCHAR(20) NOT NULL CHECK (modification_type IN ('add', 'edit', 'delete')),
  description TEXT NOT NULL,
  item_id INTEGER,
  modification_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Règles métier importantes

### Limitations mensuelles
- **Basic**: 2 modifications/mois (25k FCFA)
- **Premium**: 5 modifications/mois (35k FCFA)
- **Enterprise**: Illimité (75k FCFA)

### Contact pour augmentation
- Téléphone: +221 77 000 00 00
- Email: contact@kaay-scanner.sn

## Endpoints API requis

### Client Menu Management
```
GET    /api/client/menu/:businessId
POST   /api/client/menu/:businessId/items
PUT    /api/client/menu/:businessId/items/:itemId
DELETE /api/client/menu/:businessId/items/:itemId
GET    /api/client/menu/:businessId/modifications/count
```

### Middlewares requis

#### Limitation modifications
```javascript
const menuModificationLimit = (req, res, next) => {
  // Vérifier limite mensuelle selon le package
  // Basic: 2, Premium: 5, Enterprise: illimité
};
```

## Services à implémenter

### ModificationTrackingService
```javascript
class ModificationTrackingService {
  static async checkMonthlyLimit(businessId) {}
  static async recordModification(businessId, type, description) {}
  static async resetMonthlyCounter(businessId) {}
}
```