import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Bell, Mail, Send, Trash2, Check, CheckCheck, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useNotifications, Notification } from '@/hooks/useNotifications';

const NotificationCenter = () => {
  const { 
    notifications, 
    addNotification, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification, 
    getUnreadCount,
    sendEmailNotification 
  } = useNotifications();

  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState('all');
  const [emailForm, setEmailForm] = useState({
    recipients: 'all',
    subject: '',
    message: '',
    type: 'general' as 'general' | 'payment' | 'update' | 'warning' | 'welcome' | 'maintenance' | 'promotion'
  });

  const messageTypes = [
    { value: 'general', label: 'Message général', icon: '📋' },
    { value: 'payment', label: 'Rappel de paiement', icon: '💳' },
    { value: 'update', label: 'Mise à jour', icon: '🔄' },
    { value: 'warning', label: 'Avertissement', icon: '⚠️' },
    { value: 'welcome', label: 'Bienvenue', icon: '👋' },
    { value: 'maintenance', label: 'Maintenance', icon: '🔧' },
    { value: 'promotion', label: 'Promotion', icon: '🎉' }
  ];

  const businesses = [
    { id: 1, name: "Le Petit Bistro", email: "bistro@email.com" },
    { id: 2, name: "Sushi Zen", email: "sushi@email.com" },
    { id: 3, name: "Pizza Corner", email: "pizza@email.com" }
  ];

  const emailTemplates = {
    payment: {
      subject: "Rappel de paiement - Kaay Scanner",
      message: "Bonjour,\n\nNous vous rappelons que votre paiement mensuel pour le service Kaay Scanner est dû. Veuillez effectuer le paiement pour continuer à bénéficier de nos services.\n\nMerci de votre confiance."
    },
    update: {
      subject: "Mise à jour importante - Kaay Scanner",
      message: "Bonjour,\n\nNous avons le plaisir de vous informer d'une nouvelle mise à jour de notre plateforme Kaay Scanner avec de nouvelles fonctionnalités.\n\nCordialement."
    },
    welcome: {
      subject: "Bienvenue sur Kaay Scanner",
      message: "Bonjour,\n\nBienvenue sur la plateforme Kaay Scanner ! Nous sommes ravis de vous compter parmi nos clients.\n\nVotre QR code menu sera bientôt prêt.\n\nCordialement."
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return "À l'instant";
    if (hours < 24) return `Il y a ${hours}h`;
    return date.toLocaleDateString('fr-FR');
  };

  const handleSendEmail = () => {
    if (!emailForm.subject || !emailForm.message) {
      toast.error('Veuillez remplir le sujet et le message');
      return;
    }

    if (emailForm.recipients === 'all') {
      // Envoyer à toutes les entreprises
      businesses.forEach(business => {
        sendEmailNotification(business.email, business.name, emailForm.subject, emailForm.message);
      });
      toast.success(`Email envoyé à ${businesses.length} entreprises`);
    } else {
      // Envoyer à une entreprise spécifique
      const business = businesses.find(b => b.id.toString() === emailForm.recipients);
      if (business) {
        sendEmailNotification(business.email, business.name, emailForm.subject, emailForm.message);
      }
    }

    setEmailForm({
      recipients: 'all',
      subject: '',
      message: '',
      type: 'general'
    });
    setIsComposeOpen(false);
  };

  const handleUseTemplate = (templateKey: keyof typeof emailTemplates) => {
    const template = emailTemplates[templateKey];
    setEmailForm({
      ...emailForm,
      subject: template.subject,
      message: template.message,
      type: templateKey === 'payment' ? 'payment' : templateKey === 'update' ? 'update' : 'welcome'
    });
  };

  const handleBroadcastNotification = () => {
    addNotification({
      title: 'Notification système',
      message: 'Maintenance programmée ce weekend de 2h à 4h du matin',
      type: 'warning'
    });
    toast.success('Notification diffusée à tous les utilisateurs');
  };

  const filteredNotifications = notifications.filter(notif => {
    if (selectedBusiness === 'all') return true;
    return notif.businessId?.toString() === selectedBusiness;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Centre de Notifications</h2>
          <p className="text-gray-600">Gérez les notifications et communications</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBroadcastNotification}>
            <Bell className="h-4 w-4 mr-2" />
            Notification système
          </Button>
          <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
            <DialogTrigger asChild>
              <Button className="bg-scanner-green-600 hover:bg-scanner-green-700">
                <Mail className="h-4 w-4 mr-2" />
                Composer Email
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Composer un email</DialogTitle>
                <DialogDescription>
                  Envoyez un email à vos entreprises clientes
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="recipients">Destinataires</Label>
                    <Select value={emailForm.recipients} onValueChange={(value) => setEmailForm({...emailForm, recipients: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner les destinataires" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les entreprises</SelectItem>
                        {businesses.map((business) => (
                          <SelectItem key={business.id} value={business.id.toString()}>
                            {business.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message-type">Type de message</Label>
                    <Select value={emailForm.type} onValueChange={(value) => setEmailForm({...emailForm, type: value as any})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        {messageTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <span className="flex items-center gap-2">
                              {type.icon} {type.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Modèles prédéfinis</Label>
                  <div className="flex gap-1 mt-1">
                    <Button variant="outline" size="sm" onClick={() => handleUseTemplate('payment')}>
                      Paiement
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleUseTemplate('update')}>
                      Mise à jour
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleUseTemplate('welcome')}>
                      Bienvenue
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Sujet *</Label>
                  <Input
                    id="subject"
                    value={emailForm.subject}
                    onChange={(e) => setEmailForm({...emailForm, subject: e.target.value})}
                    placeholder="Sujet de l'email"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={emailForm.message}
                    onChange={(e) => setEmailForm({...emailForm, message: e.target.value})}
                    placeholder="Contenu du message..."
                    rows={8}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSendEmail} className="bg-scanner-green-600 hover:bg-scanner-green-700">
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer
                  </Button>
                  <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                    Annuler
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Non lues</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getUnreadCount()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aujourd'hui</CardTitle>
            <Info className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notifications.filter(n => new Date(n.timestamp).toDateString() === new Date().toDateString()).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgentes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notifications.filter(n => n.type === 'error' || n.type === 'warning').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckCheck className="h-4 w-4 mr-2" />
                Tout marquer comme lu
              </Button>
              <select
                value={selectedBusiness}
                onChange={(e) => setSelectedBusiness(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-scanner-green-500"
              >
                <option value="all">Toutes les entreprises</option>
                {businesses.map(biz => (
                  <option key={biz.id} value={biz.id.toString()}>{biz.name}</option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-600">
              {filteredNotifications.length} notification(s) • {getUnreadCount()} non lue(s)
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucune notification</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border rounded-lg p-4 transition-colors ${
                    notification.isRead ? 'bg-white' : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          {!notification.isRead && (
                            <Badge variant="default" className="bg-blue-600 text-xs">
                              Nouveau
                            </Badge>
                          )}
                          {notification.businessName && (
                            <Badge variant="outline" className="text-xs">
                              {notification.businessName}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                        <p className="text-xs text-gray-500">{formatTimestamp(notification.timestamp)}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 ml-2">
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          title="Marquer comme lu"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-600 hover:text-red-700"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationCenter;