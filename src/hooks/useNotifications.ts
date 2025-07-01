
import { useState } from 'react';
import { toast } from 'sonner';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  businessId?: number;
  businessName?: string;
  timestamp: Date;
  isRead: boolean;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Nouvelle entreprise ajoutée',
      message: 'Le Petit Bistro a été ajouté avec succès',
      type: 'success',
      businessId: 1,
      businessName: 'Le Petit Bistro',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false
    },
    {
      id: '2',
      title: 'Menu mis à jour',
      message: 'Douceurs & Délices a mis à jour son menu',
      type: 'info',
      businessId: 2,
      businessName: 'Douceurs & Délices',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: false
    }
  ]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Toast notification
    const toastMessage = `${notification.title}: ${notification.message}`;
    switch (notification.type) {
      case 'success':
        toast.success(toastMessage);
        break;
      case 'error':
        toast.error(toastMessage);
        break;
      case 'warning':
        toast.message(toastMessage);
        break;
      default:
        toast.info(toastMessage);
    }
    
    return newNotification;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getUnreadCount = () => {
    return notifications.filter(notif => !notif.isRead).length;
  };

  const sendEmailNotification = (businessEmail: string, businessName: string, subject: string, message: string) => {
    // Simulation d'envoi d'email
    console.log(`Envoi email à ${businessEmail}:`, { subject, message });
    
    addNotification({
      title: 'Email envoyé',
      message: `Email envoyé à ${businessName} (${businessEmail})`,
      type: 'success'
    });
    
    toast.success(`Email envoyé à ${businessName}`);
  };

  return {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getUnreadCount,
    sendEmailNotification
  };
};
