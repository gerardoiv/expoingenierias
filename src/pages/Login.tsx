import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';

// Componente para verificar si el usuario está autenticado
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('userToken');
  const location = useLocation();

  if (!token) {
    // Redirigir al login si no hay token, guardando la ruta actual
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const Login = () => {
  // Verificar si ya hay un token al cargar la página
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      // Si hay un token, redirigir al dashboard
      window.location.href = '/dashboard';
    }
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-16 bg-expo-lightgray">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6 text-expo-blue">Acceso a Expo Ingenierías</h1>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export { ProtectedRoute };
export default Login;
