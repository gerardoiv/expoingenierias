import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { API_ENDPOINTS } from '@/config/api';

interface Project {
  id: number;
  nombre_equipo: string;
  matricula: string;
  nombre: string;
  carrera: string;
  semestre: number;
  nombre_archivo: string;
  ruta_archivo: string;
  estado: string;
  fecha_subida: string;
}

interface User {
  id: number;
  nombre: string;
  matricula: string;
  email: string;
  carrera: string;
  semestre: number;
  created_at: string;
  proyectos: Project[];
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.getUsers, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al cargar los usuarios');
      }

      const data = await response.json();
      if (data.success && data.users) {
        setUsers(data.users);
      }
    } catch (error) {
      toast.error('Error al cargar los usuarios');
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => 
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.carrera.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = async (projectId: number, newStatus: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.updateProjectStatus, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({
          projectId,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el estado');
      }

      const data = await response.json();
      if (data.success) {
        toast.success('Estado actualizado correctamente');
        // Actualizar el estado en la interfaz
        if (selectedUser) {
          const updatedUser = { ...selectedUser };
          const projectIndex = updatedUser.proyectos.findIndex(p => p.id === projectId);
          if (projectIndex !== -1) {
            updatedUser.proyectos[projectIndex].estado = newStatus;
            setSelectedUser(updatedUser);
          }
        }
      }
    } catch (error) {
      toast.error('Error al actualizar el estado');
    }
  };

  const handleDownload = async (project: Project) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.downloadProject}?id=${project.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Error al descargar el archivo');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = project.nombre_archivo;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast.error('Error al descargar el archivo');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleBackToList = () => {
    setSelectedUser(null);
  };

  // Calcular estadísticas
  const totalUsers = users.length;
  const totalProjects = users.reduce((acc, user) => acc + (user.proyectos?.length || 0), 0);
  const pendingProjects = users.reduce((acc, user) => {
    return acc + (user.proyectos?.filter(p => p.estado === 'pendiente').length || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fijo en la parte superior */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Panel de Administración</h1>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Contenido principal con margen superior */}
      <main className="container mx-auto py-6 px-4 mt-4">
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="mb-6 bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger value="users" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Usuarios Registrados
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Proyectos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Usuarios Registrados</h2>
              <p className="text-gray-600 mb-4">Gestiona los usuarios registrados en el sistema</p>
              
              <div className="mb-4">
                <Input
                  placeholder="Buscar por nombre, matrícula, email o carrera..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="max-w-md"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Total de Usuarios</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{totalUsers}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Total de Proyectos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{totalProjects}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Proyectos Pendientes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{pendingProjects}</p>
                  </CardContent>
                </Card>
              </div>

              {selectedUser ? (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Detalles del Usuario</CardTitle>
                      <CardDescription>Información y proyectos del usuario</CardDescription>
                    </div>
                    <Button onClick={handleBackToList} variant="outline">Volver a la lista</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <Label>Nombre</Label>
                        <p className="font-medium">{selectedUser.nombre}</p>
                      </div>
                      <div>
                        <Label>Matrícula</Label>
                        <p className="font-medium">{selectedUser.matricula}</p>
                      </div>
                      <div>
                        <Label>Email</Label>
                        <p className="font-medium">{selectedUser.email}</p>
                      </div>
                      <div>
                        <Label>Carrera</Label>
                        <p className="font-medium">{selectedUser.carrera}</p>
                      </div>
                      <div>
                        <Label>Semestre</Label>
                        <p className="font-medium">{selectedUser.semestre}</p>
                      </div>
                      <div>
                        <Label>Fecha de Registro</Label>
                        <p className="font-medium">{new Date(selectedUser.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Proyectos del Usuario</h3>
                      {selectedUser.proyectos && selectedUser.proyectos.length > 0 ? (
                        <div className="space-y-4">
                          {selectedUser.proyectos.map((project) => (
                            <Card key={project.id}>
                              <CardContent className="pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Label>Nombre del Proyecto</Label>
                                    <p className="font-medium">{project.nombre_equipo}</p>
                                  </div>
                                  <div>
                                    <Label>Estado</Label>
                                    <select
                                      className="w-full p-2 border rounded"
                                      value={project.estado}
                                      onChange={(e) => handleStatusChange(project.id, e.target.value)}
                                      aria-label="Estado del proyecto"
                                    >
                                      <option value="pendiente">Pendiente</option>
                                      <option value="en_revision">En Revisión</option>
                                      <option value="aprobado">Aprobado</option>
                                      <option value="rechazado">Rechazado</option>
                                    </select>
                                  </div>
                                  <div>
                                    <Label>Fecha de Subida</Label>
                                    <p className="text-sm text-gray-500">
                                      {new Date(project.fecha_subida).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <div className="flex items-end">
                                    <Button
                                      onClick={() => handleDownload(project)}
                                      variant="outline"
                                    >
                                      Descargar Proyecto
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">Este usuario no ha subido ningún proyecto.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredUsers.map((user) => (
                    <Card 
                      key={user.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleUserClick(user)}
                    >
                      <CardHeader>
                        <CardTitle>{user.nombre}</CardTitle>
                        <CardDescription>Matrícula: {user.matricula}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div>
                            <Label>Email</Label>
                            <p className="text-sm">{user.email}</p>
                          </div>
                          <div>
                            <Label>Carrera</Label>
                            <p className="text-sm">{user.carrera}</p>
                          </div>
                          <div>
                            <Label>Semestre</Label>
                            <p className="text-sm">{user.semestre}</p>
                          </div>
                          <div>
                            <Label>Proyectos</Label>
                            <p className="text-sm font-medium">{user.proyectos?.length || 0}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Todos los Proyectos</h2>
              <p className="text-gray-600 mb-4">Gestiona todos los proyectos enviados</p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Equipo</th>
                      <th className="p-2 text-left">Participante</th>
                      <th className="p-2 text-left">Carrera</th>
                      <th className="p-2 text-left">Estado</th>
                      <th className="p-2 text-left">Fecha</th>
                      <th className="p-2 text-left">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.flatMap(user => 
                      user.proyectos?.map(project => (
                        <tr key={project.id} className="border-b hover:bg-gray-50">
                          <td className="p-2">{project.nombre_equipo}</td>
                          <td className="p-2">{user.nombre}</td>
                          <td className="p-2">{user.carrera}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              project.estado === 'aprobado' ? 'bg-green-100 text-green-800' :
                              project.estado === 'rechazado' ? 'bg-red-100 text-red-800' :
                              project.estado === 'en_revision' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {project.estado.charAt(0).toUpperCase() + project.estado.slice(1)}
                            </span>
                          </td>
                          <td className="p-2">{new Date(project.fecha_subida).toLocaleDateString()}</td>
                          <td className="p-2">
                            <Button
                              onClick={() => handleDownload(project)}
                              variant="outline"
                              size="sm"
                            >
                              Descargar
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) || []}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard; 