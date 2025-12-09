// Tipos do aplicativo Profissional Fácil

export type UserType = 'professional' | 'client';

export interface Professional {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  cnpj?: string;
  address: string;
  addressProof: string;
  criminalRecord: string;
  services: Service[];
  rating: number;
  reviewCount: number;
  location: Location;
  verified: boolean;
  createdAt: Date;
  paymentStatus: 'active' | 'pending' | 'expired';
  nextPaymentDue?: Date;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  cpf: string;
  address: string;
  phone: string;
  createdAt: Date;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  priceType: 'fixed' | 'hourly' | 'negotiable';
}

export interface Quote {
  id: string;
  clientId: string;
  professionalId: string;
  serviceId: string;
  description: string;
  proposedPrice: number;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  scheduledDate?: Date;
  createdAt: Date;
  completedAt?: Date;
  firstService: boolean;
}

export interface Review {
  id: string;
  clientId: string;
  professionalId: string;
  quoteId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  quoteId: string;
  content: string;
  createdAt: Date;
  read: boolean;
  type: 'text' | 'image' | 'file';
}

export interface Helper {
  id: string;
  professionalId: string;
  name: string;
  phone: string;
  address: string;
  createdAt: Date;
}

export interface Location {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'new_quote' | 'quote_accepted' | 'quote_rejected' | 'service_reminder' | 'payment_required' | 'new_message' | 'service_completed';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
  metadata?: {
    quoteId?: string;
    serviceDate?: Date;
    amount?: number;
  };
}

export interface Payment {
  id: string;
  professionalId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  method: 'pix';
  createdAt: Date;
  completedAt?: Date;
  pixCode?: string;
}

export interface ChatConversation {
  id: string;
  quoteId: string;
  clientId: string;
  professionalId: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  active: boolean;
  canExchangeContacts: boolean;
}

export const SERVICE_CATEGORIES = [
  'Encanador',
  'Eletricista',
  'Pedreiro',
  'Pintor',
  'Marceneiro',
  'Jardineiro',
  'Diarista',
  'Técnico de Informática',
  'Mecânico',
  'Chaveiro',
  'Vidraceiro',
  'Serralheiro',
  'Outros'
] as const;

export type ServiceCategory = typeof SERVICE_CATEGORIES[number];

// Tipos para o sistema de notificações
export interface NotificationSettings {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  serviceReminders: boolean;
  newQuotes: boolean;
  messages: boolean;
  payments: boolean;
}

// Tipos para o sistema de avaliações
export interface RatingStats {
  professionalId: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}
