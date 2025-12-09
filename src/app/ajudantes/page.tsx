'use client';

import { useState } from 'react';
import { 
  UserPlus, 
  Phone, 
  MapPin,
  ArrowLeft,
  Users,
  Trash2,
  Edit,
  Save,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

interface Ajudante {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
}

export default function AjudantesPage() {
  const [ajudantes, setAjudantes] = useState<Ajudante[]>([
    {
      id: '1',
      nome: 'Carlos Silva',
      telefone: '(11) 98765-4321',
      endereco: 'Rua A, 100 - São Paulo, SP'
    },
    {
      id: '2',
      nome: 'Roberto Santos',
      telefone: '(11) 97654-3210',
      endereco: 'Av. B, 250 - São Paulo, SP'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    endereco: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Editar ajudante existente
      setAjudantes(ajudantes.map(ajudante =>
        ajudante.id === editingId
          ? { ...ajudante, ...formData }
          : ajudante
      ));
      setEditingId(null);
    } else {
      // Adicionar novo ajudante
      const novoAjudante: Ajudante = {
        id: Date.now().toString(),
        ...formData
      };
      setAjudantes([...ajudantes, novoAjudante]);
    }

    setFormData({ nome: '', telefone: '', endereco: '' });
    setShowForm(false);
  };

  const handleEdit = (ajudante: Ajudante) => {
    setFormData({
      nome: ajudante.nome,
      telefone: ajudante.telefone,
      endereco: ajudante.endereco
    });
    setEditingId(ajudante.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja remover este ajudante?')) {
      setAjudantes(ajudantes.filter(ajudante => ajudante.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData({ nome: '', telefone: '', endereco: '' });
    setEditingId(null);
    setShowForm(false);
  };

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
                <Users className="w-6 h-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Meus Ajudantes</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Card */}
        <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Users className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Sobre o Cadastro de Ajudantes</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Cadastre ajudantes para trabalhar com você nos serviços</li>
                <li>• O pagamento dos ajudantes é feito diretamente por você</li>
                <li>• O aplicativo não tem envolvimento financeiro com ajudantes</li>
                <li>• Mantenha os dados atualizados para facilitar o contato</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Add Button */}
        {!showForm && (
          <div className="mb-6">
            <Button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Adicionar Novo Ajudante
            </Button>
          </div>
        )}

        {/* Form */}
        {showForm && (
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {editingId ? 'Editar Ajudante' : 'Novo Ajudante'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Carlos Silva"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(11) 98765-4321"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço *
                </label>
                <input
                  type="text"
                  required
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Rua, número - Cidade, Estado"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {editingId ? 'Salvar Alterações' : 'Adicionar Ajudante'}
                </Button>
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1"
                >
                  <X className="w-5 h-5 mr-2" />
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Ajudantes List */}
        <div className="space-y-4">
          {ajudantes.length === 0 ? (
            <Card className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum ajudante cadastrado</h3>
              <p className="text-gray-600 mb-6">
                Adicione ajudantes para trabalhar com você nos serviços
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Adicionar Primeiro Ajudante
              </Button>
            </Card>
          ) : (
            ajudantes.map((ajudante) => (
              <Card key={ajudante.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{ajudante.nome}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {ajudante.telefone}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {ajudante.endereco}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(ajudante)}
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleDelete(ajudante.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remover
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Stats Card */}
        {ajudantes.length > 0 && (
          <Card className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Total de Ajudantes</p>
              <p className="text-4xl font-bold text-blue-600">{ajudantes.length}</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
