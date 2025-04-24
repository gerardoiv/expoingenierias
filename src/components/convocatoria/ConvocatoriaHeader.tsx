
import React from 'react';
import { Calendar } from "lucide-react";

const ConvocatoriaHeader = () => {
  return (
    <div className="bg-gradient-to-r from-expo-blue to-expo-lightblue text-white py-16 px-6 rounded-lg shadow-lg mb-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" styles="color:white">
          El Tecnológico de Monterrey a través de<br />
          la Escuela de Ingeniería y Ciencias de Campus Santa Fe
        </h2>
        <div className="text-2xl font-semibold uppercase tracking-wider mb-6">INVITA</div>
        
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          a todas y todos sus estudiantes con el apoyo de sus docentes, a postularse como expositores en la quinta edición de
        </p>
        
        <div className="bg-white bg-opacity-20 rounded-xl p-6 inline-block">
          <div className="flex items-center justify-center gap-4">
            <Calendar className="w-10 h-10 text-white" />
            <div>
              <h3 className="text-xl font-semibold">Febrero - Junio 2025</h3>
              <p className="text-sm">PRESENCIAL: Campus Santa Fe (CSF)</p>
              <p className="text-sm">Martes 10 de junio del 2025</p>
              <p className="text-sm">Salón de Congresos: 16:00 a 19:30 horas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvocatoriaHeader;
