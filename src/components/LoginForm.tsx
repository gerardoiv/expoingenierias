import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      
      // Simple validation for demo
      if (email === 'demo@example.com' && password === 'password') {
        toast.success('¡Inicio de sesión exitoso!');
        // In a real app, would redirect or update auth state
      } else {
        toast.error('Credenciales incorrectas. Intenta de nuevo.');
      }
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Iniciar sesión</CardTitle>
        <CardDescription>
          Accede a tu cuenta para consultar tus proyectos y calificaciones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu.correo@tec.mx"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <Link to="/recuperar-password" className="text-xs text-expo-blue hover:text-expo-lightblue">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col">
        <div className="flex items-center gap-2 mt-4 justify-center w-full">
          <div className="text-sm text-gray-600">¿No tienes una cuenta?</div>
          <Link to="/registro" className="text-sm font-semibold text-expo-blue hover:text-expo-lightblue">
            Crear una cuenta
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
