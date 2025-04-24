import React from 'react';
import ConvocatoriaHeader from '@/components/convocatoria/ConvocatoriaHeader';
import ConvocatoriaSection from '@/components/convocatoria/ConvocatoriaSection';

const Convocatoria = () => {
  const coordinadores = [
    {
      nombre: "Dr. Eduardo Francisco Reyes de Luna",
      email: "eduardoreyes.de@tec.mx"
    },
    {
      nombre: "Dr. Gerardo Ibarra Vázquez",
      email: "gerardo.ibarra.v@tec.mx"
    },
    {
      nombre: "Dr. José Daniel Azofeifa Ugalde",
      email: "jd.azofeifa@tec.mx"
    }
  ];

  return (
    <div className="pt-20 pb-16 bg-gray-50">
      <div className="container-section max-w-4xl mx-auto">
        <ConvocatoriaHeader />
        
        <div className="space-y-6">
          <ConvocatoriaSection title="A. INTRODUCCIÓN">
            <p>
              Expo ingenierías es el espacio para la difusión a la sociedad y a la industria de proyectos e investigaciones generados 
              en los cursos y unidades formativas de la Escuela de Ingeniería y Ciencias. Los estudiantes podrán recibir 
              retroalimentación valiosa de expertos en el campo y de personas interesadas en sus propuestas de forma presencial, 
              fomentando la colaboración, el intercambio de ideas y la conexión con posibles empleadores y oportunidades de carrera.
            </p>
          </ConvocatoriaSection>

          <ConvocatoriaSection title="B. CATEGORÍAS DE PROYECTOS">
            <ol className="list-decimal pl-5 space-y-2">
              <li>Propuestas de mejora.</li>
              <li>Prototipo físico.</li>
              <li>Prototipo digital.</li>
              <li>Estancia de investigación.</li>
              <li>Proyecto de fin de carrera.</li>
            </ol>
          </ConvocatoriaSection>

          <ConvocatoriaSection title="C. CONSIDERACIONES PARA EL EVENTO">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">1. Elegibilidad:</h3>
                <p className="mb-4">
                  La convocatoria está abierta a estudiantes de nivel licenciatura (pregrado) del Tecnológico de Monterrey, 
                  Campus Santa Fe, así como a estudiantes de otras universidades mexicanas o extranjeras que estén inscritos 
                  en el Tecnológico de Monterrey Campus Santa Fe durante el semestre febrero–junio de 2025.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Cada estudiante podrá inscribirse y participar únicamente en un equipo.</li>
                  <li>Todos los equipos deberán estar integrados exclusivamente por estudiantes de alguna ingeniería.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. Periodo de postulación:</h3>
                <p>
                  El periodo de postulación de proyectos inicia el 5 de mayo de 2025 y termina el 23 de mayo de 2025 a las 23:59 pm.
                </p>
                <p className="mt-2">
                  Liga para postulación: <a href="https://expoingenierias.eicsantafe.com/" className="text-expo-blue hover:underline">
                    https://expoingenierias.eicsantafe.com/
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Registro:</h3>
                <p>
                  El proceso para registrar los datos generales del proyecto, así como la información de los integrantes del equipo y del docente asesor, será publicado el 21 de abril de 2025. El registro deberá ser realizado exclusivamente por la o el estudiante que funja como representante y líder del equipo. Cada integrante será responsable de verificar cuidadosamente su información, ya que esta será utilizada para la emisión de los reconocimientos correspondientes. No se permitirá el registro posterior de integrantes que no hayan sido incluidos inicialmente, y aquellos estudiantes que no estén registrados a tiempo no podrán recibir su reconocimiento. Asimismo, los registros realizados directamente por docentes no serán válidos; únicamente las y los estudiantes podrán completar el proceso de inscripción.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">4. Aprobación del docente asesor:</h3>
                <p>
                  Las y los estudiantes deberán asegurarse de contar con el visto bueno de su docente asesor, quien será responsable de validar la calidad y pertinencia del proyecto antes de que este pueda avanzar al proceso de selección inicial.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">5. Límite de proyectos por categoría:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Para categorías 1 a 3: cada categoría tendrá hasta un máximo de 6 equipos inscritos, si se presenta un mayor registro se seleccionarán los 6 de mayor calidad e impacto.</li>
                  <li>Para categoría 4 y 5: no se tendrá límite de equipos inscritos.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">6. Selección de proyectos:</h3>
                <p>
                  La selección final de los proyectos será realizada por el Comité Organizador, con base en la revisión de la información proporcionada en el póster. Se verificará que la información esté completa, que la categoría de registro sea adecuada, y, sobre todo, que los proyectos demuestren alta calidad, así como soluciones viables a problemas relevantes.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">7. Notificación de resultados:</h3>
                <p>
                  Se dará aviso de los resultados del proceso de selección vía correo electrónico al representante del equipo con copia al resto de sus miembros y a su docente/asesor.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">8. Declinación de participación:</h3>
                <p>
                  En caso de declinar la participación en la exposición, se deberá informar al Comité Organizador a más tardar el 30 de mayo de 2025 vía electrónica al correo: eduardoreyes.de@tec.mx
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">9. Evaluación (puntos):</h3>
                <p>
                  La evaluación de los proyectos se llevará a cabo de manera presencial durante el evento, por parte de un jurado previamente seleccionado. Cada proyecto podrá obtener hasta 25 puntos como puntaje máximo, distribuidos en cinco categorías, con un valor máximo de 5 puntos por categoría. Las categorías a evaluar son las siguientes:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Presentación y explicación</li>
                  <li>Potencial de impacto y funcionalidad</li>
                  <li>Innovación y creatividad</li>
                  <li>Aplicación de los principios de ingeniería y fundamentos científicos</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">10. Bonificación de puntos:</h3>
                <p>
                  Durante el registro, cada equipo podrá indicar si su proyecto cumple con uno de los criterios para recibir hasta 5 puntos adicionales. Cada equipo deberá seleccionar únicamente una de las áreas de bonificación, la cual será evaluada por el comité organizador. En el caso de proyectos con componente de impacto social, la evaluación se realizará en conjunto con la Dirección de Servicio Social (DSS) del Campus Santa Fe. Esta bonificación será considerada por el jurado durante el proceso de evaluación. Los proyectos podrán ser reconocidos por aspectos sobresalientes, tales como:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Proyectos de alta calidad y que apliquen para alguna de las Áreas de Impacto prioritarias para la Escuela de Ingeniería y Ciencias. El póster deberá incluir el logo correspondiente oficial para identificarlo. Solo podrán aplicar para una única Área de impacto.</li>
                  <li>Socio formador: Los equipos que presenten un proyecto de alguna unidad formativa o proyecto independiente, que se esté desarrollándose para algún socio formador que tenga convenio con el Tecnológico de Monterrey. Los socios formadores reconocidos aquí, deberán ser empresas o instituciones legalmente constituidas, con impacto regional, nacional o internacional y se deberá demostrar la relación de convenio vigente con el proyecto y el Tec de Monterrey.</li>
                  <li>Impacto Social: Proyectos desarrollados de manera independiente o dentro de alguna unidad formativa, cuyo objetivo principal sea atender una problemática social específica, con enfoque en el bienestar comunitario, la sostenibilidad o la inclusión. Estos proyectos deberán demostrar evidencia del impacto positivo en la comunidad, ya sea a nivel local, regional o nacional.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">11. Constancias de participación:</h3>
                <p>
                  Se otorgarán diplomas de reconocimiento a los equipos que obtengan los tres primeros lugares de cada categoría. Los diplomas únicamente se entregarán a los integrantes que estén presentes durante el evento. En caso de inasistencia, no se entregará reconocimiento individual, aun si el equipo resulta ganador.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">12. Casos no previstos:</h3>
                <p>
                  Para casos o eventualidades no previstas en este listado, el comité organizador deberá tomar una decisión y una vez tomada será inapelable.
                </p>
              </div>
            </div>
          </ConvocatoriaSection>

          <ConvocatoriaSection title="D. CONCURSO">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. Evaluación de proyectos:</h3>
                <p>
                  Todos los proyectos serán evaluados por profesores y expertos en el área de forma presencial. 
                  Si un profesor es asesor de un proyecto de una categoría, no podrá participar como evaluador 
                  en dicha categoría, pero sí en otras donde no participe.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2. Entregables requeridos:</h3>
                <p>Póster descriptivo (lineamientos abiertos según campus y docente asesor).</p>
              </div>
            </div>
          </ConvocatoriaSection>

          <ConvocatoriaSection title="E. RECONOCIMIENTOS Y PREMIOS">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. Categorías generales:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Los primeros 3 lugares de cada una de las 5 categorías recibirán un reconocimiento con valor curricular.</li>
                  <li>Premio en especie al primer lugar de cada una de las 5 categorías.</li>
                </ul>
              </div>
            </div>
          </ConvocatoriaSection>

          <ConvocatoriaSection title="F. CONTENIDO DEL RESUMEN PARA INSCRIPCIÓN">
            <p className="mb-4">
              El resumen es un componente esencial en el proceso de registro de los equipos, ya que proporciona una visión clara 
              y concisa del proyecto en términos técnicos.
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Extensión máxima de 250 palabras.</li>
              <li>Descripción: deberá sintetizar en qué consiste el proyecto (objetivo).</li>
              <li>Problema: Describir el problema o la necesidad que se resuelve.</li>
              <li>Metodología: presentar los diferentes métodos o técnicas a emplear.</li>
              <li>Principales resultados esperados.</li>
              <li>Factibilidad técnica de la solución.</li>
              <li>Impacto del proyecto.</li>
            </ol>
          </ConvocatoriaSection>

          <ConvocatoriaSection title="H. INTEGRANTES DEL COMITÉ ORGANIZADOR">
            <div>
              <h3 className="font-semibold mb-4">Coordinadores:</h3>
              <ul className="space-y-2">
                {coordinadores.map((coordinador, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span>{coordinador.nombre}</span>
                    <a href={`mailto:${coordinador.email}`} className="text-expo-blue hover:underline text-sm">
                      {coordinador.email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ConvocatoriaSection>

          <ConvocatoriaSection title="I. FECHAS IMPORTANTES">
            <ul className="space-y-4">
              <li>1. APERTURA DE SISTEMA DE REGISTRO: 5 de mayo de 2025.</li>
              <li>2. CIERRE DE REGISTRO: 23 de mayo de 2025.</li>
              <li>3. LÍMITE PARA ENTREGA DE PÓSTER DIGITAL: 30 de mayo de 2025.</li>
              <li>4. LÍMITE PARA CANCELAR LA PRESENTACIÓN DEL PROYECTO: 30 de mayo de 2025.</li>
              <li>5. DESCARGA DE DIPLOMAS: 20 de junio de 2025.</li>
            </ul>
          </ConvocatoriaSection>
        </div>
      </div>
    </div>
  );
};

export default Convocatoria;
