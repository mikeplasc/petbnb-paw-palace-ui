import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import { DateRange } from "react-day-picker";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Host } from '@/data/mockData';
import HostCard from '@/components/HostCard';
import VeterinaryProfileModal from '@/components/VeterinaryProfileModal';
import { mockHosts, cities } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

interface SearchParams {
  location?: string;
  startDate?: string;
  endDate?: string;
  guests?: string;
}

const SearchResults = () => {
  const [location, setLocation] = useState<string>('');
  const [guests, setGuests] = useState<number>(1);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [hosts, setHosts] = useState<Host[]>(mockHosts);
  const [selectedHost, setSelectedHost] = useState<Host | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();
  
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
    const searchParams: SearchParams = {
      location,
      startDate: date?.from?.toISOString(),
      endDate: date?.to?.toISOString(),
      guests: guests.toString(),
    };

    const queryParams = new URLSearchParams();
    for (const key in searchParams) {
      if (searchParams[key]) {
        queryParams.append(key, searchParams[key]!);
      }
    }

    navigate(`/search?${queryParams.toString()}`);
  };

  const handleViewDetails = (hostId: string) => {
    const host = hosts.find((host) => host.id === hostId);
    setSelectedHost(host);
    setIsProfileModalOpen(true);
  };

  const filteredHosts = hosts.filter(host =>
    host.location.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-petbnb-500 to-primary-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Encuentra el cuidador perfecto
          </h1>
          <p className="text-lg md:text-xl opacity-80">
            Reserva cuidadores de confianza para tus mascotas
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <section className="bg-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Location Input */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                Ubicación
              </label>
              <Input
                type="text"
                id="location"
                placeholder="¿A dónde quieres ir?"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Date Range Picker */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dates">
                Fechas
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <Calendar
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                    pagedNavigation
                    className="border-none shadow-md"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Guests Select */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guests">
                Huéspedes
              </label>
              <Input
                type="number"
                id="guests"
                placeholder="Número de huéspedes"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6">
            <Button className="w-full bg-petbnb-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              Buscar
            </Button>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Resultados para {location}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredHosts.map((host) => (
              <HostCard
                key={host.id}
                host={host}
                isFavorite={hostFavorites.includes(host.id)}
                onToggleFavorite={toggleHostFavorite}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          {filteredHosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No se encontraron cuidadores
              </h3>
              <p className="text-gray-500">
                Intenta ajustar tus criterios de búsqueda
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Veterinary Profile Modal */}
      {selectedHost && (
        <VeterinaryProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          veterinary={selectedHost}
          onBooking={() => console.log('Booking')}
        />
      )}
    </div>
  );
};

export default SearchResults;
