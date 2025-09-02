import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, XCircle, RotateCcw, Trophy, Target } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "¿Cuál es el primer paso en el proceso de desarrollo seguro de software?",
    options: [
      "Implementar controles de seguridad",
      "Realizar análisis de amenazas",
      "Definir los requerimientos de seguridad",
      "Ejecutar pruebas de penetración"
    ],
    correctAnswer: 0,
    explanation: "Los requerimientos de seguridad deben definirse desde el inicio del proyecto para garantizar que la seguridad sea considerada en todas las fases del desarrollo."
  },
  {
    id: 2,
    question: "¿Qué significa OWASP en el contexto de seguridad web?",
    options: [
      "Open Web Application Security Project",
      "Online Web Application Security Protocol",
      "Organized Web Application Security Platform",
      "Official Web Application Security Process"
    ],
    correctAnswer: 0,
    explanation: "OWASP (Open Web Application Security Project) es una organización sin fines de lucro dedicada a mejorar la seguridad del software."
  },
  {
    id: 3,
    question: "¿Cuál de las siguientes es una práctica esencial en la validación de entrada?",
    options: [
      "Implementar validación tanto en el cliente como en el servidor",
      "Confiar en la validación del lado del cliente únicamente",
      "Validar solo los datos críticos",
      "Validar únicamente en el servidor de base de datos"
    ],
    correctAnswer: 0,
    explanation: "La validación debe implementarse tanto en el cliente (para experiencia de usuario) como en el servidor (para seguridad real), ya que la validación del cliente puede ser fácilmente evitada."
  },
  {
    id: 4,
    question: "¿Qué es la inyección SQL y cómo se puede prevenir?",
    options: [
      "Un ataque que usa consultas preparadas para prevenirse",
      "Un método de optimización de base de datos",
      "Un ataque donde código SQL malicioso se ejecuta, prevenible con consultas parametrizadas",
      "Una técnica de respaldo de base de datos"
    ],
    correctAnswer: 2,
    explanation: "La inyección SQL es un ataque donde se inserta código SQL malicioso. Se previene usando consultas parametrizadas, procedimientos almacenados y validación de entrada."
  },
  {
    id: 5,
    question: "¿Cuál es la diferencia entre autenticación y autorización?",
    options: [
      "No hay diferencia, son términos sinónimos",
      "Autenticación verifica identidad, autorización verifica permisos",
      "Autorización verifica identidad, autenticación verifica permisos",
      "Ambas solo verifican la identidad del usuario"
    ],
    correctAnswer: 1,
    explanation: "La autenticación verifica quién eres (identidad), mientras que la autorización determina qué puedes hacer (permisos y accesos)."
  },
  {
    id: 6,
    question: "¿Qué característica debe tener una contraseña segura?",
    options: [
      "Mínimo 8 caracteres con combinación de mayúsculas, minúsculas, números y símbolos",
      "Solo letras minúsculas para facilitar el recuerdo",
      "Solo números para mayor seguridad",
      "Palabras del diccionario para facilitar el recuerdo"
    ],
    correctAnswer: 0,
    explanation: "Una contraseña segura debe tener al menos 8 caracteres (preferiblemente más) y combinar mayúsculas, minúsculas, números y símbolos especiales."
  },
  {
    id: 7,
    question: "¿Qué es el principio de menor privilegio?",
    options: [
      "Dar a los usuarios el máximo acceso posible",
      "Otorgar solo los permisos mínimos necesarios para realizar una tarea",
      "Restringir el acceso solo a administradores",
      "Permitir acceso completo a todos los desarrolladores"
    ],
    correctAnswer: 1,
    explanation: "El principio de menor privilegio establece que se debe otorgar solo los permisos mínimos necesarios para que un usuario o proceso pueda realizar su función específica."
  },
  {
    id: 8,
    question: "¿Cuál es la importancia del cifrado en el desarrollo seguro?",
    options: [
      "Solo es importante para aplicaciones bancarias",
      "Protege la confidencialidad e integridad de los datos",
      "Mejora el rendimiento de la aplicación",
      "No es necesario si se tiene un firewall"
    ],
    correctAnswer: 1,
    explanation: "El cifrado es fundamental para proteger la confidencialidad e integridad de los datos sensibles, tanto en tránsito como en reposo."
  },
  {
    id: 9,
    question: "¿Por qué es importante usar HTTPS en aplicaciones web?",
    options: [
      "Solo es necesario para sitios de comercio electrónico",
      "Protege la integridad y confidencialidad de los datos transmitidos",
      "Mejora la velocidad de carga del sitio web",
      "Es obligatorio para todos los sitios web"
    ],
    correctAnswer: 1,
    explanation: "El HTTPS utiliza certificados SSL/TLS para establecer una conexión segura, protegiendo la integridad y confidencialidad de los datos transmitidos."
  },
  {
    id: 10,
    question: "¿Qué es la autenticación multifactor (MFA)?",
    options: [
      "Combinación de dos o más factores independientes de autenticación",
      "Un método que solo utiliza contraseñas",
      "Un sistema que solo funciona con huellas digitales",
      "Una técnica obsoleta de seguridad"
    ],
    correctAnswer: 0,
    explanation: "La autenticación multifactor combina dos o más factores independientes (algo que sabes, algo que tienes, algo que eres), aumentando significativamente la seguridad."
  },
  {
    id: 11,
    question: "¿Qué son las pruebas de penetración?",
    options: [
      "Pruebas de rendimiento del sistema",
      "Evaluaciones autorizadas que simulan ataques para identificar vulnerabilidades",
      "Análisis de código fuente",
      "Pruebas de usabilidad"
    ],
    correctAnswer: 1,
    explanation: "Las pruebas de penetración son evaluaciones autorizadas que simulan ataques reales para identificar vulnerabilidades antes de que sean explotadas por atacantes."
  },
  {
    id: 12,
    question: "¿Qué es un ataque de Cross-Site Scripting (XSS)?",
    options: [
      "Un ataque que solo afecta a servidores",
      "Un tipo de ataque de denegación de servicio",
      "Un ataque donde se inyecta código malicioso que se ejecuta en el navegador del usuario",
      "Un método para optimizar sitios web"
    ],
    correctAnswer: 2,
    explanation: "XSS es un ataque donde se inyecta código malicioso (generalmente JavaScript) que se ejecuta en el navegador del usuario, permitiendo robar información o realizar acciones no autorizadas."
  },
  {
    id: 13,
    question: "¿Qué es la gestión segura de sesiones?",
    options: [
      "Mantener sesiones abiertas indefinidamente",
      "Usar cookies sin cifrar para almacenar datos de sesión",
      "Implementar tiempos de expiración y rotación de tokens",
      "Almacenar credenciales en texto plano"
    ],
    correctAnswer: 2,
    explanation: "La gestión segura de sesiones incluye prácticas como tiempos de expiración, rotación de tokens, invalidación de sesiones y protección de cookies para prevenir ataques de secuestro de sesión."
  },
  {
    id: 14,
    question: "¿Qué es CSRF (Cross-Site Request Forgery)?",
    options: [
      "Un método de autenticación segura",
      "Un ataque que fuerza a usuarios autenticados a ejecutar acciones no deseadas",
      "Una técnica de cifrado",
      "Un protocolo de comunicación segura"
    ],
    correctAnswer: 1,
    explanation: "CSRF es un ataque que engaña a usuarios autenticados para que ejecuten acciones no deseadas en aplicaciones web donde están autenticados."
  },
  {
    id: 15,
    question: "¿Cuál es la importancia de la gestión de sesiones segura?",
    options: [
      "Solo mejora la velocidad de la aplicación",
      "Previene el secuestro de sesiones y accesos no autorizados",
      "Reduce el uso de memoria",
      "Facilita el desarrollo"
    ],
    correctAnswer: 1,
    explanation: "La gestión segura de sesiones es crucial para prevenir ataques como el secuestro de sesiones, fijación de sesiones y accesos no autorizados."
  },
  {
    id: 16,
    question: "¿Qué es el principio de defensa en profundidad?",
    options: [
      "Usar solo una capa de seguridad muy fuerte",
      "Implementar múltiples capas de controles de seguridad",
      "Confiar únicamente en la seguridad del sistema operativo",
      "Usar solo controles de seguridad físicos"
    ],
    correctAnswer: 1,
    explanation: "La defensa en profundidad implica implementar múltiples capas de controles de seguridad para que si una falla, otras puedan seguir protegiendo el sistema."
  },
  {
    id: 17,
    question: "¿Cuál es el propósito de las pruebas de penetración?",
    options: [
      "Optimizar el código fuente",
      "Simular ataques reales para identificar vulnerabilidades",
      "Mejorar la interfaz de usuario",
      "Acelerar el desarrollo"
    ],
    correctAnswer: 1,
    explanation: "Las pruebas de penetración simulan ataques reales para identificar vulnerabilidades de seguridad antes de que sean explotadas por atacantes maliciosos."
  },
  {
    id: 18,
    question: "¿Qué es la sanitización de datos?",
    options: [
      "Eliminar datos innecesarios",
      "Limpiar y validar datos de entrada para prevenir ataques",
      "Comprimir datos para ahorrar espacio",
      "Cifrar todos los datos"
    ],
    correctAnswer: 1,
    explanation: "La sanitización de datos es el proceso de limpiar y validar datos de entrada para eliminar o neutralizar contenido potencialmente malicioso."
  },
  {
    id: 19,
    question: "¿Cuál es la importancia del logging y monitoreo en seguridad?",
    options: [
      "Solo para cumplir con regulaciones",
      "Detectar, investigar y responder a incidentes de seguridad",
      "Mejorar el rendimiento del sistema",
      "Reducir el uso de recursos"
    ],
    correctAnswer: 1,
    explanation: "El logging y monitoreo son esenciales para detectar actividades sospechosas, investigar incidentes de seguridad y responder rápidamente a amenazas."
  },
  {
    id: 20,
    question: "¿Qué es la autenticación multifactor (MFA)?",
    options: [
      "Usar múltiples contraseñas",
      "Combinar dos o más métodos de verificación de identidad",
      "Autenticarse en múltiples aplicaciones",
      "Usar solo biometría"
    ],
    correctAnswer: 1,
    explanation: "MFA combina dos o más factores de autenticación (algo que sabes, algo que tienes, algo que eres) para proporcionar mayor seguridad."
  },
  {
    id: 21,
    question: "¿Cuál es el objetivo de la revisión de código de seguridad?",
    options: [
      "Mejorar solo el rendimiento",
      "Identificar vulnerabilidades de seguridad en el código fuente",
      "Reducir el tamaño del código",
      "Automatizar el despliegue"
    ],
    correctAnswer: 1,
    explanation: "La revisión de código de seguridad busca identificar vulnerabilidades, malas prácticas de seguridad y posibles puntos de entrada para atacantes."
  },
  {
    id: 22,
    question: "¿Qué es el hardening de sistemas?",
    options: [
      "Fortalecer la seguridad mediante la configuración y eliminación de servicios innecesarios",
      "Aumentar la capacidad de procesamiento",
      "Instalar más software",
      "Aumentar la memoria RAM"
    ],
    correctAnswer: 0,
    explanation: "El hardening es el proceso de fortalecer la seguridad de un sistema mediante configuraciones seguras, eliminación de servicios innecesarios y aplicación de parches."
  },
  {
    id: 23,
    question: "¿Cuál es la importancia de mantener software actualizado?",
    options: [
      "Solo para obtener nuevas características",
      "Corregir vulnerabilidades de seguridad conocidas",
      "Mejorar solo la apariencia",
      "Reducir el uso de recursos"
    ],
    correctAnswer: 1,
    explanation: "Mantener el software actualizado es crucial para corregir vulnerabilidades de seguridad conocidas y protegerse contra exploits públicos."
  },
  {
    id: 24,
    question: "¿Qué es un certificado digital?",
    options: [
      "Un documento físico de identificación",
      "Un archivo electrónico que verifica la identidad de una entidad",
      "Una contraseña especial",
      "Un tipo de base de datos"
    ],
    correctAnswer: 1,
    explanation: "Un certificado digital es un archivo electrónico que utiliza criptografía de clave pública para verificar la identidad de una entidad y establecer comunicaciones seguras."
  },
  {
    id: 25,
    question: "¿Cuál es el propósito de la segmentación de red?",
    options: [
      "Aumentar la velocidad de Internet",
      "Dividir la red en segmentos para limitar el alcance de ataques",
      "Reducir el costo de hardware",
      "Simplificar la administración"
    ],
    correctAnswer: 1,
    explanation: "La segmentación de red divide la infraestructura en segmentos separados para limitar el movimiento lateral de atacantes y contener posibles brechas."
  },
  {
    id: 26,
    question: "¿Qué es el análisis estático de código?",
    options: [
      "Ejecutar el código para buscar errores",
      "Examinar el código fuente sin ejecutarlo para encontrar vulnerabilidades",
      "Compilar el código",
      "Documentar el código"
    ],
    correctAnswer: 1,
    explanation: "El análisis estático examina el código fuente sin ejecutarlo, utilizando herramientas automatizadas para identificar vulnerabilidades y problemas de seguridad."
  },
  {
    id: 27,
    question: "¿Cuál es la función de un sistema de detección de intrusiones (IDS)?",
    options: [
      "Acelerar el tráfico de red",
      "Monitorear y detectar actividades maliciosas o sospechosas",
      "Gestionar contraseñas",
      "Comprimir datos"
    ],
    correctAnswer: 1,
    explanation: "Un IDS monitorea el tráfico de red y las actividades del sistema para detectar comportamientos maliciosos o sospechosos y alertar a los administradores."
  },
  {
    id: 28,
    question: "¿Qué es la ingeniería social en el contexto de seguridad?",
    options: [
      "Desarrollo de software social",
      "Manipulación psicológica para obtener información confidencial",
      "Diseño de interfaces de usuario",
      "Gestión de redes sociales"
    ],
    correctAnswer: 1,
    explanation: "La ingeniería social es la manipulación psicológica de personas para que divulguen información confidencial o realicen acciones que comprometan la seguridad."
  },
  {
    id: 29,
    question: "¿Cuál es el objetivo de la clasificación de datos?",
    options: [
      "Organizar archivos por fecha",
      "Categorizar datos según su sensibilidad para aplicar controles apropiados",
      "Reducir el tamaño de archivos",
      "Mejorar la velocidad de acceso"
    ],
    correctAnswer: 1,
    explanation: "La clasificación de datos categoriza la información según su sensibilidad y criticidad para aplicar los controles de seguridad y protección apropiados."
  },
  {
    id: 30,
    question: "¿Qué es un plan de respuesta a incidentes?",
    options: [
      "Un manual de usuario",
      "Un procedimiento documentado para manejar incidentes de seguridad",
      "Una lista de contactos",
      "Un cronograma de desarrollo"
    ],
    correctAnswer: 1,
    explanation: "Un plan de respuesta a incidentes es un conjunto de procedimientos documentados para detectar, responder y recuperarse de incidentes de seguridad de manera efectiva."
  },
  {
    id: 31,
    question: "¿Cuál es la importancia de la educación en seguridad para desarrolladores?",
    options: [
      "Solo para cumplir con certificaciones",
      "Crear conciencia sobre amenazas y mejores prácticas de seguridad",
      "Aumentar la velocidad de desarrollo",
      "Reducir costos de desarrollo"
    ],
    correctAnswer: 1,
    explanation: "La educación en seguridad es fundamental para que los desarrolladores comprendan las amenazas actuales y apliquen las mejores prácticas de desarrollo seguro."
  },
  {
    id: 32,
    question: "¿Qué es la tokenización en seguridad de datos?",
    options: [
      "Dividir texto en palabras",
      "Reemplazar datos sensibles con tokens no sensibles",
      "Crear copias de seguridad",
      "Comprimir archivos"
    ],
    correctAnswer: 1,
    explanation: "La tokenización reemplaza datos sensibles con tokens únicos y no sensibles, manteniendo la funcionalidad mientras protege la información original."
  },
  {
    id: 33,
    question: "¿Cuál es el propósito de las políticas de seguridad?",
    options: [
      "Documentar el código",
      "Establecer reglas y procedimientos para proteger los activos de información",
      "Mejorar la interfaz de usuario",
      "Acelerar el desarrollo"
    ],
    correctAnswer: 1,
    explanation: "Las políticas de seguridad establecen las reglas, procedimientos y estándares que una organización debe seguir para proteger sus activos de información."
  },
  {
    id: 34,
    question: "¿Qué es la evaluación de vulnerabilidades?",
    options: [
      "Medir el rendimiento del sistema",
      "Identificar y evaluar debilidades de seguridad en sistemas",
      "Contar líneas de código",
      "Revisar la documentación"
    ],
    correctAnswer: 1,
    explanation: "La evaluación de vulnerabilidades es un proceso sistemático para identificar, cuantificar y priorizar las vulnerabilidades de seguridad en un sistema."
  },
  {
    id: 35,
    question: "¿Cuál es la diferencia entre HTTP y HTTPS?",
    options: [
      "HTTPS es más rápido que HTTP",
      "HTTPS incluye cifrado SSL/TLS para comunicaciones seguras",
      "HTTP es más seguro que HTTPS",
      "No hay diferencia significativa"
    ],
    correctAnswer: 1,
    explanation: "HTTPS (HTTP Secure) utiliza cifrado SSL/TLS para proteger la comunicación entre el navegador y el servidor, mientras que HTTP transmite datos en texto plano."
  },
  {
    id: 36,
    question: "¿Qué es la gestión de parches de seguridad?",
    options: [
      "Crear nuevas funcionalidades",
      "Proceso de identificar, probar y aplicar actualizaciones de seguridad",
      "Diseñar interfaces",
      "Optimizar bases de datos"
    ],
    correctAnswer: 1,
    explanation: "La gestión de parches es el proceso sistemático de identificar, evaluar, probar y aplicar actualizaciones de seguridad para corregir vulnerabilidades."
  },
  {
    id: 37,
    question: "¿Cuál es el objetivo de la arquitectura de seguridad?",
    options: [
      "Mejorar solo el rendimiento",
      "Diseñar sistemas con controles de seguridad integrados desde el inicio",
      "Reducir costos de desarrollo",
      "Acelerar el tiempo de entrega"
    ],
    correctAnswer: 1,
    explanation: "La arquitectura de seguridad busca integrar controles y principios de seguridad en el diseño fundamental del sistema desde las etapas iniciales."
  },
  {
    id: 38,
    question: "¿Qué son los controles de acceso basados en roles (RBAC)?",
    options: [
      "Controles basados en ubicación geográfica",
      "Sistema que asigna permisos según los roles de usuario",
      "Controles basados en horarios",
      "Sistema de contraseñas por departamento"
    ],
    correctAnswer: 1,
    explanation: "RBAC es un modelo de control de acceso que asigna permisos a usuarios basándose en sus roles dentro de la organización, simplificando la gestión de permisos."
  },
  {
    id: 39,
    question: "¿Cuál es la importancia del cifrado de datos en reposo?",
    options: [
      "Solo para cumplir regulaciones",
      "Proteger datos almacenados contra acceso no autorizado",
      "Mejorar la velocidad de acceso",
      "Reducir el espacio de almacenamiento"
    ],
    correctAnswer: 1,
    explanation: "El cifrado de datos en reposo protege la información almacenada contra acceso no autorizado, incluso si los dispositivos de almacenamiento son comprometidos."
  },
  {
    id: 40,
    question: "¿Qué es un análisis de impacto de privacidad (PIA)?",
    options: [
      "Análisis de rendimiento de aplicaciones",
      "Evaluación de cómo un proyecto afecta la privacidad de datos personales",
      "Revisión de código fuente",
      "Análisis de costos de desarrollo"
    ],
    correctAnswer: 1,
    explanation: "Un PIA evalúa cómo un proyecto, sistema o proceso puede afectar la privacidad de los datos personales y qué medidas se necesitan para protegerla."
  },
  {
    id: 41,
    question: "¿Cuál es el propósito de la autenticación basada en certificados?",
    options: [
      "Acelerar el proceso de login",
      "Proporcionar autenticación fuerte usando criptografía de clave pública",
      "Reducir el uso de memoria",
      "Simplificar las interfaces"
    ],
    correctAnswer: 1,
    explanation: "La autenticación basada en certificados utiliza criptografía de clave pública para proporcionar una forma más segura de verificar identidades."
  },
  {
    id: 42,
    question: "¿Qué es la gestión de vulnerabilidades?",
    options: [
      "Crear nuevas funcionalidades",
      "Proceso continuo de identificar, evaluar y remediar vulnerabilidades",
      "Diseñar interfaces de usuario",
      "Optimizar bases de datos"
    ],
    correctAnswer: 1,
    explanation: "La gestión de vulnerabilidades es un proceso continuo que incluye la identificación, evaluación, priorización y remediación de vulnerabilidades de seguridad."
  },
  {
    id: 43,
    question: "¿Cuál es la importancia de la configuración segura por defecto?",
    options: [
      "Minimizar la superficie de ataque desde la instalación inicial",
      "Mejorar solo el rendimiento",
      "Facilitar la instalación",
      "Reducir el tamaño del software"
    ],
    correctAnswer: 0,
    explanation: "La configuración segura por defecto minimiza la superficie de ataque desde el momento de la instalación, requiriendo acciones explícitas para habilitar funcionalidades potencialmente riesgosas."
  },
  {
    id: 44,
    question: "¿Qué es el principio de fail-safe en seguridad?",
    options: [
      "Nunca fallar en el sistema",
      "Fallar de manera segura, denegando acceso cuando hay problemas",
      "Reiniciar automáticamente",
      "Ignorar errores de seguridad"
    ],
    correctAnswer: 1,
    explanation: "El principio fail-safe establece que cuando un sistema falla o encuentra un error, debe fallar de manera segura, típicamente denegando acceso hasta que se resuelva el problema."
  },
  {
    id: 45,
    question: "¿Cuál es el objetivo de la gestión de identidades y accesos (IAM)?",
    options: [
      "Gestionar solo contraseñas",
      "Controlar quién tiene acceso a qué recursos y cuándo",
      "Mejorar la velocidad de red",
      "Reducir costos de hardware"
    ],
    correctAnswer: 1,
    explanation: "IAM es un marco de políticas y tecnologías que asegura que las personas correctas tengan el acceso apropiado a los recursos correctos en el momento correcto."
  },
  {
    id: 46,
    question: "¿Qué es la criptografía simétrica?",
    options: [
      "Usar diferentes claves para cifrar y descifrar",
      "Usar la misma clave para cifrar y descifrar datos",
      "No usar claves de cifrado",
      "Usar solo números en las claves"
    ],
    correctAnswer: 1,
    explanation: "La criptografía simétrica utiliza la misma clave secreta para cifrar y descifrar datos, siendo eficiente para grandes volúmenes de información."
  },
  {
    id: 47,
    question: "¿Cuál es la ventaja principal de la criptografía asimétrica?",
    options: [
      "Es más rápida que la simétrica",
      "Permite intercambio seguro de claves sin canal seguro previo",
      "Usa menos recursos computacionales",
      "Es más fácil de implementar"
    ],
    correctAnswer: 1,
    explanation: "La criptografía asimétrica permite el intercambio seguro de claves y la comunicación segura sin necesidad de un canal seguro preestablecido."
  },
  {
    id: 48,
    question: "¿Qué es un honeypot en seguridad informática?",
    options: [
      "Un tipo de antivirus",
      "Un sistema señuelo diseñado para atraer y detectar atacantes",
      "Una herramienta de desarrollo",
      "Un protocolo de red"
    ],
    correctAnswer: 1,
    explanation: "Un honeypot es un sistema señuelo que simula ser vulnerable para atraer atacantes, permitiendo estudiar sus métodos y detectar ataques."
  },
  {
    id: 49,
    question: "¿Cuál es la importancia de la trazabilidad en seguridad?",
    options: [
      "Mejorar el rendimiento",
      "Rastrear acciones y cambios para auditorías y investigaciones",
      "Reducir el uso de memoria",
      "Acelerar las consultas"
    ],
    correctAnswer: 1,
    explanation: "La trazabilidad permite rastrear quién hizo qué, cuándo y dónde, siendo esencial para auditorías, cumplimiento normativo e investigaciones de incidentes."
  },
  {
    id: 50,
    question: "¿Qué es la validación de entrada del lado del servidor?",
    options: [
      "Validación que solo mejora la experiencia de usuario",
      "Verificación de datos en el servidor para garantizar seguridad",
      "Verificación de datos en el servidor para garantizar seguridad",
      "Verificación de velocidad de conexión"
    ],
    correctAnswer: 1,
    explanation: "La validación del lado del servidor es crucial para la seguridad, ya que verifica y sanitiza todos los datos recibidos, independientemente de la validación del cliente."
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers(new Array(questions.length).fill(-1));
    setShowResults(false);
    setShowExplanation(false);
    setQuizStarted(false);
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return '¡Excelente! Tienes un conocimiento sólido sobre desarrollo seguro.';
    if (percentage >= 80) return '¡Muy bien! Tienes una buena comprensión de los conceptos de seguridad.';
    if (percentage >= 70) return 'Bien. Tienes conocimientos básicos, pero podrías mejorar en algunas áreas.';
    if (percentage >= 60) return 'Aceptable. Te recomendamos revisar algunos conceptos de seguridad.';
    return 'Te recomendamos estudiar más sobre desarrollo seguro de software.';
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Evaluación de Desarrollo Seguro
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Pon a prueba tus conocimientos sobre las mejores prácticas de desarrollo seguro de software
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Detalles del Quiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center justify-center p-3 bg-white rounded-lg">
                <span className="font-medium">📝 {questions.length} Preguntas</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-white rounded-lg">
                <span className="font-medium">⏱️ Sin límite de tiempo</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-white rounded-lg">
                <span className="font-medium">🎯 Opción múltiple</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setQuizStarted(true)}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Comenzar Evaluación
            <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ¡Quiz Completado!
            </h1>
            <div className={`text-6xl font-bold mb-4 ${getScoreColor(score)}`}>
              {percentage}%
            </div>
            <p className="text-xl text-gray-600 mb-2">
              {score} de {questions.length} respuestas correctas
            </p>
            <p className="text-lg text-gray-500">
              {getScoreMessage(score)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {questions.map((question, index) => {
              const isCorrect = answers[index] === question.correctAnswer;
              const wasAnswered = answers[index] !== -1;
              
              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    !wasAnswered
                      ? 'border-gray-200 bg-gray-50'
                      : isCorrect
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Pregunta {index + 1}
                    </span>
                    {wasAnswered && (
                      isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )
                    )}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {question.question}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <button
              onClick={restartQuiz}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <RotateCcw className="mr-2 w-5 h-5" />
              Realizar Quiz Nuevamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const hasAnswered = answers[currentQuestion] !== -1;
  const selectedAnswer = answers[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Desarrollo Seguro</h1>
            <span className="text-blue-100">
              Pregunta {currentQuestion + 1} de {questions.length}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-blue-600 rounded-full h-3">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Content */}
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 leading-relaxed">
              {question.question}
            </h2>
            
            <div className="space-y-3">
              {question.options.map((option, index) => {
                let buttonStyle = "w-full p-4 text-left rounded-xl border-2 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md ";
                
                if (!hasAnswered) {
                  buttonStyle += "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50 text-gray-800";
                } else {
                  if (index === question.correctAnswer) {
                    buttonStyle += "border-green-300 bg-green-100 text-green-800";
                  } else if (index === selectedAnswer && index !== question.correctAnswer) {
                    buttonStyle += "border-red-300 bg-red-100 text-red-800";
                  } else {
                    buttonStyle += "border-gray-200 bg-gray-100 text-gray-600";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => !hasAnswered && handleAnswer(index)}
                    disabled={hasAnswered}
                    className={buttonStyle}
                  >
                    <div className="flex items-center">
                      <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 text-sm font-semibold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="font-medium">{option}</span>
                      {hasAnswered && index === question.correctAnswer && (
                        <CheckCircle className="ml-auto w-6 h-6 text-green-600" />
                      )}
                      {hasAnswered && index === selectedAnswer && index !== question.correctAnswer && (
                        <XCircle className="ml-auto w-6 h-6 text-red-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6 animate-fade-in">
              <h3 className="font-semibold text-blue-900 mb-2">Explicación:</h3>
              <p className="text-blue-800">{question.explanation}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className={`inline-flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                currentQuestion === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 transform hover:scale-105'
              }`}
            >
              <ChevronLeft className="mr-2 w-5 h-5" />
              Anterior
            </button>

            {hasAnswered && (
              <button
                onClick={nextQuestion}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {currentQuestion === questions.length - 1 ? 'Ver Resultados' : 'Siguiente'}
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;