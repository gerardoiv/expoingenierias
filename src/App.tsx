import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Medalleros from "./pages/Medalleros";
import Ganadores from "./pages/Ganadores";
import Categorias from "./pages/Categorias";
import Convocatoria from "./pages/Convocatoria";
import Proyectos from "./pages/Proyectos";
import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

// Componente para verificar si el usuario está autenticado
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('userToken');
  
  if (!token) {
    // Redirigir al login si no hay token
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Componente para verificar si el administrador está autenticado
const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('adminToken');
  
  if (!token) {
    // Redirigir al login de admin si no hay token
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Toaster />
      <Sonner />
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/medalleros" element={<Medalleros />} />
        <Route path="/ganadores" element={<Ganadores />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/convocatoria" element={<Convocatoria />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
