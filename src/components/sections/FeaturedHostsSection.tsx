
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, MapPin, Users, Shield } from 'lucide-react';
import { getHosts, Host } from '@/services/hostService';

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
  onViewAllHosts,
}: FeaturedHostsSectionProps) => {
  const { data: hosts = [], isLoading, error } = useQuery({
    queryKey: ['hosts', 'featured'],
    queryFn: () => getHosts({ type: 'host' }),
  });

  const featuredHosts = hosts.slice(0, 3);

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cuidadores Destacados
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Profesionales verificados que cuidarán de tu mascota como si fuera suya
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Error al cargar los cuidadores</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cuidadores Destacados
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Profesionales verificados que cuidarán de tu mascota como si fuera suya
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredHosts.map((host) => {
            const images = Array.isArray(host.images) ? host.images as string[] : [];
            const services = Array.isArray(host.services) ? host.services as string[] : [];
            const certifications = Array.isArray(host.certifications) ? host.certifications as string[] : [];
            const isFavorite = favorites.includes(host.id);

            return (
              <Card key={host.id} className="group hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={images[0] || '/placeholder.svg'}
                    alt={host.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <button
                    onClick={() => onToggleFavorite(host.id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                      }`}
                    />
                  </button>
                  {certifications.length > 0 ? (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 cursor-default">
                      <Shield className="h-3 w-3" />
                      Certificado
                    </div>
                  ) : (
                    <Badge className="absolute top-4 left-4 bg-primary text-white">
                      Verificado
                    </Badge>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{host.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{Number(host.rating).toFixed(1)}</span>
                      <span className="text-sm text-gray-500">({host.review_count})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-gray-600 mb-3">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{host.city}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {host.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {services.slice(0, 2).map((service, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                    {services.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{services.length - 2} más
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-primary">
                      €{host.price_per_night}<span className="text-sm font-normal text-gray-500">/noche</span>
                    </div>
                    <Button onClick={() => onViewDetails(host.id)} size="sm">
                      Ver detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button onClick={onViewAllHosts} variant="outline" size="lg">
            <Users className="mr-2 h-5 w-5" />
            Ver todos los cuidadores
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHostsSection;
