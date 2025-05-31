
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Heart, User, Calendar, Settings, Menu } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-gradient-to-br from-petbnb-400 to-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">🐾</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-petbnb-600 to-primary-600 bg-clip-text text-transparent">
            Petbnb
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary-600 ${
              isActive('/') ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            Buscar
          </Link>
          <Link
            to="/become-host"
            className={`text-sm font-medium transition-colors hover:text-primary-600 ${
              isActive('/become-host') ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            Convertirse en cuidador
          </Link>
          <Link
            to="/veterinaries"
            className={`text-sm font-medium transition-colors hover:text-primary-600 ${
              isActive('/veterinaries') ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            Veterinarias
          </Link>
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
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
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                <User className="mr-2 h-4 w-4" />
                <span>Mi perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Mis reservas</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                <span className="mr-2">🐕</span>
                <span>Mis mascotas</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 text-red-600">
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation (could be expanded in the future) */}
      <div className="md:hidden border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-2 flex space-x-4">
          <Link
            to="/"
            className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
              isActive('/') ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:text-primary-600'
            }`}
          >
            Buscar
          </Link>
          <Link
            to="/become-host"
            className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
              isActive('/become-host') ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:text-primary-600'
            }`}
          >
            Cuidador
          </Link>
          <Link
            to="/veterinaries"
            className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
              isActive('/veterinaries') ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:text-primary-600'
            }`}
          >
            Veterinarias
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
