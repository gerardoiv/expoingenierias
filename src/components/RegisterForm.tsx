import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { API_ENDPOINTS } from '@/config/api';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    password: '',
    confirmPassword: '',
    semester: '',
    career: '',
  });

  const validateTecEmail = (email: string) => {
    return email.endsWith('@tec.mx');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateTecEmail(formData.email)) {
      toast.error('El correo debe ser institucional (@tec.mx)');
      setIsLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }
    if (!formData.semester || !formData.career) {
      toast.error('Por favor selecciona tu semestre y carrera');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.name,
          matricula: formData.studentId,
          email: formData.email,
          password: formData.password,
          semestre: parseInt(formData.semester),
          carrera: formData.career,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el registro');
      }

      toast.success('¡Registro exitoso! Ahora puedes iniciar sesión.');
      navigate('/login');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error en el registro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro</CardTitle>
        <CardDescription>
          Crea tu cuenta para participar en Expo Ingenierías
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="studentId">Matrícula</Label>
            <Input
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo institucional</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="semester">Semestre</Label>
            <Select
              value={formData.semester}
              onValueChange={(value) => handleSelectChange('semester', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tu semestre" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((sem) => (
                  <SelectItem key={sem} value={sem.toString()}>
                    {sem}° Semestre
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="career">Carrera</Label>
            <Select
              value={formData.career}
              onValueChange={(value) => handleSelectChange('career', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tu carrera" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IIS">Ingeniería en Sistemas Computacionales</SelectItem>
                <SelectItem value="IE">Ingeniería Electrónica</SelectItem>
                <SelectItem value="IM">Ingeniería Mecatrónica</SelectItem>
                <SelectItem value="II">Ingeniería Industrial</SelectItem>
                <SelectItem value="IC">Ingeniería Civil</SelectItem>
                <SelectItem value="IQ">Ingeniería Química</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RegisterForm;
