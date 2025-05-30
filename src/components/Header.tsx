
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Heart, User, Calendar, Settings } from 'lucide-react';

interface HeaderProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const Header = ({ currentPage = 'home', onNavigate }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => handleNavigation('home')}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-petbnb-400 to-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">🐾</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-petbnb-600 to-primary-600 bg-clip-text text-transparent">
            Petbnb
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => handleNavigation('home')}
            className={`text-sm font-medium transition-colors hover:text-primary-600 ${
              currentPage === 'home' ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            Buscar
          </button>
          <button
            onClick={() => handleNavigation('become-host')}
            className={`text-sm font-medium transition-colors hover:text-primary-600 ${
              currentPage === 'become-host' ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            Convertirse en cuidador
          </button>
          <button
            onClick={() => handleNavigation('veterinaries')}
            className={`text-sm font-medium transition-colors hover:text-primary-600 ${
              currentPage === 'veterinaries' ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            Veterinarias
          </button>
        </nav>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation('favorites')}
            className="hidden sm:flex items-center space-x-1 text-gray-600 hover:text-primary-600"
          >
            <Heart className="w-4 h-4" />
            <span>Favoritos</span>
          </Button>

          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-10 w-10 rounded-full border border-gray-300 hover:shadow-md transition-shadow"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="Usuario" />
                  <AvatarFallback className="bg-gradient-to-br from-petbnb-100 to-primary-100 text-primary-700">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg" align="end">
              <DropdownMenuItem 
                onClick={() => handleNavigation('profile')}
                className="cursor-pointer hover:bg-gray-50"
              >
                <User className="mr-2 h-4 w-4" />
                <span>Mi perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleNavigation('bookings')}
                className="cursor-pointer hover:bg-gray-50"
              >
                <Calendar className="mr-2 h-4 w-4" />
                <span>Mis reservas</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleNavigation('pets')}
                className="cursor-pointer hover:bg-gray-50"
              >
                <span className="mr-2">🐕</span>
                <span>Mis mascotas</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => handleNavigation('settings')}
                className="cursor-pointer hover:bg-gray-50"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 text-red-600">
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
