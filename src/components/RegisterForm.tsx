import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import bcrypt from 'bcryptjs';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    password: '',
    confirmPassword: '',
    semester: '',
    career: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateTecEmail = (email: string) => {
    return email.endsWith('@tec.mx');
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

    // Encriptar la contraseña antes de enviar
    const hashedPassword = await bcrypt.hash(formData.password, 10);

    // Simular envío de datos
    setTimeout(() => {
      setIsLoading(false);
      toast.success('¡Registro exitoso! Ahora puedes iniciar sesión.');
      // Aquí se enviaría: {...formData, password: hashedPassword}
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
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              placeholder="Nombre completo"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Semestre</Label>
              <Select required value={formData.semester} onValueChange={v => handleSelectChange('semester', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(12)].map((_, i) => (
                    <SelectItem key={i+1} value={(i+1).toString()}>{i+1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Carrera</Label>
              <Select required value={formData.career} onValueChange={v => handleSelectChange('career', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IMT">IMT</SelectItem>
                  <SelectItem value="ITI">ITI</SelectItem>
                  <SelectItem value="IRS">IRS</SelectItem>
                  <SelectItem value="IIS">IIS</SelectItem>
                  <SelectItem value="IBT">IBT</SelectItem>
                  <SelectItem value="Other">Otra</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="font-semibold text-expo-blue hover:text-expo-lightblue">
            Iniciar sesión
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
