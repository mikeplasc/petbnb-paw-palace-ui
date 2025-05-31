
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const Auth = () => {
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp, resetPassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          toast({
            title: "Error",
            description: "Las contraseñas no coinciden",
            variant: "destructive",
          });
          return;
        }
        
        const { error } = await signUp(email, password, fullName);
        if (error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          // Verificar si el usuario ya está autenticado (login automático)
          // Si no, mostrar mensaje de confirmación de email
          setTimeout(() => {
            // Dar tiempo para que el AuthContext se actualice
            const currentUser = JSON.parse(localStorage.getItem('sb-dcfhncdeurerzzvmlxuf-auth-token') || '{}');
            if (currentUser?.user) {
              toast({
                title: "¡Bienvenido!",
                description: "Tu cuenta ha sido creada exitosamente",
              });
              navigate('/');
            } else {
              toast({
                title: "¡Cuenta creada!",
                description: "Revisa tu email para confirmar tu cuenta",
              });
              setMode('login');
            }
          }, 1000);
        }
      } else if (mode === 'login') {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          navigate('/');
        }
      } else if (mode === 'reset') {
        const { error } = await resetPassword(email);
        if (error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Email enviado",
            description: "Revisa tu email para resetear tu contraseña",
          });
          setMode('login');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setConfirmPassword('');
  };

  const switchMode = (newMode: 'login' | 'signup' | 'reset') => {
    setMode(newMode);
    resetForm();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-petbnb-50 via-white to-warm-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img 
              src="/lovable-uploads/8ce9ae46-8233-4060-a032-afdcc9bd5d24.png" 
              alt="Petbnb Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Petbnb
            </span>
          </div>
          <CardTitle>
            {mode === 'login' && 'Iniciar Sesión'}
            {mode === 'signup' && 'Crear Cuenta'}
            {mode === 'reset' && 'Resetear Contraseña'}
          </CardTitle>
          <CardDescription>
            {mode === 'login' && 'Ingresa a tu cuenta para continuar'}
            {mode === 'signup' && 'Crea una nueva cuenta para comenzar'}
            {mode === 'reset' && 'Te enviaremos un link para resetear tu contraseña'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre completo</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Tu nombre completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {mode !== 'reset' && (
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirma tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Cargando...' : (
                mode === 'login' ? 'Iniciar Sesión' :
                mode === 'signup' ? 'Crear Cuenta' : 'Enviar Email'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            {mode === 'login' && (
              <>
                <button
                  type="button"
                  onClick={() => switchMode('reset')}
                  className="text-sm text-primary-600 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
                <div>
                  <span className="text-sm text-gray-600">¿No tienes cuenta? </span>
                  <button
                    type="button"
                    onClick={() => switchMode('signup')}
                    className="text-sm text-primary-600 hover:underline"
                  >
                    Regístrate aquí
                  </button>
                </div>
              </>
            )}

            {mode === 'signup' && (
              <div>
                <span className="text-sm text-gray-600">¿Ya tienes cuenta? </span>
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="text-sm text-primary-600 hover:underline"
                >
                  Inicia sesión
                </button>
              </div>
            )}

            {mode === 'reset' && (
              <button
                type="button"
                onClick={() => switchMode('login')}
                className="text-sm text-primary-600 hover:underline"
              >
                Volver al login
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
