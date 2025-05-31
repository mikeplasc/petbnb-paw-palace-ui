
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  onStartSearch: () => void;
  onBecomeHost: () => void;
}

const CTASection = ({ onStartSearch, onBecomeHost }: CTASectionProps) => {
  return (
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
              onClick={onStartSearch}
              className="bg-white text-petbnb-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            >
              Comenzar búsqueda
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={onBecomeHost}
              className="border-white text-white hover:bg-white hover:text-petbnb-600 px-8 py-3 text-lg font-semibold"
            >
              Convertirse en cuidador
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
