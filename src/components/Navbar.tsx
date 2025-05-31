
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Calendar, Settings, Menu, Stethoscope, Heart, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { signOut, user } = useAuth();
  const { toast } = useToast();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión exitosamente",
      });
      navigate('/auth');
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cerrar la sesión",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <img 
            src="/lovable-uploads/8ce9ae46-8233-4060-a032-afdcc9bd5d24.png" 
            alt="Petbnb Logo" 
            className="w-10 h-10 object-contain"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
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
            to="/hosts"
            className={`text-sm font-medium transition-colors hover:text-primary-600 ${
              isActive('/hosts') ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            Cuidadores
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
          <Link
            to="/adoption"
            className={`text-sm font-medium transition-colors hover:text-primary-600 ${
              isActive('/adoption') ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            Adopción
          </Link>
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-10 w-10 rounded-full border border-gray-300 hover:shadow-md transition-shadow"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="Usuario" />
                  <AvatarFallback className="bg-gradient-to-br from-primary-100 to-accent-100 text-primary-700">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg" align="end">
              <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-50">
                <Link to="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Mi perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-50">
                <Link to="/my-bookings">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Mis reservas</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-50">
                <Link to="/my-pets">
                  <span className="mr-2">🐕</span>
                  <span>Mis mascotas</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-50">
                <Link to="/my-veterinaries">
                  <Stethoscope className="mr-2 h-4 w-4" />
                  <span>Mis veterinarias</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-50">
                <Link to="/favorites">
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Favoritos</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-50">
                <Link to="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-gray-50 text-red-600"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
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

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-2 flex space-x-4 overflow-x-auto">
          <Link
            to="/"
            className={`text-sm font-medium px-3 py-2 rounded-md transition-colors whitespace-nowrap ${
              isActive('/') ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:text-primary-600'
            }`}
          >
            Buscar
          </Link>
          <Link
            to="/hosts"
            className={`text-sm font-medium px-3 py-2 rounded-md transition-colors whitespace-nowrap ${
              isActive('/hosts') ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:text-primary-600'
            }`}
          >
            Cuidadores
          </Link>
          <Link
            to="/become-host"
            className={`text-sm font-medium px-3 py-2 rounded-md transition-colors whitespace-nowrap ${
              isActive('/become-host') ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:text-primary-600'
            }`}
          >
            Cuidador
          </Link>
          <Link
            to="/veterinaries"
            className={`text-sm font-medium px-3 py-2 rounded-md transition-colors whitespace-nowrap ${
              isActive('/veterinaries') ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:text-primary-600'
            }`}
          >
            Veterinarias
          </Link>
          <Link
            to="/my-veterinaries"
            className={`text-sm font-medium px-3 py-2 rounded-md transition-colors whitespace-nowrap ${
              isActive('/my-veterinaries') ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:text-primary-600'
            }`}
          >
            Mis Vet.
          </Link>
          <Link
            to="/adoption"
            className={`text-sm font-medium px-3 py-2 rounded-md transition-colors whitespace-nowrap ${
              isActive('/adoption') ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:text-primary-600'
            }`}
          >
            Adopción
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
