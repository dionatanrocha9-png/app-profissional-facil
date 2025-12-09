'use client';

import { useState } from 'react';
import { 
  CreditCard, 
  Check, 
  AlertCircle,
  ArrowLeft,
  Users,
  Calendar,
  Clock,
  DollarSign,
  Copy,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function PagamentoPage() {
  const [paymentStep, setPaymentStep] = useState<'info' | 'pix' | 'success'>('info');
  const [pixCopied, setPixCopied] = useState(false);

  // Dados mockados
  const taxaInfo = {
    valor: 15.00,
    periodo: 'Mensal',
    vencimento: '20/01/2024',
    diasRestantes: 2,
    beneficios: [
      'Acesso ilimitado a solicitações de orçamento',
      'Chat integrado com clientes',
      'Sistema de notificações em tempo real',
      'Perfil verificado com selo de confiança',
      'Suporte prioritário'
    ]
  };

  const pixCode = 'profissionalfacil.pix.12345678901234567890123456789012345678901234567890';

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 3000);
  };

  const handleConfirmPayment = () => {
    // Aqui você implementaria a lógica de confirmação
    setPaymentStep('success');
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
                <CreditCard className="w-6 h-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Pagamento</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {paymentStep === 'info' && (
          <>
            {/* Alert */}
            <Card className="p-4 mb-6 bg-orange-50 border-orange-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Taxa de Uso Pendente</h3>
                  <p className="text-sm text-gray-700">
                    Sua taxa mensal vence em <strong>{taxaInfo.diasRestantes} dias</strong>. 
                    Realize o pagamento para continuar recebendo solicitações de orçamento.
                  </p>
                </div>
              </div>
            </Card>

            {/* Payment Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Detalhes da Taxa</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b">
                    <span className="text-gray-600">Período</span>
                    <span className="font-semibold text-gray-900">{taxaInfo.periodo}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b">
                    <span className="text-gray-600">Vencimento</span>
                    <span className="font-semibold text-gray-900">{taxaInfo.vencimento}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b">
                    <span className="text-gray-600">Valor</span>
                    <span className="text-2xl font-bold text-blue-600">
                      R$ {taxaInfo.valor.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefícios Inclusos</h2>
                <ul className="space-y-3">
                  {taxaInfo.beneficios.map((beneficio, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{beneficio}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card className="p-4 text-center">
                <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Pagamento</p>
                <p className="font-semibold text-gray-900">Mensal</p>
              </Card>
              <Card className="p-4 text-center">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Vence em</p>
                <p className="font-semibold text-gray-900">{taxaInfo.diasRestantes} dias</p>
              </Card>
              <Card className="p-4 text-center">
                <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Valor</p>
                <p className="font-semibold text-gray-900">R$ {taxaInfo.valor.toFixed(2)}</p>
              </Card>
            </div>

            {/* Action Button */}
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Pronto para pagar?</h3>
                  <p className="text-sm text-gray-600">Pagamento rápido e seguro via Pix</p>
                </div>
                <Button
                  onClick={() => setPaymentStep('pix')}
                  className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                  size="lg"
                >
                  Pagar com Pix
                </Button>
              </div>
            </Card>

            {/* Important Info */}
            <Card className="mt-6 p-6 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Informações Importantes</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• A taxa varia de acordo com o horário e dia da semana (até R$ 20,00)</li>
                    <li>• O pagamento deve ser feito antes de acessar novos orçamentos</li>
                    <li>• Após o pagamento, o acesso é liberado imediatamente</li>
                    <li>• Você pode cancelar a qualquer momento sem multas</li>
                  </ul>
                </div>
              </div>
            </Card>
          </>
        )}

        {paymentStep === 'pix' && (
          <>
            <Card className="p-8 mb-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Pagamento via Pix</h2>
                <p className="text-gray-600">Escaneie o QR Code ou copie o código abaixo</p>
              </div>

              {/* QR Code Placeholder */}
              <div className="bg-white border-4 border-gray-200 rounded-xl p-8 mb-6 max-w-sm mx-auto">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">QR Code Pix</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">R$ {taxaInfo.valor.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Pix Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código Pix Copia e Cola
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pixCode}
                    readOnly
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm font-mono"
                  />
                  <Button
                    onClick={handleCopyPix}
                    variant="outline"
                    className={pixCopied ? 'bg-green-50 border-green-600 text-green-600' : ''}
                  >
                    {pixCopied ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5 mr-2" />
                        Copiar
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Instructions */}
              <Card className="p-4 bg-blue-50 border-blue-200 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Como pagar:</h3>
                <ol className="text-sm text-gray-700 space-y-2">
                  <li>1. Abra o app do seu banco</li>
                  <li>2. Escolha a opção Pix</li>
                  <li>3. Escaneie o QR Code ou cole o código</li>
                  <li>4. Confirme o pagamento de R$ {taxaInfo.valor.toFixed(2)}</li>
                  <li>5. Clique em "Já Paguei" após concluir</li>
                </ol>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => setPaymentStep('info')}
                  variant="outline"
                  className="flex-1"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleConfirmPayment}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Já Paguei
                </Button>
              </div>
            </Card>
          </>
        )}

        {paymentStep === 'success' && (
          <Card className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pagamento Confirmado!</h2>
            <p className="text-lg text-gray-600 mb-8">
              Seu acesso foi liberado e você já pode receber novos orçamentos.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Valor Pago</p>
                  <p className="text-xl font-bold text-gray-900">R$ {taxaInfo.valor.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Válido até</p>
                  <p className="text-xl font-bold text-gray-900">{taxaInfo.vencimento}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <p className="text-xl font-bold text-green-600">Ativo</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/dashboard/profissional">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Ir para Dashboard
                </Button>
              </Link>
              <Button variant="outline">
                Baixar Comprovante
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
