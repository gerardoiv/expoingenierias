
import React from 'react';

const ConvocatoriaHeader = () => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-expo-blue mb-4">
        El Tecnológico de Monterrey a través de<br />
        la Escuela de Ingeniería y Ciencias de Campus Santa Fe
      </h2>
      <div className="text-xl md:text-2xl font-semibold text-expo-blue mb-6">
        INVITA
      </div>
      <p className="text-lg md:text-xl mb-4">
        a todas y todos sus estudiantes con el apoyo de sus docentes, a postularse como expositores en la quinta edición de
      </p>
      <p className="text-xl font-semibold text-expo-blue mb-6">
        Febrero - Junio 2025
      </p>
      <div className="bg-expo-blue text-white p-4 rounded-lg inline-block">
        <h3 className="text-lg font-semibold mb-2">PRESENCIAL:</h3>
        <p>
          Campus Santa Fe (CSF): Martes 10 de junio del 2025<br />
          Salón de Congresos de 16:00 a 19:30 horas
        </p>
      </div>
    </div>
  );
};

export default ConvocatoriaHeader;
