
import { Button } from '@/components/ui/button';
import SearchBar, { SearchFilters } from '@/components/SearchBar';
import { Shield, Heart, Award } from 'lucide-react';

interface HeroSectionProps {
  onSearch: (filters: SearchFilters) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-petbnb-100/50 to-warm-100/50" />
      <div className="relative container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Encuentra el mejor lugar para tu 
            <span className="bg-gradient-to-r from-petbnb-600 to-primary-600 bg-clip-text text-transparent"> mascota</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Miles de cuidadores verificados están listos para brindar amor y cuidado a tu mejor amigo mientras no estés
          </p>
          
          <div className="mb-12">
            <SearchBar onSearch={onSearch} variant="hero" />
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-petbnb-500" />
              <span>Cuidadores verificados</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span>+10,000 mascotas felices</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span>Garantía de satisfacción</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
