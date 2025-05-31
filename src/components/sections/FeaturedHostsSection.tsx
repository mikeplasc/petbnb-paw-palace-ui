import { HostCard } from '@/components/HostCard';
import { mockHosts } from '@/data/mockData';

interface FeaturedHostsSectionProps {
  hostFavorites: string[];
  onToggleFavorite: (hostId: string) => void;
}

const FeaturedHostsSection = ({ hostFavorites, onToggleFavorite }: FeaturedHostsSectionProps) => {
  const featuredHosts = mockHosts.slice(0, 4);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cuidadores destacados
          </h2>
          <p className="text-gray-600 text-lg">
            Los mejores cuidadores de mascotas, seleccionados especialmente para ti
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredHosts.map((host) => (
            <HostCard
              key={host.id}
              host={host}
              isFavorite={hostFavorites.includes(host.id)}
              onToggleFavorite={onToggleFavorite}
              onViewDetails={() => console.log('Ver detalles:', host.id)}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-petbnb-500 hover:bg-petbnb-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
            Ver todos los cuidadores
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHostsSection;
