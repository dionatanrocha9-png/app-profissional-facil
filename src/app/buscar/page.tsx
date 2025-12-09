'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Star, Shield, MessageSquare, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { SERVICE_CATEGORIES } from '@/lib/types';

// Mock data de profissionais
const mockProfessionals = [
  {
    id: '1',
    name: 'João Silva',
    category: 'Eletricista',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 127,
    basePrice: 150,
    location: 'São Paulo, SP',
    verified: true,
    description: 'Especialista em instalações elétricas residenciais e comerciais. 15 anos de experiência.',
  },
  {
    id: '2',
    name: 'Maria Santos',
    category: 'Encanador',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 203,
    basePrice: 120,
    location: 'São Paulo, SP',
    verified: true,
    description: 'Atendimento rápido para emergências. Especialista em vazamentos e entupimentos.',
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    category: 'Pedreiro',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 89,
    basePrice: 200,
    location: 'São Paulo, SP',
    verified: true,
    description: 'Reformas completas, construção e acabamento. Trabalho de qualidade garantido.',
  },
  {
    id: '4',
    name: 'Ana Paula',
    category: 'Diarista',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 5.0,
    reviewCount: 156,
    basePrice: 100,
    location: 'São Paulo, SP',
    verified: true,
    description: 'Limpeza residencial e comercial. Produtos próprios e experiência comprovada.',
  },
  {
    id: '5',
    name: 'Roberto Costa',
    category: 'Pintor',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 74,
    basePrice: 180,
    location: 'São Paulo, SP',
    verified: true,
    description: 'Pintura residencial e comercial. Acabamento perfeito e pontualidade.',
  },
  {
    id: '6',
    name: 'Fernanda Lima',
    category: 'Jardineiro',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 92,
    basePrice: 130,
    location: 'São Paulo, SP',
    verified: true,
    description: 'Manutenção de jardins, poda de árvores e paisagismo. Amor pela natureza.',
  },
];

export default function BuscarProfissionais() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredProfessionals, setFilteredProfessionals] = useState(mockProfessionals);

  const handleSearch = () => {
    let filtered = mockProfessionals;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProfessionals(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para início
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Encontre o Profissional Ideal
          </h1>
          <p className="text-gray-600 mb-6">
            Busque por categoria ou nome e solicite orçamentos gratuitamente
          </p>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Search Input */}
              <div className="md:col-span-1">
                <Input
                  placeholder="Buscar por nome ou serviço..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Category Select */}
              <div className="md:col-span-1">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as categorias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {SERVICE_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <div className="md:col-span-1">
                <Button
                  onClick={handleSearch}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Buscar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredProfessionals.length} profissionais encontrados
          </p>
        </div>

        {/* Professionals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessionals.map((professional) => (
            <Card key={professional.id} className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={professional.photo}
                    alt={professional.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{professional.name}</h3>
                        <p className="text-sm text-gray-600">{professional.category}</p>
                      </div>
                      {professional.verified && (
                        <Shield className="w-5 h-5 text-blue-600" title="Verificado" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-semibold text-gray-900">
                      {professional.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    ({professional.reviewCount} avaliações)
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {professional.location}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {professional.description}
                </p>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-sm text-gray-600">A partir de</span>
                  <p className="text-2xl font-bold text-gray-900">
                    R$ {professional.basePrice}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link href={`/profissional/${professional.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      Ver Perfil
                    </Button>
                  </Link>
                  <Link href={`/orcamento/${professional.id}`} className="flex-1">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Orçamento
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum profissional encontrado
            </h3>
            <p className="text-gray-600">
              Tente ajustar os filtros ou buscar por outros termos
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
