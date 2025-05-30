
import { useState } from 'react';
import Header from '@/components/Header';
import SearchBar, { SearchFilters } from '@/components/SearchBar';
import HostCard from '@/components/HostCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { mockHosts, mockReviews } from '@/data/mockData';
import { Star, Shield, Heart, Clock, Award } from 'lucide-react';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleSearch = (filters: SearchFilters) => {
    console.log('Búsqueda realizada:', filters);
    // Aquí se implementaría la navegación a resultados
    setCurrentPage('search-results');
  };

  const handleToggleFavorite = (hostId: string) => {
    setFavorites(prev => 
      prev.includes(hostId) 
        ? prev.filter(id => id !== hostId)
        : [...prev, hostId]
    );
  };

  const handleViewDetails = (hostId: string) => {
    console.log('Ver detalles del host:', hostId);
    setCurrentPage('host-details');
  };

  const categories = [
    {
      title: 'Casas familiares',
      description: 'Familias amorosas con experiencia',
      icon: '🏠',
      count: '150+ disponibles',
      color: 'from-warm-400 to-warm-500'
    },
    {
      title: 'Veterinarias certificadas',
      description: 'Cuidado médico profesional 24/7',
      icon: '🏥',
      count: '25+ clínicas',
      color: 'from-petbnb-400 to-petbnb-500'
    },
    {
      title: 'Cuidadores individuales',
      description: 'Atención personalizada uno a uno',
      icon: '👨‍⚕️',
      count: '200+ cuidadores',
      color: 'from-sage-400 to-sage-500'
    }
  ];

  const testimonials = mockReviews.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-petbnb-50 via-white to-warm-50">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      {/* Hero Section */}
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
              <SearchBar onSearch={handleSearch} variant="hero" />
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

      {/* Categories Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explora nuestros servicios
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Diferentes opciones de cuidado para satisfacer las necesidades específicas de tu mascota
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="group cursor-pointer border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    {category.count}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hosts */}
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
                onViewDetails={handleViewDetails}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.includes(host.id)}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              variant="outline"
              onClick={() => setCurrentPage('search-results')}
              className="border-petbnb-300 text-petbnb-700 hover:bg-petbnb-50 px-8"
            >
              Ver todos los cuidadores
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Miles de dueños confían en Petbnb para el cuidado de sus mascotas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((review) => (
              <Card key={review.id} className="border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    "{review.comment}"
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">{review.userName}</span>
                    <span className="text-gray-500">Mascota: {review.petName}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-petbnb-500 to-primary-600">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">
              ¿Listo para encontrar el cuidador perfecto?
            </h2>
            <p className="text-xl mb-8 text-petbnb-100">
              Miles de cuidadores verificados esperan conocer a tu mascota
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => setCurrentPage('search-results')}
                className="bg-white text-petbnb-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
              >
                Comenzar búsqueda
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => setCurrentPage('become-host')}
                className="border-white text-white hover:bg-white hover:text-petbnb-600 px-8 py-3 text-lg font-semibold"
              >
                Convertirse en cuidador
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-petbnb-400 to-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🐾</span>
                </div>
                <span className="text-xl font-bold">Petbnb</span>
              </div>
              <p className="text-gray-400 text-sm">
                La plataforma líder en cuidado temporal de mascotas en México.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Buscar cuidadores</li>
                <li>Veterinarias certificadas</li>
                <li>Cuidado a domicilio</li>
                <li>Emergencias 24/7</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Acerca de nosotros</li>
                <li>Carreras</li>
                <li>Prensa</li>
                <li>Blog</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Centro de ayuda</li>
                <li>Contacto</li>
                <li>Términos de servicio</li>
                <li>Privacidad</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Petbnb. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
