
import { Button } from '@/components/ui/button';
import HostCard from '@/components/HostCard';
import { mockHosts } from '@/data/mockData';

interface FeaturedHostsSectionProps {
  favorites: string[];
  onViewDetails: (hostId: string) => void;
  onToggleFavorite: (hostId: string) => void;
  onViewAllHosts: () => void;
}

const FeaturedHostsSection = ({ 
  favorites, 
  onViewDetails, 
  onToggleFavorite, 
  onViewAllHosts 
}: FeaturedHostsSectionProps) => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cuidadores destacados
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conoce a algunos de nuestros cuidadores mejor calificados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockHosts.slice(0, 3).map((host) => (
            <HostCard
              key={host.id}
              host={host}
              onViewDetails={onViewDetails}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.includes(host.id)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline"
            onClick={onViewAllHosts}
            className="border-petbnb-300 text-petbnb-700 hover:bg-petbnb-50 px-8"
          >
            Ver todos los cuidadores
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHostsSection;
