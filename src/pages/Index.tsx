
import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import FeaturedHostsSection from "@/components/sections/FeaturedHostsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/sections/Footer";
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  // Add favorites state
  const [hostFavorites, setHostFavorites] = useState<string[]>([]);

  // Add useEffect to load favorites from localStorage
  useEffect(() => {
    const savedHostFavorites = JSON.parse(localStorage.getItem('hostFavorites') || '[]');
    setHostFavorites(savedHostFavorites);
  }, []);

  // Add function to toggle host favorites
  const toggleHostFavorite = (hostId: string) => {
    const updatedFavorites = hostFavorites.includes(hostId)
      ? hostFavorites.filter(id => id !== hostId)
      : [...hostFavorites, hostId];
    
    setHostFavorites(updatedFavorites);
    localStorage.setItem('hostFavorites', JSON.stringify(updatedFavorites));
    
    toast({
      title: hostFavorites.includes(hostId) ? "Eliminado de favoritos" : "Añadido a favoritos",
      description: hostFavorites.includes(hostId) 
        ? "El cuidador se eliminó de tus favoritos" 
        : "El cuidador se añadió a tus favoritos",
    });
  };

  const handleSearch = () => {
    console.log('Buscar cuidadores');
  };

  const handleStartSearch = () => {
    console.log('Comenzar búsqueda');
  };

  const handleBecomeHost = () => {
    console.log('Convertirse en cuidador');
  };

  return (
    <div className="min-h-screen">
      <HeroSection onSearch={handleSearch} />
      <CategoriesSection />
      <FeaturedHostsSection 
        hostFavorites={hostFavorites}
        onToggleFavorite={toggleHostFavorite}
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
