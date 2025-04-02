
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/medalleros" element={<Medalleros />} />
          <Route path="/ganadores" element={<Ganadores />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/convocatoria" element={<Convocatoria />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
