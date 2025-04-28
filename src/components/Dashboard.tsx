import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { API_ENDPOINTS } from '@/config/api';

interface UserData {
  nombre: string;
  matricula: string;
  email: string;
  semestre: number;
  carrera: string;
}

interface Project {
  id: number;
  nombre_archivo: string;
  nombre_original: string;
  estado: string;
  fecha_subida: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [projectFile, setProjectFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [hasProject, setHasProject] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) {
      navigate('/login');
      return;
    }
    setUserData(JSON.parse(storedUserData));
    fetchUserProjects();
  }, [navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.getUserProjects}?userId=${userData?.matricula}`);
        const data = await response.json();
        if (data.success) {
          // Verificar si hay proyectos en la respuesta
          if (data.projects && data.projects.length > 0) {
            setHasProject(true);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userData?.matricula) {
      fetchUserData();
    }
  }, [userData?.matricula]);

  const fetchUserProjects = async () => {
    try {
      if (!userData?.matricula) {
        console.error('No hay matrícula de usuario disponible');
        return;
      }

      const response = await fetch(`${API_ENDPOINTS.getUserProjects}?userId=${userData.matricula}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al cargar los proyectos');
      }

      const data = await response.json();
      console.log('Proyectos recibidos:', data); // Para depuración
      
      if (data.success && data.projects) {
        setUserProjects(data.projects);
        // Actualizar hasProject basado en los proyectos recibidos
        setHasProject(data.projects.length > 0);
      } else {
        console.error('Respuesta inválida del servidor:', data);
      }
    } catch (error) {
      console.error('Error al cargar los proyectos:', error);
      toast.error('Error al cargar tus proyectos');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hasProject) {
      toast.error('Ya has subido un proyecto. No se permiten más subidas.');
      return;
    }
    if (e.target.files && e.target.files[0]) {
      setProjectFile(e.target.files[0]);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasProject) {
      toast.error('Ya has subido un proyecto. No se permiten más subidas.');
      return;
    }
    if (!projectFile) {
      toast.error('Por favor selecciona un archivo');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('project', projectFile);
    formData.append('userId', userData?.matricula || '');

    try {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(Math.round(progress));
        }
      });

      xhr.addEventListener('load', () => {
        try {
          const response = JSON.parse(xhr.responseText);
          if (response.success) {
            toast.success('¡Proyecto subido exitosamente!');
            setProjectFile(null);
            setUploadProgress(0);
            setHasProject(true);
            fetchUserProjects();
          } else {
            if (response.message && response.message.includes('Ya has subido un proyecto')) {
              setHasProject(true);
              toast.error(response.message);
            } else {
              toast.error(response.message || 'Error al subir el proyecto');
            }
          }
        } catch (error) {
          console.error('Error al procesar la respuesta:', error);
          toast.error('Error al procesar la respuesta del servidor');
        }
      });

      xhr.addEventListener('error', () => {
        toast.error('Error de red al subir el proyecto');
      });

      xhr.open('POST', API_ENDPOINTS.uploadProject);
      xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('userToken')}`);
      xhr.send(formData);

    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al subir el proyecto');
      setUploadProgress(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  if (!userData) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprobado':
        return 'bg-green-100 text-green-800';
      case 'rechazado':
        return 'bg-red-100 text-red-800';
      case 'en_revision':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-8">
      <div className="container mx-auto px-4 space-y-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Información del Usuario */}
          <Card>
            <CardHeader>
              <CardTitle>Información del Usuario</CardTitle>
              <CardDescription>Datos de tu registro</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Nombre</Label>
                <p className="text-lg">{userData.nombre}</p>
              </div>
              <div>
                <Label>Matrícula</Label>
                <p className="text-lg">{userData.matricula}</p>
              </div>
              <div>
                <Label>Email</Label>
                <p className="text-lg">{userData.email}</p>
              </div>
              <div>
                <Label>Carrera</Label>
                <p className="text-lg">{userData.carrera}</p>
              </div>
              <div>
                <Label>Semestre</Label>
                <p className="text-lg">{userData.semestre}° Semestre</p>
              </div>
            </CardContent>
          </Card>

          {/* Formulario de Subida de Proyecto */}
          <Card>
            <CardHeader>
              <CardTitle>Subir Proyecto</CardTitle>
              <CardDescription>Envía tu proyecto para la evaluación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {hasProject ? (
                <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 17a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Ya has subido un proyecto. Solo se permite un proyecto por usuario.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="project">Archivo del Proyecto</Label>
                    <Input
                      id="project"
                      type="file"
                      onChange={handleFileChange}
                      accept=".zip,.rar,.pdf"
                      required
                      disabled={hasProject}
                    />
                    {uploadProgress > 0 && (
                      <div className="space-y-2">
                        <Progress value={uploadProgress} className="w-full" />
                        <p className="text-sm text-gray-500 text-center">
                          {uploadProgress}% completado
                        </p>
                      </div>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading || hasProject}>
                    {isLoading ? 'Subiendo...' : 'Subir Proyecto'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sección de Resultados */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
            <CardDescription>Estado de tus proyectos y calificaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userProjects.length > 0 ? (
                userProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold">Estado del Proyecto</h3>
                      <p className="text-gray-600">{project.nombre_original || project.nombre_archivo}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.estado)}`}>
                        {project.estado.charAt(0).toUpperCase() + project.estado.slice(1)}
                      </span>
                      <p className="text-sm text-gray-500 mt-2">
                        Subido el {new Date(project.fecha_subida).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No has subido ningún proyecto aún.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard; 