
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    campus: '',
    studentId: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, campus: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple validation for demo
    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      toast.success('¡Registro exitoso! Ahora puedes iniciar sesión.');
      // In a real app, we would redirect to login page
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Crear una cuenta</CardTitle>
        <CardDescription>
          Regístrate para participar en Expo Ingenierías
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre(s)</Label>
              <Input
                id="firstName"
                placeholder="Juan"
                required
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido(s)</Label>
              <Input
                id="lastName"
                placeholder="Pérez"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Correo institucional</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu.correo@tec.mx"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">Matrícula</Label>
              <Input
                id="studentId"
                placeholder="A01234567"
                required
                value={formData.studentId}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Campus</Label>
              <Select required value={formData.campus} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CCM">Ciudad de México</SelectItem>
                  <SelectItem value="CEM">Estado de México</SelectItem>
                  <SelectItem value="CSF">Santa Fe</SelectItem>
                  <SelectItem value="TOL">Toluca</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="font-semibold text-expo-blue hover:text-expo-orange">
            Iniciar sesión
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
