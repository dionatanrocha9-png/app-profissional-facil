'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ArrowLeft, Calendar as CalendarIcon, Send, Star, Shield } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const quoteSchema = z.object({
  description: z.string().min(20, 'Descreva o serviço com no mínimo 20 caracteres'),
  address: z.string().min(10, 'Endereço completo é obrigatório'),
  preferredDate: z.date({
    required_error: 'Selecione uma data preferencial',
  }),
  urgency: z.enum(['low', 'medium', 'high']),
  additionalInfo: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

// Mock data do profissional
const professionalData = {
  id: '1',
  name: 'João Silva',
  category: 'Eletricista',
  photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  rating: 4.8,
  reviewCount: 127,
  basePrice: 150,
  verified: true,
};

export default function SolicitarOrcamento({ params }: { params: { id: string } }) {
  const [date, setDate] = useState<Date>();
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('medium');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });

  const onSubmit = (data: QuoteFormData) => {
    console.log('Orçamento solicitado:', data);
    alert('Orçamento solicitado com sucesso! O profissional receberá sua solicitação. (Demo)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href={`/profissional/${params.id}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para perfil
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Sidebar - Professional Info */}
          <div className="md:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <img
                    src={professionalData.photo}
                    alt={professionalData.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-3"
                  />
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{professionalData.name}</h3>
                    {professionalData.verified && (
                      <Shield className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{professionalData.category}</p>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{professionalData.rating}</span>
                    <span className="text-sm text-gray-600">
                      ({professionalData.reviewCount})
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-2">Preço base</p>
                  <p className="text-2xl font-bold text-gray-900">
                    R$ {professionalData.basePrice}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Solicitar Orçamento</CardTitle>
                <CardDescription>
                  Preencha os detalhes do serviço que você precisa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Descrição do Serviço */}
                  <div>
                    <Label htmlFor="description">Descrição do Serviço *</Label>
                    <Textarea
                      id="description"
                      {...register('description')}
                      placeholder="Descreva detalhadamente o serviço que você precisa..."
                      className="mt-1"
                      rows={5}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
                    )}
                  </div>

                  {/* Endereço */}
                  <div>
                    <Label htmlFor="address">Endereço do Serviço *</Label>
                    <Textarea
                      id="address"
                      {...register('address')}
                      placeholder="Rua, número, bairro, cidade, estado"
                      className="mt-1"
                      rows={3}
                    />
                    {errors.address && (
                      <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>
                    )}
                  </div>

                  {/* Data Preferencial */}
                  <div>
                    <Label>Data Preferencial *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal mt-1"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP", { locale: ptBR })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(newDate) => {
                            setDate(newDate);
                            if (newDate) setValue('preferredDate', newDate);
                          }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.preferredDate && (
                      <p className="text-sm text-red-600 mt-1">{errors.preferredDate.message}</p>
                    )}
                  </div>

                  {/* Urgência */}
                  <div>
                    <Label>Urgência do Serviço *</Label>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      <Button
                        type="button"
                        variant={urgency === 'low' ? 'default' : 'outline'}
                        onClick={() => {
                          setUrgency('low');
                          setValue('urgency', 'low');
                        }}
                        className="w-full"
                      >
                        Baixa
                      </Button>
                      <Button
                        type="button"
                        variant={urgency === 'medium' ? 'default' : 'outline'}
                        onClick={() => {
                          setUrgency('medium');
                          setValue('urgency', 'medium');
                        }}
                        className="w-full"
                      >
                        Média
                      </Button>
                      <Button
                        type="button"
                        variant={urgency === 'high' ? 'default' : 'outline'}
                        onClick={() => {
                          setUrgency('high');
                          setValue('urgency', 'high');
                        }}
                        className="w-full"
                      >
                        Alta
                      </Button>
                    </div>
                  </div>

                  {/* Informações Adicionais */}
                  <div>
                    <Label htmlFor="additionalInfo">Informações Adicionais (Opcional)</Label>
                    <Textarea
                      id="additionalInfo"
                      {...register('additionalInfo')}
                      placeholder="Alguma informação extra que possa ajudar o profissional..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  {/* Informações Importantes */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Como funciona:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">1.</span>
                        O profissional receberá sua solicitação e responderá com um orçamento
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">2.</span>
                        Você poderá conversar pelo chat do app até aceitar o orçamento
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">3.</span>
                        Após aceitar, você receberá um lembrete 1 hora antes do serviço
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">4.</span>
                        O pagamento é feito diretamente ao profissional
                      </li>
                    </ul>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Solicitação
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
