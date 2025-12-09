'use client';

import { useState } from 'react';
import { 
  Bell, 
  Calendar, 
  DollarSign, 
  MessageSquare, 
  Star, 
  Users, 
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  UserPlus,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardProfissional() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'orcamentos' | 'agenda' | 'avaliacoes' | 'ajudantes'>('orcamentos');

  // Dados mockados
  const stats = {
    orcamentosPendentes: 5,
    servicosAgendados: 3,
    avaliacaoMedia: 4.8,
    ganhosMes: 3500
  };

  const orcamentos = [
    {
      id: '1',
      cliente: 'Maria Santos',
      servico: 'Instalação Elétrica',
      descricao: 'Instalação de tomadas e interruptores em 3 cômodos',
      valor: 450,
      status: 'pending' as const,
      data: '2024-01-15'
    },
    {
      id: '2',
      cliente: 'João Silva',
      servico: 'Manutenção Elétrica',
      descricao: 'Troca de disjuntores e verificação do quadro elétrico',
      valor: 280,
      status: 'pending' as const,
      data: '2024-01-16'
    }
  ];

  const servicosAgendados = [
    {
      id: '1',
      cliente: 'Ana Costa',
      servico: 'Instalação de Ventilador',
      endereco: 'Rua das Flores, 123',
      data: '2024-01-18',
      horario: '14:00',
      valor: 150
    }
  ];

  const avaliacoes = [
    {
      id: '1',
      cliente: 'Pedro Oliveira',
      rating: 5,
      comentario: 'Excelente profissional! Pontual e muito caprichoso no trabalho.',
      data: '2024-01-10',
      servico: 'Instalação Elétrica'
    },
    {
      id: '2',
      cliente: 'Carla Mendes',
      rating: 5,
      comentario: 'Muito atencioso e resolveu o problema rapidamente.',
      data: '2024-01-08',
      servico: 'Manutenção Elétrica'
    }
  ];

  const ajudantes = [
    {
      id: '1',
      nome: 'Carlos Silva',
      telefone: '(11) 98765-4321',
      endereco: 'Rua A, 100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Profissional Fácil</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/dashboard/profissional" className="text-blue-600 font-medium">
                Dashboard
              </Link>
              <Link href="/chat" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Chat
              </Link>
              <Link href="/notificacoes" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                <Bell className="w-5 h-5" />
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </Link>
              <Button variant="outline">Sair</Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-4">
                <Link href="/dashboard/profissional" className="text-blue-600 font-medium">
                  Dashboard
                </Link>
                <Link href="/chat" className="text-gray-600">
                  Chat
                </Link>
                <Link href="/notificacoes" className="text-gray-600">
                  Notificações (3)
                </Link>
                <Button variant="outline" className="w-full">Sair</Button>
              </div>
            </div>
          )}
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo, João Silva!</h1>
          <p className="text-gray-600">Gerencie seus serviços e orçamentos</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">{stats.orcamentosPendentes}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Orçamentos Pendentes</h3>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-green-600">{stats.servicosAgendados}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Serviços Agendados</h3>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <div className="flex items-center justify-between mb-4">
              <Star className="w-8 h-8 text-yellow-600" />
              <span className="text-2xl font-bold text-yellow-600">{stats.avaliacaoMedia}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Avaliação Média</h3>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">R$ {stats.ganhosMes}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Ganhos do Mês</h3>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('orcamentos')}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'orcamentos'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Orçamentos
              </button>
              <button
                onClick={() => setActiveTab('agenda')}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'agenda'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Agenda
              </button>
              <button
                onClick={() => setActiveTab('avaliacoes')}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'avaliacoes'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Avaliações
              </button>
              <button
                onClick={() => setActiveTab('ajudantes')}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'ajudantes'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Ajudantes
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Orçamentos Tab */}
            {activeTab === 'orcamentos' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Solicitações de Orçamento</h2>
                </div>

                {orcamentos.map((orcamento) => (
                  <div key={orcamento.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{orcamento.cliente}</h3>
                            <p className="text-sm text-gray-600">{orcamento.servico}</p>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">{orcamento.descricao}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(orcamento.data).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            R$ {orcamento.valor}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Aceitar
                        </Button>
                        <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                          <XCircle className="w-4 h-4 mr-2" />
                          Recusar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Agenda Tab */}
            {activeTab === 'agenda' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Serviços Agendados</h2>
                </div>

                {servicosAgendados.map((servico) => (
                  <div key={servico.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{servico.cliente}</h3>
                            <p className="text-sm text-gray-600">{servico.servico}</p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(servico.data).toLocaleDateString('pt-BR')} às {servico.horario}
                          </p>
                          <p className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {servico.endereco}
                          </p>
                          <p className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            R$ {servico.valor}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Abrir Chat
                        </Button>
                        <Button variant="outline">Ver Detalhes</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Avaliações Tab */}
            {activeTab === 'avaliacoes' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Suas Avaliações</h2>
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold text-gray-900">{stats.avaliacaoMedia}</span>
                    <span className="text-gray-600">(127 avaliações)</span>
                  </div>
                </div>

                {avaliacoes.map((avaliacao) => (
                  <div key={avaliacao.id} className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{avaliacao.cliente}</h3>
                            <p className="text-sm text-gray-600">{avaliacao.servico}</p>
                          </div>
                          <span className="text-sm text-gray-600">
                            {new Date(avaliacao.data).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= avaliacao.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{avaliacao.comentario}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Ajudantes Tab */}
            {activeTab === 'ajudantes' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Meus Ajudantes</h2>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Adicionar Ajudante
                  </Button>
                </div>

                {ajudantes.map((ajudante) => (
                  <div key={ajudante.id} className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{ajudante.nome}</h3>
                          <p className="text-sm text-gray-600">{ajudante.telefone}</p>
                          <p className="text-sm text-gray-600">{ajudante.endereco}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Editar</Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {ajudantes.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum ajudante cadastrado</h3>
                    <p className="text-gray-600 mb-4">Adicione ajudantes para trabalhar com você</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Adicionar Primeiro Ajudante
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
