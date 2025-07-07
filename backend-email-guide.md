# Guide de Configuration des Notifications Email - Backend

## Vue d'ensemble
Ce guide explique comment configurer et implémenter le système d'envoi d'emails pour la plateforme Kaay Scanner.

## Architecture Email

### Services Email Recommandés
1. **Resend.com** (Recommandé)
   - API simple et moderne
   - Excellent délivrabilité
   - Support des templates
   - Authentification facile

2. **SendGrid** (Alternative)
   - Robuste et fiable
   - APIs complètes
   - Gestion avancée des templates

3. **Nodemailer + SMTP** (Pour développement)

## Configuration Backend

### 1. Installation des dépendances
```bash
npm install resend
# ou
npm install @sendgrid/mail
```

### 2. Variables d'environnement
```env
# Resend
RESEND_API_KEY=re_xxxxxxxxx

# SendGrid (alternative)
SENDGRID_API_KEY=SG.xxxxxxxxx

# Configuration email
FROM_EMAIL=noreply@kaay-scanner.sn
FROM_NAME=Kaay Scanner
SUPPORT_EMAIL=contact@kaay-scanner.sn
```

### 3. Service Email (Resend)
```javascript
// services/emailService.js
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

class EmailService {
  static async sendEmail({ to, subject, html, template, data }) {
    try {
      const emailData = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: Array.isArray(to) ? to : [to],
        subject,
        html: template ? this.renderTemplate(template, data) : html,
      };

      const result = await resend.emails.send(emailData);
      console.log('Email envoyé:', result);
      return result;
    } catch (error) {
      console.error('Erreur envoi email:', error);
      throw error;
    }
  }

  // Templates email prédéfinis
  static async sendWelcomeEmail(businessEmail, businessName) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">Bienvenue sur Kaay Scanner !</h2>
        <p>Bonjour <strong>${businessName}</strong>,</p>
        <p>Nous sommes ravis de vous accueillir sur notre plateforme !</p>
        <p>Votre QR code menu sera généré sous peu. Vous recevrez une notification dès qu'il sera prêt.</p>
        <div style="background: #f3f4f6; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3>Prochaines étapes :</h3>
          <ul>
            <li>Ajoutez vos plats au menu</li>
            <li>Personnalisez votre profil</li>
            <li>Téléchargez votre QR code</li>
          </ul>
        </div>
        <p>Pour toute question, contactez-nous à <a href="mailto:${process.env.SUPPORT_EMAIL}">${process.env.SUPPORT_EMAIL}</a></p>
        <p>Cordialement,<br>L'équipe Kaay Scanner</p>
      </div>
    `;

    return this.sendEmail({
      to: businessEmail,
      subject: 'Bienvenue sur Kaay Scanner',
      html
    });
  }

  static async sendPaymentReminder(businessEmail, businessName, amount, dueDate) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">Rappel de Paiement</h2>
        <p>Bonjour <strong>${businessName}</strong>,</p>
        <p>Nous vous rappelons que votre paiement mensuel pour le service Kaay Scanner est dû.</p>
        <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0;">
          <p><strong>Montant dû :</strong> ${amount} FCFA</p>
          <p><strong>Date d'échéance :</strong> ${dueDate}</p>
        </div>
        <p>Veuillez effectuer le paiement pour continuer à bénéficier de nos services.</p>
        <p><a href="${process.env.FRONTEND_URL}/paiement" style="background: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Payer maintenant</a></p>
        <p>Cordialement,<br>L'équipe Kaay Scanner</p>
      </div>
    `;

    return this.sendEmail({
      to: businessEmail,
      subject: 'Rappel de paiement - Kaay Scanner',
      html
    });
  }

  static async sendMenuUpdateNotification(businessEmail, businessName, updateType, dishName) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">Menu mis à jour</h2>
        <p>Bonjour <strong>${businessName}</strong>,</p>
        <p>Votre menu a été mis à jour avec succès !</p>
        <div style="background: #f0fdf4; border-left: 4px solid #059669; padding: 15px; margin: 20px 0;">
          <p><strong>Action :</strong> ${updateType}</p>
          <p><strong>Plat :</strong> ${dishName}</p>
          <p><strong>Date :</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
        </div>
        <p>Vos clients peuvent maintenant voir ces changements en scannant votre QR code.</p>
        <p>Cordialement,<br>L'équipe Kaay Scanner</p>
      </div>
    `;

    return this.sendEmail({
      to: businessEmail,
      subject: 'Menu mis à jour - Kaay Scanner',
      html
    });
  }

  static async sendSystemNotification(emails, subject, message) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0ea5e9;">Notification Système - Kaay Scanner</h2>
        <div style="background: #f8fafc; padding: 20px; margin: 20px 0; border-radius: 8px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <p>Cordialement,<br>L'équipe Kaay Scanner</p>
      </div>
    `;

    // Envoyer à plusieurs destinataires
    return Promise.all(
      emails.map(email => this.sendEmail({
        to: email,
        subject,
        html
      }))
    );
  }
}

module.exports = EmailService;
```

### 4. Endpoints API pour les emails
```javascript
// routes/notifications.js
const express = require('express');
const EmailService = require('../services/emailService');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Envoyer email de bienvenue
router.post('/welcome', authMiddleware, async (req, res) => {
  try {
    const { businessEmail, businessName } = req.body;
    
    await EmailService.sendWelcomeEmail(businessEmail, businessName);
    
    res.json({ success: true, message: 'Email de bienvenue envoyé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Envoyer rappel de paiement
router.post('/payment-reminder', authMiddleware, async (req, res) => {
  try {
    const { businessEmail, businessName, amount, dueDate } = req.body;
    
    await EmailService.sendPaymentReminder(businessEmail, businessName, amount, dueDate);
    
    res.json({ success: true, message: 'Rappel de paiement envoyé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Notification de mise à jour menu
router.post('/menu-update', authMiddleware, async (req, res) => {
  try {
    const { businessEmail, businessName, updateType, dishName } = req.body;
    
    await EmailService.sendMenuUpdateNotification(businessEmail, businessName, updateType, dishName);
    
    res.json({ success: true, message: 'Notification envoyée' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Notification système massive
router.post('/system-broadcast', authMiddleware, async (req, res) => {
  try {
    const { emails, subject, message } = req.body;
    
    await EmailService.sendSystemNotification(emails, subject, message);
    
    res.json({ success: true, message: `Notification envoyée à ${emails.length} destinataires` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

## Intégration avec le Frontend

### 1. Service API Frontend
```javascript
// services/notificationApi.js
const API_BASE = process.env.REACT_APP_API_URL;

export const notificationService = {
  sendWelcomeEmail: async (businessEmail, businessName) => {
    const response = await fetch(`${API_BASE}/notifications/welcome`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ businessEmail, businessName })
    });
    return response.json();
  },

  sendPaymentReminder: async (businessEmail, businessName, amount, dueDate) => {
    const response = await fetch(`${API_BASE}/notifications/payment-reminder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ businessEmail, businessName, amount, dueDate })
    });
    return response.json();
  },

  sendSystemBroadcast: async (emails, subject, message) => {
    const response = await fetch(`${API_BASE}/notifications/system-broadcast`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ emails, subject, message })
    });
    return response.json();
  }
};
```

### 2. Utilisation dans les composants
```javascript
// Dans RestaurantManager.tsx
import { notificationService } from '../services/notificationApi';

const sendNotificationEmail = async (business) => {
  try {
    await notificationService.sendWelcomeEmail(business.email, business.name);
    toast.success(`Email envoyé à ${business.name}`);
  } catch (error) {
    toast.error('Erreur lors de l\'envoi de l\'email');
  }
};
```

## Configuration Domaine et DNS

### 1. Configuration SPF
```txt
TXT record: v=spf1 include:spf.resend.com ~all
```

### 2. Configuration DKIM
Resend fournira automatiquement les enregistrements DKIM à ajouter.

### 3. Configuration DMARC
```txt
TXT record: v=DMARC1; p=quarantine; rua=mailto:dmarc@kaay-scanner.sn
```

## Surveillance et Logging

### 1. Logs d'emails
```javascript
// models/EmailLog.js
const EmailLog = {
  async create(emailData) {
    return db.query(`
      INSERT INTO email_logs (recipient, subject, status, sent_at, error_message)
      VALUES ($1, $2, $3, $4, $5)
    `, [emailData.recipient, emailData.subject, emailData.status, new Date(), emailData.error]);
  },

  async getStats(dateRange) {
    return db.query(`
      SELECT 
        COUNT(*) as total_sent,
        COUNT(CASE WHEN status = 'sent' THEN 1 END) as successful,
        COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed
      FROM email_logs 
      WHERE sent_at >= $1 AND sent_at <= $2
    `, [dateRange.start, dateRange.end]);
  }
};
```

### 2. Webhooks de statut
```javascript
// routes/webhooks.js - Pour recevoir les statuts de Resend
router.post('/resend-webhook', (req, res) => {
  const { type, data } = req.body;
  
  switch (type) {
    case 'email.sent':
      // Marquer comme envoyé
      break;
    case 'email.delivered':
      // Marquer comme délivré
      break;
    case 'email.bounced':
      // Gérer les bounces
      break;
  }
  
  res.status(200).send('OK');
});
```

## Bonnes Pratiques

1. **Rate Limiting** : Limiter le nombre d'emails par heure
2. **Templates** : Utiliser des templates HTML bien conçus
3. **Personnalisation** : Inclure le nom de l'entreprise et informations pertinentes
4. **Tracking** : Surveiller les taux de délivraison et d'ouverture
5. **Unsubscribe** : Inclure un lien de désinscription
6. **Testing** : Tester les emails sur différents clients email

## Sécurité

1. Valider toutes les adresses email
2. Utiliser HTTPS pour tous les endpoints
3. Protéger les webhooks avec des signatures
4. Limiter les permissions API
5. Chiffrer les données sensibles

## Tests

```javascript
// tests/emailService.test.js
describe('EmailService', () => {
  test('should send welcome email', async () => {
    const result = await EmailService.sendWelcomeEmail('test@example.com', 'Test Business');
    expect(result.id).toBeDefined();
  });

  test('should handle email errors gracefully', async () => {
    await expect(EmailService.sendWelcomeEmail('invalid-email', 'Test'))
      .rejects.toThrow();
  });
});
```

Cette configuration vous permettra d'avoir un système d'email robuste et professionnel pour votre plateforme Kaay Scanner.