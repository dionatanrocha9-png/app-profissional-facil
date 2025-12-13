import { Search, Shield, Star, Users, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Conectando <span className="text-blue-600">Profissionais</span> e <span className="text-blue-600">Clientes</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Encontre profissionais qualificados ou ofereça seus serviços com segurança, praticidade e confiança.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/cadastro/cliente">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  Buscar Profissionais
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/cadastro/profissional">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                  Oferecer Serviços
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white rounded-xl p-6 shadow-lg mb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">João Silva</h3>
                    <p className="text-sm text-gray-600">Eletricista</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">(127 avaliações)</span>
                </div>
                <p className="text-sm text-gray-600">Profissional verificado ✓</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-600">Orçamento Solicitado</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">R$ 350,00</p>
                <p className="text-sm text-gray-600 mt-2">Instalação elétrica completa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="como-funciona" className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Processo simples e seguro para conectar você ao profissional ideal
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Busque</h3>
              <p className="text-gray-600">
                Encontre profissionais qualificados por localização e tipo de serviço
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Solicite Orçamentos</h3>
              <p className="text-gray-600">
                Peça quantos orçamentos quiser e compare preços e avaliações
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Contrate</h3>
              <p className="text-gray-600">
                Escolha o melhor profissional e agende o serviço com segurança
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o Profissional Fácil?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Segurança Garantida</h3>
              <p className="text-gray-600">
                Profissionais verificados com documentação completa, incluindo antecedentes criminais
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Star className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Avaliações Reais</h3>
              <p className="text-gray-600">
                Sistema de avaliações transparente com comentários de clientes reais
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Clock className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lembretes Automáticos</h3>
              <p className="text-gray-600">
                Receba notificações 1 hora antes do serviço agendado
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Chat Integrado</h3>
              <p className="text-gray-600">
                Comunicação segura através do app até a conclusão do primeiro serviço
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <CheckCircle className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Orçamentos Ilimitados</h3>
              <p className="text-gray-600">
                Solicite quantos orçamentos precisar sem compromisso
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Pagamento Direto</h3>
              <p className="text-gray-600">
                Pagamento feito diretamente ao profissional, sem intermediários
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a milhares de profissionais e clientes satisfeitos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cadastro/cliente">
              <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50">
                Cadastrar como Cliente
              </Button>
            </Link>
            <Link href="/cadastro/profissional">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-blue-700">
                Cadastrar como Profissional
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">Profissional Fácil</span>
              </div>
              <p className="text-sm text-gray-400">
                Conectando profissionais e clientes com segurança e praticidade.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Para Clientes</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/cadastro/cliente" className="hover:text-blue-400 transition-colors">Cadastre-se</Link></li>
                <li><Link href="/buscar" className="hover:text-blue-400 transition-colors">Buscar Profissionais</Link></li>
                <li><Link href="/como-funciona" className="hover:text-blue-400 transition-colors">Como Funciona</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Para Profissionais</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/cadastro/profissional" className="hover:text-blue-400 transition-colors">Cadastre-se</Link></li>
                <li><Link href="/planos" className="hover:text-blue-400 transition-colors">Planos e Preços</Link></li>
                <li><Link href="/ajudantes" className="hover:text-blue-400 transition-colors">Cadastrar Ajudantes</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Suporte</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/ajuda" className="hover:text-blue-400 transition-colors">Central de Ajuda</Link></li>
                <li><Link href="/termos" className="hover:text-blue-400 transition-colors">Termos de Uso</Link></li>
                <li><Link href="/privacidade" className="hover:text-blue-400 transition-colors">Política de Privacidade</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Profissional Fácil. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}