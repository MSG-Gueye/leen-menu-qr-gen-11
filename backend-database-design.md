# Schéma Complet de Base de Données - Kaay Scanner

## Vue d'ensemble
Structure complète de la base de données PostgreSQL pour la plateforme Kaay Scanner avec toutes les tables, relations et contraintes nécessaires.

## Tables principales

### 1. business_types
```sql
CREATE TABLE business_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index
CREATE INDEX idx_business_types_active ON business_types(is_active);
```

### 2. businesses
```sql
CREATE TABLE businesses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  business_type_id INTEGER REFERENCES business_types(id),
  owner_name VARCHAR(200) NOT NULL,
  owner_phone VARCHAR(20),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'pending')),
  subscription_package VARCHAR(20) DEFAULT 'basic' CHECK (subscription_package IN ('basic', 'premium', 'enterprise')),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('paid', 'pending', 'overdue', 'cancelled')),
  last_payment_date DATE,
  next_payment_date DATE,
  monthly_amount DECIMAL(10,2) DEFAULT 25000, -- En FCFA
  monthly_modifications_count INTEGER DEFAULT 0,
  monthly_modifications_limit INTEGER DEFAULT 2,
  monthly_modifications_reset_date DATE DEFAULT CURRENT_DATE,
  qr_code_url TEXT,
  payment_qr_code_url TEXT,
  total_scans INTEGER DEFAULT 0,
  description TEXT,
  hours VARCHAR(100),
  category VARCHAR(100),
  logo_url TEXT,
  banner_url TEXT,
  website_url VARCHAR(255),
  social_facebook VARCHAR(255),
  social_instagram VARCHAR(255),
  social_twitter VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index
CREATE INDEX idx_businesses_email ON businesses(email);
CREATE INDEX idx_businesses_status ON businesses(status);
CREATE INDEX idx_businesses_payment_status ON businesses(payment_status);
CREATE INDEX idx_businesses_type ON businesses(business_type_id);
```

### 3. categories
```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(name, business_id)
);

-- Index
CREATE INDEX idx_categories_business ON categories(business_id);
CREATE INDEX idx_categories_active ON categories(is_active);
```

### 4. menu_items
```sql
CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY,
  business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  preparation_time INTEGER DEFAULT 10, -- en minutes
  allergens TEXT[], -- array des allergènes
  ingredients TEXT,
  nutrition_info JSONB, -- informations nutritionnelles
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index
CREATE INDEX idx_menu_items_business ON menu_items(business_id);
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_menu_items_available ON menu_items(is_available);
CREATE INDEX idx_menu_items_price ON menu_items(price);
```

### 5. menu_modifications
```sql
CREATE TABLE menu_modifications (
  id SERIAL PRIMARY KEY,
  business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
  modification_type VARCHAR(20) NOT NULL CHECK (modification_type IN ('add', 'edit', 'delete', 'category_add', 'category_edit', 'category_delete')),
  description TEXT NOT NULL,
  item_id INTEGER REFERENCES menu_items(id) ON DELETE SET NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  old_data JSONB, -- données avant modification
  new_data JSONB, -- nouvelles données
  modification_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index
CREATE INDEX idx_modifications_business ON menu_modifications(business_id);
CREATE INDEX idx_modifications_date ON menu_modifications(modification_date);
CREATE INDEX idx_modifications_type ON menu_modifications(modification_type);
```

### 6. qr_scans
```sql
CREATE TABLE qr_scans (
  id SERIAL PRIMARY KEY,
  business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
  scan_date DATE DEFAULT CURRENT_DATE,
  scan_time TIME DEFAULT CURRENT_TIME,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  device_type VARCHAR(50), -- mobile, desktop, tablet
  location_data JSONB, -- géolocalisation si disponible
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index
CREATE INDEX idx_qr_scans_business ON qr_scans(business_id);
CREATE INDEX idx_qr_scans_date ON qr_scans(scan_date);
CREATE INDEX idx_qr_scans_device ON qr_scans(device_type);
```

### 7. payments
```sql
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'XOF', -- Franc CFA
  payment_method VARCHAR(50), -- mobile_money, bank_transfer, card
  payment_reference VARCHAR(100) UNIQUE,
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_date DATE,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  payment_gateway VARCHAR(50), -- orange_money, wave, etc.
  gateway_reference TEXT,
  metadata JSONB, -- données supplémentaires du gateway
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index
CREATE INDEX idx_payments_business ON payments(business_id);
CREATE INDEX idx_payments_status ON payments(payment_status);
CREATE INDEX idx_payments_date ON payments(payment_date);
CREATE INDEX idx_payments_reference ON payments(payment_reference);
```

### 8. notifications
```sql
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(20) DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  is_read BOOLEAN DEFAULT FALSE,
  is_email_sent BOOLEAN DEFAULT FALSE,
  email_sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index
CREATE INDEX idx_notifications_business ON notifications(business_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_type ON notifications(type);
```

### 9. email_logs
```sql
CREATE TABLE email_logs (
  id SERIAL PRIMARY KEY,
  business_id INTEGER REFERENCES businesses(id) ON DELETE SET NULL,
  recipient_email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  email_type VARCHAR(50), -- welcome, payment_reminder, update, etc.
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'failed', 'bounced')),
  provider_id TEXT, -- ID du provider (Resend, SendGrid)
  error_message TEXT,
  sent_at TIMESTAMP,
  delivered_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index
CREATE INDEX idx_email_logs_business ON email_logs(business_id);
CREATE INDEX idx_email_logs_status ON email_logs(status);
CREATE INDEX idx_email_logs_type ON email_logs(email_type);
CREATE INDEX idx_email_logs_sent ON email_logs(sent_at);
```

### 10. admin_users
```sql
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(200) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'moderator')),
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index
CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_active ON admin_users(is_active);
```

### 11. system_settings
```sql
CREATE TABLE system_settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  data_type VARCHAR(20) DEFAULT 'string' CHECK (data_type IN ('string', 'number', 'boolean', 'json')),
  description TEXT,
  updated_by INTEGER REFERENCES admin_users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index
CREATE INDEX idx_system_settings_key ON system_settings(key);
```

## Relations et Contraintes

### Relations principales
- `businesses` → `business_types` (Many-to-One)
- `categories` → `businesses` (Many-to-One)
- `menu_items` → `businesses` (Many-to-One)
- `menu_items` → `categories` (Many-to-One)
- `menu_modifications` → `businesses` (Many-to-One)
- `qr_scans` → `businesses` (Many-to-One)
- `payments` → `businesses` (Many-to-One)
- `notifications` → `businesses` (Many-to-One)

### Triggers pour mise à jour automatique

```sql
-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Appliquer aux tables nécessaires
CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON businesses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger pour compteur de modifications
CREATE OR REPLACE FUNCTION increment_modification_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE businesses 
    SET monthly_modifications_count = monthly_modifications_count + 1
    WHERE id = NEW.business_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER count_menu_modifications 
    AFTER INSERT ON menu_modifications 
    FOR EACH ROW EXECUTE FUNCTION increment_modification_count();
```

## Données de base (Seeds)

```sql
-- Types d'entreprises par défaut
INSERT INTO business_types (name, description, icon) VALUES
('Restaurant', 'Restaurant traditionnel', '🍽️'),
('Fast Food', 'Restauration rapide', '🍔'),
('Café', 'Café et boissons chaudes', '☕'),
('Boulangerie', 'Boulangerie et pâtisserie', '🥖'),
('Bar', 'Bar et boissons', '🍺'),
('Pizzeria', 'Spécialisé pizza', '🍕'),
('Sushi', 'Restaurant japonais', '🍣'),
('Autre', 'Autre type de commerce', '🏪');

-- Paramètres système
INSERT INTO system_settings (key, value, data_type, description) VALUES
('basic_package_price', '25000', 'number', 'Prix mensuel package Basic en FCFA'),
('premium_package_price', '35000', 'number', 'Prix mensuel package Premium en FCFA'),
('enterprise_package_price', '75000', 'number', 'Prix mensuel package Enterprise en FCFA'),
('basic_modifications_limit', '2', 'number', 'Limite modifications Basic'),
('premium_modifications_limit', '5', 'number', 'Limite modifications Premium'),
('enterprise_modifications_limit', '-1', 'number', 'Limite modifications Enterprise (-1 = illimité)'),
('contact_phone', '+221 77 000 00 00', 'string', 'Téléphone de contact'),
('contact_email', 'contact@kaay-scanner.sn', 'string', 'Email de contact'),
('platform_name', 'Kaay Scanner', 'string', 'Nom de la plateforme');
```

## Vues utiles

```sql
-- Vue des statistiques par entreprise
CREATE VIEW business_stats AS
SELECT 
    b.id,
    b.name,
    b.email,
    b.subscription_package,
    b.payment_status,
    COUNT(DISTINCT mi.id) as total_menu_items,
    COUNT(DISTINCT c.id) as total_categories,
    COUNT(DISTINCT qs.id) as total_scans,
    b.monthly_modifications_count,
    b.monthly_modifications_limit,
    COALESCE(SUM(p.amount), 0) as total_payments
FROM businesses b
LEFT JOIN menu_items mi ON b.id = mi.business_id
LEFT JOIN categories c ON b.id = c.business_id
LEFT JOIN qr_scans qs ON b.id = qs.business_id
LEFT JOIN payments p ON b.id = p.business_id AND p.payment_status = 'completed'
GROUP BY b.id;

-- Vue des modifications récentes
CREATE VIEW recent_modifications AS
SELECT 
    mm.*,
    b.name as business_name,
    mi.name as item_name,
    c.name as category_name
FROM menu_modifications mm
JOIN businesses b ON mm.business_id = b.id
LEFT JOIN menu_items mi ON mm.item_id = mi.id
LEFT JOIN categories c ON mm.category_id = c.id
ORDER BY mm.created_at DESC;
```

## Sécurité et Permissions

### Row Level Security (RLS)
```sql
-- Activer RLS sur les tables sensibles
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policies pour les entreprises (accès à leurs propres données)
CREATE POLICY business_own_data ON businesses
    FOR ALL USING (id = current_setting('app.current_business_id')::INTEGER);

CREATE POLICY business_menu_items ON menu_items
    FOR ALL USING (business_id = current_setting('app.current_business_id')::INTEGER);
```

Cette structure de base de données permet une gestion complète de la plateforme Kaay Scanner avec toutes les fonctionnalités nécessaires pour le suivi des entreprises, menus, paiements et analytics.