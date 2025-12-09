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
  serviceCategories: ServiceCategory[]; // MODIFICADO: agora suporta múltiplas categorias
  rating: number;
  reviewCount: number;
  location: Location;
  verified: boolean;
  active: boolean; // ADICIONADO: para ativar/desativar usuários
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
  active: boolean; // ADICIONADO: para ativar/desativar usuários
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

// ADICIONADO: Tipos para configurações do app
export interface AppSettings {
  id: string;
  settingKey: string;
  settingValue: string;
  description?: string;
  updatedAt: Date;
}

// ADICIONADO: Tipos para promoções
export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  discountAmount?: number;
  startDate: Date;
  endDate: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
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
