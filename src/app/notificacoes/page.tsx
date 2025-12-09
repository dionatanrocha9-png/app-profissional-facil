'use client';

import { useState } from 'react';
import { 
  Bell, 
  Check, 
  Clock, 
  MessageSquare, 
  DollarSign,
  Calendar,
  AlertCircle,
  ArrowLeft,
  Users,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

interface Notification {
  id: string;
  type: 'new_quote' | 'quote_accepted' | 'quote_rejected' | 'service_reminder' | 'payment_required' | 'new_message';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export default function NotificacoesPage() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  // Dados mockados
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'service_reminder',
      title: 'Lembrete de Serviço',
      message: 'Você tem um serviço agendado com Ana Costa em 1 hora (14:00)',
      read: false,
      createdAt: new Date('2024-01-18T13:00:00'),
      actionUrl: '/dashboard/profissional'
    },
    {
      id: '2',
      type: 'new_quote',
      title: 'Nova Solicitação de Orçamento',
      message: 'João Silva solicitou um orçamento para Manutenção Elétrica',
      read: false,
      createdAt: new Date('2024-01-17T16:30:00'),
      actionUrl: '/dashboard/profissional'
    },
    {
      id: '3',
      type: 'quote_accepted',
      title: 'Orçamento Aceito',
      message: 'Maria Santos aceitou seu orçamento de R$ 450,00',
      read: false,
      createdAt: new Date('2024-01-17T14:20:00'),
      actionUrl: '/dashboard/profissional'
    },
    {
      id: '4',
      type: 'new_message',
      title: 'Nova Mensagem',
      message: 'Maria Santos enviou uma mensagem no chat',
      read: true,
      createdAt: new Date('2024-01-17T10:15:00'),
      actionUrl: '/chat'
    },
    {
      id: '5',
      type: 'payment_required',
      title: 'Pagamento de Taxa',
      message: 'Taxa de uso do aplicativo: R$ 15,00 - Vence em 2 dias',
      read: true,
      createdAt: new Date('2024-01-16T09:00:00'),
      actionUrl: '/pagamento'
    }
  ]);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'new_quote':
        return <MessageSquare className="w-6 h-6 text-blue-600" />;
      case 'quote_accepted':
        return <Check className="w-6 h-6 text-green-600" />;
      case 'quote_rejected':
        return <AlertCircle className="w-6 h-6 text-red-600" />;
      case 'service_reminder':
        return <Clock className="w-6 h-6 text-orange-600" />;
      case 'payment_required':
        return <DollarSign className="w-6 h-6 text-purple-600" />;
      case 'new_message':
        return <MessageSquare className="w-6 h-6 text-blue-600" />;
      default:
        return <Bell className="w-6 h-6 text-gray-600" />;
    }
  };

  const getNotificationBgColor = (type: Notification['type']) => {
    switch (type) {
      case 'new_quote':
        return 'bg-blue-50';
      case 'quote_accepted':
        return 'bg-green-50';
      case 'quote_rejected':
        return 'bg-red-50';
      case 'service_reminder':
        return 'bg-orange-50';
      case 'payment_required':
        return 'bg-purple-50';
      case 'new_message':
        return 'bg-blue-50';
      default:
        return 'bg-gray-50';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/profissional">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Bell className="w-6 h-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Notificações</span>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              size="sm"
            >
              Todas ({notifications.length})
            </Button>
            <Button
              variant={filter === 'unread' ? 'default' : 'outline'}
              onClick={() => setFilter('unread')}
              size="sm"
            >
              Não Lidas ({unreadCount})
            </Button>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              onClick={markAllAsRead}
              size="sm"
            >
              <Check className="w-4 h-4 mr-2" />
              Marcar todas como lidas
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <Card className="p-12 text-center">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {filter === 'unread' ? 'Nenhuma notificação não lida' : 'Nenhuma notificação'}
              </h3>
              <p className="text-gray-600">
                {filter === 'unread'
                  ? 'Você está em dia com todas as suas notificações!'
                  : 'Quando você receber notificações, elas aparecerão aqui.'}
              </p>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`p-4 hover:shadow-md transition-shadow ${
                  !notification.read ? 'border-l-4 border-l-blue-600' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationBgColor(notification.type)}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {notification.createdAt.toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className={`text-sm mb-3 ${!notification.read ? 'text-gray-700' : 'text-gray-600'}`}>
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2">
                      {notification.actionUrl && (
                        <Link href={notification.actionUrl}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-blue-600 border-blue-600 hover:bg-blue-50"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Ver Detalhes
                          </Button>
                        </Link>
                      )}
                      {!notification.read && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Marcar como lida
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Info Card */}
        <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Sobre as Notificações</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Você receberá um lembrete 1 hora antes de cada serviço agendado</li>
                <li>• Notificações de novos orçamentos aparecem em tempo real</li>
                <li>• Mensagens importantes sobre pagamentos são destacadas</li>
                <li>• Você pode desativar notificações específicas nas configurações</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
