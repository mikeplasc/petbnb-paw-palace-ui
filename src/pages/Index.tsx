import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import FeaturedHostsSection from '@/components/sections/FeaturedHostsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';
import { SearchFilters } from '@/components/SearchBar';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSearch = (filters: SearchFilters) => {
    console.log('Búsqueda realizada:', filters);
    
    // Create query string from filters
    const params = new URLSearchParams();
    if (filters.location) params.set('location', filters.location);
    if (filters.petType) params.set('petType', filters.petType);
    if (filters.startDate) params.set('startDate', filters.startDate.toISOString());
    if (filters.endDate) params.set('endDate', filters.endDate.toISOString());
    
    navigate(`/search?${params.toString()}`);
  };

  const handleNavigation = (page: string) => {
    switch (page) {
      case 'become-host':
        navigate('/become-host');
        break;
      case 'veterinaries':
        navigate('/veterinaries');
        break;
      case 'search-results':
        navigate('/search');
        break;
      default:
        setCurrentPage(page);
    }
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

  const handleViewAllHosts = () => {
    handleNavigation('search-results');
  };

  const handleStartSearch = () => {
    handleNavigation('search-results');
  };

  const handleBecomeHost = () => {
    handleNavigation('become-host');
  };

  return (
    <div className="bg-gradient-to-br from-petbnb-50 via-white to-warm-50">
      <HeroSection onSearch={handleSearch} />
      <CategoriesSection />
      <FeaturedHostsSection 
        favorites={favorites}
        onViewDetails={handleViewDetails}
        onToggleFavorite={handleToggleFavorite}
        onViewAllHosts={handleViewAllHosts}
      />
      <TestimonialsSection />
      <CTASection 
        onStartSearch={handleStartSearch}
        onBecomeHost={handleBecomeHost}
      />
      <Footer />
    </div>
  );
};

export default Index;
