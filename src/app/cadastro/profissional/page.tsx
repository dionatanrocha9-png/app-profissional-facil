'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Upload, Camera, ExternalLink, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { SERVICE_CATEGORIES } from '@/lib/types';

const professionalSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  cnpj: z.string().optional(),
  address: z.string().min(10, 'Endereço completo é obrigatório'),
  serviceCategories: z.array(z.string()).min(1, 'Selecione pelo menos uma área de atuação'),
  serviceDescription: z.string().min(20, 'Descreva seus serviços (mínimo 20 caracteres)'),
  basePrice: z.string().min(1, 'Informe um preço base'),
});

type ProfessionalFormData = z.infer<typeof professionalSchema>;

export default function CadastroProfissional() {
  const [step, setStep] = useState(1);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [hasCNPJ, setHasCNPJ] = useState<boolean | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfessionalFormData>({
    resolver: zodResolver(professionalSchema),
  });

  const onSubmit = (data: ProfessionalFormData) => {
    console.log('Dados do profissional:', data);
    alert('Cadastro realizado com sucesso! (Demo)');
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    setValue('serviceCategories', newCategories);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para início
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Cadastro de Profissional
          </h1>
          <p className="text-gray-600">
            Preencha seus dados para começar a oferecer seus serviços
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step > s ? <CheckCircle className="w-6 h-6" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > s ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Dados Pessoais
            </span>
            <span className={step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Documentos
            </span>
            <span className={step >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Serviços
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Dados Pessoais */}
          {step === 1 && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Dados Pessoais</h2>
                <p className="text-sm text-gray-600">Informações básicas do profissional</p>
              </div>
              <div className="space-y-6">
                {/* Foto Profissional */}
                <div>
                  <Label>Foto Profissional *</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {photoPreview ? (
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                        id="photo-upload"
                      />
                      <Label htmlFor="photo-upload" className="cursor-pointer">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <Upload className="w-4 h-4 mr-2" />
                          Escolher Foto
                        </div>
                      </Label>
                      <p className="text-sm text-gray-500 mt-2">
                        Use uma foto profissional e de boa qualidade
                      </p>
                    </div>
                  </div>
                </div>

                {/* Nome Completo */}
                <div>
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    {...register('name')}
                    placeholder="Seu nome completo"
                    className="mt-1"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="seu@email.com"
                    className="mt-1"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Telefone */}
                <div>
                  <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                  <Input
                    id="phone"
                    {...register('phone')}
                    placeholder="(00) 00000-0000"
                    className="mt-1"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {/* Endereço */}
                <div>
                  <Label htmlFor="address">Endereço Completo *</Label>
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

                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Próximo
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Documentos */}
          {step === 2 && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Documentação</h2>
                <p className="text-sm text-gray-600">Documentos necessários para verificação</p>
              </div>
              <div className="space-y-6">
                {/* CNPJ */}
                <div>
                  <Label>Você possui CNPJ? *</Label>
                  <div className="flex gap-4 mt-2">
                    <Button
                      type="button"
                      variant={hasCNPJ === true ? 'default' : 'outline'}
                      onClick={() => setHasCNPJ(true)}
                      className="flex-1"
                    >
                      Sim
                    </Button>
                    <Button
                      type="button"
                      variant={hasCNPJ === false ? 'default' : 'outline'}
                      onClick={() => setHasCNPJ(false)}
                      className="flex-1"
                    >
                      Não
                    </Button>
                  </div>
                </div>

                {hasCNPJ === true && (
                  <div>
                    <Label htmlFor="cnpj">Número do CNPJ</Label>
                    <Input
                      id="cnpj"
                      {...register('cnpj')}
                      placeholder="00.000.000/0000-00"
                      className="mt-1"
                    />
                  </div>
                )}

                {hasCNPJ === false && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700 mb-3">
                      Não tem CNPJ? Você pode abrir um MEI de forma rápida e gratuita:
                    </p>
                    <a
                      href="https://www.gov.br/empresas-e-negocios/pt-br/empreendedor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Abrir MEI no Portal do Empreendedor
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                )}

                {/* Comprovante de Endereço */}
                <div>
                  <Label htmlFor="addressProof">Comprovante de Endereço *</Label>
                  <Input
                    id="addressProof"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Conta de luz, água, telefone ou extrato bancário (últimos 3 meses)
                  </p>
                </div>

                {/* Antecedentes Criminais */}
                <div>
                  <Label htmlFor="criminalRecord">Certidão de Antecedentes Criminais *</Label>
                  <Input
                    id="criminalRecord"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Emita gratuitamente no site da Polícia Federal
                  </p>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    Voltar
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep(3)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Próximo
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Serviços */}
          {step === 3 && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Seus Serviços</h2>
                <p className="text-sm text-gray-600">Informações sobre os serviços que você oferece</p>
              </div>
              <div className="space-y-6">
                {/* Áreas de Atuação - MÚLTIPLA SELEÇÃO */}
                <div>
                  <Label>Áreas de Atuação * (Selecione uma ou mais)</Label>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICE_CATEGORIES.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleCategoryToggle(category)}
                      >
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryToggle(category)}
                        />
                        <Label
                          htmlFor={category}
                          className="cursor-pointer flex-1"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.serviceCategories && (
                    <p className="text-sm text-red-600 mt-2">{errors.serviceCategories.message}</p>
                  )}
                  {selectedCategories.length > 0 && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        Áreas selecionadas ({selectedCategories.length}):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedCategories.map((cat) => (
                          <span
                            key={cat}
                            className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Descrição dos Serviços */}
                <div>
                  <Label htmlFor="serviceDescription">Descrição dos Serviços *</Label>
                  <Textarea
                    id="serviceDescription"
                    {...register('serviceDescription')}
                    placeholder="Descreva detalhadamente os serviços que você oferece, sua experiência e diferenciais..."
                    className="mt-1"
                    rows={5}
                  />
                  {errors.serviceDescription && (
                    <p className="text-sm text-red-600 mt-1">{errors.serviceDescription.message}</p>
                  )}
                </div>

                {/* Preço Base */}
                <div>
                  <Label htmlFor="basePrice">Preço Base (R$) *</Label>
                  <Input
                    id="basePrice"
                    {...register('basePrice')}
                    placeholder="150,00"
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Valor base para orçamentos. Você poderá ajustar para cada serviço específico.
                  </p>
                  {errors.basePrice && (
                    <p className="text-sm text-red-600 mt-1">{errors.basePrice.message}</p>
                  )}
                </div>

                {/* Informação sobre Taxa */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Taxa de Uso do Aplicativo</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Para acessar clientes, você pagará uma taxa variável de até R$ 20,00 por dia/período de uso.
                  </p>
                  <p className="text-sm text-gray-700">
                    O pagamento será feito via PIX antes de ter acesso aos clientes interessados.
                  </p>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                  >
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  >
                    Finalizar Cadastro
                  </Button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
