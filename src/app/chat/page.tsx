'use client';

import { useState } from 'react';
import { 
  Send, 
  Paperclip, 
  Phone, 
  Video, 
  MoreVertical,
  ArrowLeft,
  Users,
  Search,
  CheckCheck,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  userId: string;
  userName: string;
  userType: 'client' | 'professional';
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  quoteId: string;
  serviceTitle: string;
}

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Dados mockados
  const conversations: Conversation[] = [
    {
      id: '1',
      userId: 'client-1',
      userName: 'Maria Santos',
      userType: 'client',
      lastMessage: 'Obrigada! Até amanhã então.',
      lastMessageTime: new Date('2024-01-15T14:30:00'),
      unreadCount: 0,
      quoteId: 'quote-1',
      serviceTitle: 'Instalação Elétrica'
    },
    {
      id: '2',
      userId: 'client-2',
      userName: 'João Silva',
      userType: 'client',
      lastMessage: 'Pode vir às 14h?',
      lastMessageTime: new Date('2024-01-15T13:15:00'),
      unreadCount: 2,
      quoteId: 'quote-2',
      serviceTitle: 'Manutenção Elétrica'
    },
    {
      id: '3',
      userId: 'client-3',
      userName: 'Ana Costa',
      userType: 'client',
      lastMessage: 'Quanto ficaria o serviço completo?',
      lastMessageTime: new Date('2024-01-15T10:20:00'),
      unreadCount: 1,
      quoteId: 'quote-3',
      serviceTitle: 'Instalação de Ventilador'
    }
  ];

  const messages: ChatMessage[] = [
    {
      id: '1',
      senderId: 'client-1',
      content: 'Olá! Gostaria de confirmar o horário para amanhã.',
      timestamp: new Date('2024-01-15T14:00:00'),
      read: true
    },
    {
      id: '2',
      senderId: 'professional-1',
      content: 'Olá Maria! Sim, confirmado para amanhã às 14h. Vou levar todo o material necessário.',
      timestamp: new Date('2024-01-15T14:05:00'),
      read: true
    },
    {
      id: '3',
      senderId: 'client-1',
      content: 'Perfeito! Você precisa que eu prepare algo antes?',
      timestamp: new Date('2024-01-15T14:10:00'),
      read: true
    },
    {
      id: '4',
      senderId: 'professional-1',
      content: 'Não precisa se preocupar. Só preciso de acesso aos cômodos onde vou trabalhar.',
      timestamp: new Date('2024-01-15T14:15:00'),
      read: true
    },
    {
      id: '5',
      senderId: 'client-1',
      content: 'Obrigada! Até amanhã então.',
      timestamp: new Date('2024-01-15T14:30:00'),
      read: true
    }
  ];

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Aqui você implementaria a lógica de envio
      console.log('Enviando mensagem:', messageInput);
      setMessageInput('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/profissional">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Chat</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Lista de Conversas */}
        <div className={`w-full md:w-80 lg:w-96 bg-white border-r flex flex-col ${selectedConversation ? 'hidden md:flex' : 'flex'}`}>
          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar conversas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`w-full p-4 border-b hover:bg-gray-50 transition-colors text-left ${
                  selectedConversation === conv.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{conv.userName}</h3>
                      <span className="text-xs text-gray-500">
                        {conv.lastMessageTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1 truncate">{conv.serviceTitle}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500 truncate flex-1">{conv.lastMessage}</p>
                      {conv.unreadCount > 0 && (
                        <span className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedConv ? (
          <div className={`flex-1 flex flex-col bg-white ${selectedConversation ? 'flex' : 'hidden md:flex'}`}>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="md:hidden"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedConv.userName}</h3>
                  <p className="text-sm text-gray-600">{selectedConv.serviceTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Phone className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => {
                const isOwnMessage = message.senderId.startsWith('professional');
                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-2xl ${
                        isOwnMessage
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-white text-gray-900 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className={`flex items-center gap-1 mt-1 text-xs ${isOwnMessage ? 'text-blue-100' : 'text-gray-500'}`}>
                        <span>
                          {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {isOwnMessage && (
                          message.read ? (
                            <CheckCheck className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700 rounded-full w-10 h-10 p-0"
                  disabled={!messageInput.trim()}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                💡 Todas as comunicações devem ser feitas pelo chat até a conclusão do primeiro serviço
              </p>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
            <div className="text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Selecione uma conversa</h3>
              <p className="text-gray-600">Escolha uma conversa para começar a conversar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
