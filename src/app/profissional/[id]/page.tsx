'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Star, Shield, MapPin, MessageSquare, Phone, Mail, Calendar } from 'lucide-react';
import Link from 'next/link';

// Mock data
const professionalData = {
  id: '1',
  name: 'João Silva',
  category: 'Eletricista',
  photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  rating: 4.8,
  reviewCount: 127,
  basePrice: 150,
  location: 'São Paulo, SP',
  verified: true,
  description: 'Eletricista profissional com mais de 15 anos de experiência em instalações elétricas residenciais e comerciais. Especializado em manutenção preventiva, instalação de painéis elétricos, automação residencial e sistemas de iluminação.',
  services: [
    'Instalação elétrica completa',
    'Manutenção preventiva',
    'Troca de disjuntores',
    'Instalação de chuveiros',
    'Automação residencial',
    'Instalação de painéis solares',
  ],
  reviews: [
    {
      id: '1',
      clientName: 'Maria Oliveira',
      rating: 5,
      comment: 'Excelente profissional! Muito pontual e trabalho impecável. Recomendo!',
      date: '2024-01-15',
    },
    {
      id: '2',
      clientName: 'Pedro Santos',
      rating: 5,
      comment: 'Resolveu meu problema rapidamente. Muito educado e prestativo.',
      date: '2024-01-10',
    },
    {
      id: '3',
      clientName: 'Ana Costa',
      rating: 4,
      comment: 'Bom trabalho, mas poderia ser um pouco mais rápido.',
      date: '2024-01-05',
    },
  ],
};

export default function PerfilProfissional({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('sobre');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/buscar" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para busca
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Photo */}
              <div className="flex-shrink-0">
                <img
                  src={professionalData.photo}
                  alt={professionalData.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">
                        {professionalData.name}
                      </h1>
                      {professionalData.verified && (
                        <Shield className="w-6 h-6 text-blue-600" title="Verificado" />
                      )}
                    </div>
                    <p className="text-lg text-gray-600 mb-2">{professionalData.category}</p>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {professionalData.location}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.round(professionalData.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-900">
                      {professionalData.rating}
                    </span>
                  </div>
                  <span className="text-gray-600">
                    ({professionalData.reviewCount} avaliações)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-sm text-gray-600">Preço base</span>
                  <p className="text-3xl font-bold text-gray-900">
                    R$ {professionalData.basePrice}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={`/orcamento/${professionalData.id}`} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Solicitar Orçamento
                    </Button>
                  </Link>
                  <Button variant="outline" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Contato
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sobre">Sobre</TabsTrigger>
            <TabsTrigger value="servicos">Serviços</TabsTrigger>
            <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
          </TabsList>

          {/* Sobre Tab */}
          <TabsContent value="sobre">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Sobre o Profissional</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {professionalData.description}
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Verificações</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center">
                        <Shield className="w-4 h-4 text-blue-600 mr-2" />
                        Documentos verificados
                      </li>
                      <li className="flex items-center">
                        <Shield className="w-4 h-4 text-blue-600 mr-2" />
                        Antecedentes criminais limpos
                      </li>
                      <li className="flex items-center">
                        <Shield className="w-4 h-4 text-blue-600 mr-2" />
                        Endereço confirmado
                      </li>
                    </ul>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Estatísticas</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex justify-between">
                        <span>Serviços realizados:</span>
                        <span className="font-semibold">127</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Taxa de aprovação:</span>
                        <span className="font-semibold">98%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Tempo de resposta:</span>
                        <span className="font-semibold">2h</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Serviços Tab */}
          <TabsContent value="servicos">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Serviços Oferecidos</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {professionalData.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Informação Importante</h3>
                  <p className="text-sm text-gray-700">
                    Os preços podem variar de acordo com a complexidade do serviço e materiais necessários.
                    Solicite um orçamento detalhado para seu projeto específico.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Avaliações Tab */}
          <TabsContent value="avaliacoes">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Avaliações dos Clientes
                </h2>

                <div className="space-y-4">
                  {professionalData.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{review.clientName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {new Date(review.date).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
