'use client';

import { useState } from 'react';
import { Menu, X, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50" suppressHydrationWarning>
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
            <Link href="#como-funciona" className="text-gray-600 hover:text-blue-600 transition-colors">
              Como Funciona
            </Link>
            <Link href="#beneficios" className="text-gray-600 hover:text-blue-600 transition-colors">
              Benefícios
            </Link>
            <Link href="/cadastro/cliente" className="text-gray-600 hover:text-blue-600 transition-colors">
              Sou Cliente
            </Link>
            <Link href="/cadastro/profissional">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                Sou Profissional
              </Button>
            </Link>
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
              <Link href="#como-funciona" className="text-gray-600 hover:text-blue-600 transition-colors">
                Como Funciona
              </Link>
              <Link href="#beneficios" className="text-gray-600 hover:text-blue-600 transition-colors">
                Benefícios
              </Link>
              <Link href="/cadastro/cliente" className="text-gray-600 hover:text-blue-600 transition-colors">
                Sou Cliente
              </Link>
              <Link href="/cadastro/profissional">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700">
                  Sou Profissional
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}