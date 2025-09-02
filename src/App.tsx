import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, XCircle, RotateCcw, Trophy, Target } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions = [
  {
    id: 1,
    question: "¿Cuál es una de las mejores prácticas para asegurar una base de datos?",
    options: [
      "No aplicar cifrado a los datos",
      "Utilizar la versión más antigua del software",
      "Proteger todos los datos con cifrado",
      "Eliminar las bases de datos antiguas"
    ],
    correctAnswer: 2,
    explanation: "El cifrado es una medida fundamental para proteger la confidencialidad de los datos en bases de datos, tanto en reposo como en tránsito."
  },
  {
    id: 2,
    question: "¿Qué tipo de prueba ayuda a identificar todas las librerías y dependencias empleadas para verificar el uso correcto de componentes según licencias como GNU/GPL, Apache, etc.?",
    options: [
      "Integración",
      "SCA",
      "SAST",
      "Unitarias",
      "Carga",
      "DAST"
    ],
    correctAnswer: 1,
    explanation: "SCA (Software Composition Analysis) se enfoca en analizar componentes de terceros, identificando librerías, dependencias y verificando licencias y vulnerabilidades."
  },
  {
    id: 3,
    question: "Un vehículo autónomo comienza a tomar decisiones erróneas debido a pequeños cambios en las señales de tráfico que no son detectables para los humanos. ¿Qué tipo de ataque está afectando al modelo del vehículo autónomo?",
    options: [
      "Envenenamiento de datos",
      "Ataque adversarial",
      "Filtración de información",
      "Inyección de código"
    ],
    correctAnswer: 1,
    explanation: "Los ataques adversariales utilizan modificaciones imperceptibles para humanos pero que engañan a los modelos de IA, causando clasificaciones erróneas."
  },
  {
    id: 4,
    question: "¿Cuál de los siguientes NO representa un área crítica de la superficie de ataque móvil de acuerdo con OWASP MASVS?",
    options: [
      "MASVS-NETWORK",
      "MASVS-AUTH",
      "MASVS-PLATFORM",
      "MASVS-DEVOPS",
      "MASVS-CRYPTO",
      "MASVS-STORAGE"
    ],
    correctAnswer: 3,
    explanation: "MASVS-DEVOPS no es una categoría estándar en OWASP MASVS. Las categorías reales incluyen NETWORK, AUTH, PLATFORM, CRYPTO, STORAGE, CODE, y RESILIENCE."
  },
  {
    id: 5,
    question: "¿Qué enfoque debe utilizarse para configurar un ambiente seguro?",
    options: [
      "Mantener cuentas predeterminadas activas",
      "Otorgar derechos explícitos a todos los usuarios",
      "Dar acceso administrativo por defecto",
      "Eliminar servicios innecesarios"
    ],
    correctAnswer: 3,
    explanation: "Eliminar servicios innecesarios reduce la superficie de ataque y sigue el principio de menor privilegio, mejorando la seguridad del ambiente."
  },
  {
    id: 6,
    question: "¿Qué categoría establece que la aplicación debe contar con un mecanismo para hacer cumplir las actualizaciones de la aplicación?",
    options: [
      "MASVS-CODE",
      "MASVS-STORAGE",
      "MASVS-CRYPTO",
      "MASVS-DEVOPS",
      "MASVS-AUTH",
      "MASVS-NETWORK"
    ],
    correctAnswer: 0,
    explanation: "MASVS-CODE cubre los controles relacionados con la calidad del código y mecanismos de actualización para mantener la aplicación segura."
  },
  {
    id: 7,
    question: "¿Qué vulnerabilidad se produce cuando las prácticas recomendadas de seguridad no se siguen correctamente, incluyendo parches no aplicados, exposición de logs de depuración, servicios innecesarios, implementación incorrecta de CORS, etc.?",
    options: [
      "Autorización de nivel de función rota",
      "Autorización de nivel de propiedad de objeto roto",
      "Acceso sin restricciones a flujos comerciales sensibles",
      "Falsificación de solicitudes del lado del servidor",
      "Gestión inadecuada del inventario",
      "Configuración incorrecta de seguridad"
    ],
    correctAnswer: 5,
    explanation: "La configuración incorrecta de seguridad ocurre cuando no se implementan correctamente las mejores prácticas de seguridad."
  },
  {
    id: 8,
    question: "¿Cuál de las siguientes afirmaciones sobre SAST y SCA es correcta?",
    options: [
      "SCA es una técnica que evalúa el rendimiento y la seguridad de una aplicación al ejecutarla",
      "SAST permite detectar vulnerabilidades de seguridad en el código fuente sin necesidad de ejecutar la aplicación",
      "SCA solo identifica problemas de seguridad y no aborda otros defectos en el código",
      "SCA se enfoca principalmente en la calidad del código y no abarca la seguridad en la aplicación",
      "SAST se utiliza exclusivamente para analizar el rendimiento de una aplicación",
      "SAST y SCA son lo mismo"
    ],
    correctAnswer: 1,
    explanation: "SAST (Static Application Security Testing) analiza el código fuente sin ejecutar la aplicación, detectando vulnerabilidades de seguridad de forma estática."
  },
  {
    id: 9,
    question: "La gestión automática de memoria en lenguajes de programación más nuevos permite prevenir ataques que sobrecarguen la memoria con objetos inalcanzables. ¿Esto podría ayudar a prevenir ataques de denegación de servicio?",
    options: [
      "Falso",
      "Verdadero"
    ],
    correctAnswer: 1,
    explanation: "La gestión automática de memoria (garbage collection) ayuda a prevenir memory leaks y ataques DoS relacionados con el agotamiento de memoria."
  },
  {
    id: 10,
    question: "¿Qué control garantiza que cualquier dato confidencial almacenado intencionalmente por la aplicación esté protegido adecuadamente, independientemente de la ubicación de destino?",
    options: [
      "MASVS-NETWORK",
      "MASVS-CRYPTO",
      "MASVS-AUTH",
      "MASVS-STORAGE",
      "MASVS-RESILIENCE",
      "MASVS-DEVOPS"
    ],
    correctAnswer: 3,
    explanation: "MASVS-STORAGE se enfoca en garantizar que los datos confidenciales estén protegidos adecuadamente en cualquier ubicación de almacenamiento."
  },
  {
    id: 11,
    question: "¿Cómo se pueden mitigar las vulnerabilidades de autenticación rota?",
    options: [
      "Eliminando el uso de tokens",
      "Implementando mecanismos de autenticación sólidos",
      "Deshabilitando todas las claves de la API",
      "Ignorando la gestión de sesiones"
    ],
    correctAnswer: 1,
    explanation: "Los mecanismos de autenticación sólidos incluyen autenticación multifactor, gestión segura de sesiones y validación adecuada de credenciales."
  },
  {
    id: 12,
    question: "Durante la implementación de un nuevo entorno en la nube, el equipo de TI decide usar scripts automatizados para aprovisionar servidores y bases de datos. ¿Qué enfoque están utilizando?",
    options: [
      "Administración de artefactos",
      "DevSecOps",
      "Consistencia operativa",
      "Infraestructura como Código (IaC)"
    ],
    correctAnswer: 3,
    explanation: "Infraestructura como Código (IaC) utiliza scripts y plantillas para automatizar el aprovisionamiento y configuración de infraestructura."
  },
  {
    id: 13,
    question: "¿Cuál es la práctica recomendada para actualizar las imágenes de contenedor en un entorno DevOps?",
    options: [
      "No actualizar las imágenes si funcionan correctamente",
      "Actualizar las imágenes manualmente sin pruebas",
      "Automatizar la actualización de las imágenes base y revisar las vulnerabilidades",
      "Esperar a que surjan vulnerabilidades antes de actualizar las imágenes"
    ],
    correctAnswer: 2,
    explanation: "La automatización de actualizaciones con revisión de vulnerabilidades asegura que los contenedores mantengan parches de seguridad actualizados."
  },
  {
    id: 14,
    question: "¿Cómo puede prevenirse una configuración insegura?",
    options: [
      "Usando credenciales compartidas en todos los entornos",
      "Eliminando funciones y frameworks no utilizados",
      "No actualizar configuraciones",
      "Evitando procesos de hardening"
    ],
    correctAnswer: 1,
    explanation: "Eliminar componentes, funciones y frameworks no utilizados reduce la superficie de ataque y previene configuraciones inseguras."
  },
  {
    id: 15,
    question: "¿Cuál es el propósito principal de las herramientas utilizadas en DevOps para gestionar riesgos y vulnerabilidades?",
    options: [
      "Detectar y marcar los riesgos y vulnerabilidades para su investigación",
      "Mejorar la eficiencia del proceso de desarrollo",
      "Asegurar la infraestructura en la nube",
      "Automatizar el proceso de entrega continua"
    ],
    correctAnswer: 0,
    explanation: "Las herramientas de seguridad en DevOps tienen como objetivo principal identificar, detectar y señalar riesgos para su posterior análisis y remediación."
  },
  {
    id: 16,
    question: "¿Qué principio establece que el acceso debe ser permitido solo a usuarios específicos?",
    options: [
      "Validación de entradas",
      "Modelado de amenazas",
      "Principio de mínimo privilegio",
      "Hardening de seguridad"
    ],
    correctAnswer: 2,
    explanation: "El principio de mínimo privilegio establece que los usuarios deben tener solo los permisos mínimos necesarios para realizar sus funciones."
  },
  {
    id: 17,
    question: "Un desarrollador de DevOps ha dejado claves SSH incrustadas en el código fuente. ¿Qué acción debería tomar para corregir esto?",
    options: [
      "Eliminar las claves incrustadas y utilizar métodos de acceso seguros",
      "Mantener las claves en el repositorio para facilitar su acceso",
      "Reemplazar las claves sin verificar el código",
      "Dejar las claves para futuras actualizaciones"
    ],
    correctAnswer: 0,
    explanation: "Las credenciales nunca deben estar hardcodeadas. Se deben eliminar y usar gestores de secretos o variables de entorno seguras."
  },
  {
    id: 18,
    question: "Si elimina todos los servicios y procesos innecesarios, ¿qué tipo de amenaza logrará impedir que se materialice?",
    options: [
      "Inyección",
      "Errores criptográficos",
      "Diseño inseguro",
      "Falsificación de solicitudes del lado del servidor",
      "Configuración incorrecta de seguridad",
      "Fallos de integridad de software y datos"
    ],
    correctAnswer: 4,
    explanation: "Eliminar servicios innecesarios es una práctica de hardening que previene configuraciones incorrectas de seguridad al reducir la superficie de ataque."
  },
  {
    id: 19,
    question: "Una organización que opera en la nube detecta un incremento de ataques dirigidos hacia su consola de gestión. ¿Qué medida debería implementar?",
    options: [
      "Realizar pruebas de aplicaciones estáticas (SAST)",
      "Controlar estrictamente el acceso con privilegios a la consola de gestión",
      "Utilizar claves SSH incrustadas para asegurar la consola",
      "Automatizar los scripts de aprovisionamiento"
    ],
    correctAnswer: 1,
    explanation: "El control estricto de acceso con privilegios limitados es fundamental para proteger consolas de gestión críticas contra ataques dirigidos."
  },
  {
    id: 20,
    question: "Según el GDPR, ¿qué derecho permite a los usuarios solicitar la eliminación de sus datos personales?",
    options: [
      "Derecho de supresión",
      "Derecho de corrección",
      "Derecho de acceso/portabilidad",
      "Derecho de oposición"
    ],
    correctAnswer: 0,
    explanation: "El derecho de supresión (también conocido como 'derecho al olvido') permite a los usuarios solicitar la eliminación de sus datos personales."
  },
  {
    id: 21,
    question: "Hablando de las métricas de RPO, RTO, MTD dentro de los requerimientos que debe cubrir el proyecto, ¿de qué tipo de criterios se está hablando?",
    options: [
      "Requerimientos de confidencialidad",
      "Requerimientos de manejo de errores",
      "Requerimientos de integridad",
      "Requerimientos de autenticación",
      "Requerimientos de disponibilidad",
      "Requerimientos de manejo de configuraciones"
    ],
    correctAnswer: 4,
    explanation: "RPO (Recovery Point Objective), RTO (Recovery Time Objective) y MTD (Maximum Tolerable Downtime) son métricas relacionadas con la disponibilidad del sistema y la continuidad del negocio."
  },
  {
    id: 22,
    question: "Un equipo de desarrollo necesita aumentar la velocidad de despliegue y asegurar que el código sea probado automáticamente. ¿Qué práctica DevOps debe implementar?",
    options: [
      "Pruebas manuales",
      "Infraestructura como código (IaC)",
      "Integración continua (CI)",
      "Entrega continua (CD)"
    ],
    correctAnswer: 2,
    explanation: "La Integración Continua (CI) permite que el código sea probado automáticamente cada vez que se realiza un cambio, aumentando la velocidad y calidad del despliegue."
  },
  {
    id: 23,
    question: "La aplicación móvil almacena en caché datos confidenciales sin implementar las medidas de seguridad adecuadas. Si un atacante obtiene acceso a la memoria caché del dispositivo, puede obtener estas credenciales. ¿Qué amenaza se describe?",
    options: [
      "Validación de entrada/salida insuficiente",
      "Uso inadecuado de credenciales",
      "Almacenamiento de datos inseguro",
      "Autenticación/Autorización insegura",
      "Controles de privacidad inadecuados",
      "Comunicación insegura"
    ],
    correctAnswer: 2,
    explanation: "El almacenamiento de datos inseguro ocurre cuando los datos confidenciales se guardan sin protección adecuada en el dispositivo."
  },
  {
    id: 24,
    question: "Esta técnica busca transformar el código fuente original para volver ilegible y difícil de analizar el código, formando parte de los requerimientos antipiratería:",
    options: [
      "Ofuscación",
      "Cifrado asimétrico",
      "Hasheo",
      "Replicación",
      "Copias de seguridad",
      "Cifrado simétrico"
    ],
    correctAnswer: 0,
    explanation: "La ofuscación es una técnica que transforma el código para hacerlo difícil de entender y analizar, protegiendo así la propiedad intelectual."
  },
  {
    id: 25,
    question: "¿Qué es un análisis manual exhaustivo realizado por un individuo distinto al que desarrolló el código para detectar problemas de sintaxis y posibles vulnerabilidades?",
    options: [
      "Pruebas lógicas",
      "Pruebas de rendimiento",
      "Fuzzing",
      "Pruebas de regresión",
      "Pruebas de penetración",
      "Revisión de código"
    ],
    correctAnswer: 5,
    explanation: "La revisión de código es un análisis manual realizado por otro desarrollador para detectar errores, vulnerabilidades y mejorar la calidad del código."
  },
  {
    id: 26,
    question: "¿Qué tipo de requerimientos permite especificar qué información se le devuelve al usuario en caso de haber un error dentro de la aplicación?",
    options: [
      "Requerimientos de confidencialidad",
      "Requerimientos de manejo de configuraciones",
      "Requerimientos de integridad",
      "Requerimientos de manejo de errores",
      "Requerimientos de autenticación",
      "Requerimiento de manejo de errores"
    ],
    correctAnswer: 3,
    explanation: "Los requerimientos de manejo de errores definen cómo la aplicación debe responder ante errores, incluyendo qué información mostrar al usuario."
  },
  {
    id: 27,
    question: "¿Qué ataque puede aprovecharse de mensajes de error mal gestionados?",
    options: [
      "Fallas de manejo de excepciones",
      "Ataques AJAX",
      "Ataques de validación de entrada",
      "Cross-Site scripting"
    ],
    correctAnswer: 0,
    explanation: "Las fallas de manejo de excepciones pueden revelar información sensible del sistema cuando los mensajes de error no están correctamente gestionados."
  },
  {
    id: 28,
    question: "Un equipo está implementando un servicio en la nube y no tiene en cuenta el aislamiento del contenedor. ¿Cuál es el riesgo?",
    options: [
      "El servicio no se podrá ejecutar correctamente",
      "El acceso al servicio será más rápido",
      "Vulnerabilidades que pueden comprometer la infraestructura",
      "La infraestructura de la nube se volverá más accesible"
    ],
    correctAnswer: 2,
    explanation: "La falta de aislamiento de contenedores puede permitir que vulnerabilidades en un contenedor comprometan otros contenedores o la infraestructura subyacente."
  },
  {
    id: 29,
    question: "¿Qué debe hacerse con las cadenas de conexión, contraseñas o claves criptográficas en el código?",
    options: [
      "Nunca usarlas",
      "Usarlas en variables de entorno",
      "Codificarlas en el código",
      "Almacenarlas en texto plano"
    ],
    correctAnswer: 1,
    explanation: "Las credenciales sensibles deben almacenarse en variables de entorno o gestores de secretos, nunca hardcodeadas en el código fuente."
  },
  {
    id: 30,
    question: "Los desarrolladores a menudo confían en los datos recibidos, especialmente cuando trabajan con proveedores de renombre e implementan políticas de seguridad menos estrictos. ¿A qué categoría de amenaza hace referencia?",
    options: [
      "Acceso sin restricciones a flujos comerciales sensibles",
      "Consumo inseguro de API",
      "Autorización de nivel de función rota",
      "Falsificación de solicitudes del lado del servidor",
      "Configuración incorrecta de seguridad",
      "Autorización de nivel de propiedad de objeto roto"
    ],
    correctAnswer: 1,
    explanation: "El consumo inseguro de API ocurre cuando los desarrolladores confían excesivamente en proveedores externos sin aplicar validaciones adecuadas."
  },
  {
    id: 31,
    question: "Un atacante utiliza ingeniería inversa para descubrir una clave API en una aplicación móvil. ¿Qué tipo de vulnerabilidad está explotando?",
    options: [
      "Almacenamiento inseguro de datos",
      "Autenticación insegura",
      "Validación insuficiente",
      "Protección binaria insuficiente"
    ],
    correctAnswer: 3,
    explanation: "La protección binaria insuficiente permite que atacantes usen ingeniería inversa para extraer información sensible del código de la aplicación."
  },
  {
    id: 32,
    question: "¿Cuáles de las siguientes prácticas de codificación son útiles para simplificar el código?",
    options: [
      "El software debe tener funciones con nombres similares pero implementación distinta",
      "Los procesos deben tener varios puntos de entrada y salida",
      "El software debe evitar ambigüedades y suposiciones ocultas, recursividades e instrucciones GoTo",
      "Los programadores deben usar múltiples funciones pequeñas y simples en lugar de una función compleja",
      "El software debe usar acrónimos y abreviaturas para reducir líneas de código",
      "Los programadores deben implementar funciones de alta consecuencia con líneas mínimas"
    ],
    correctAnswer: 3,
    explanation: "Usar múltiples funciones pequeñas y simples mejora la legibilidad, mantenibilidad y reduce la complejidad del código."
  },
  {
    id: 33,
    question: "¿Qué puede causar una brecha de seguridad de datos en una base de datos?",
    options: [
      "Uso excesivo de cifrado",
      "Baja conectividad de red",
      "No aplicar parches de seguridad",
      "Falta de personal en la base de datos"
    ],
    correctAnswer: 2,
    explanation: "No aplicar parches de seguridad deja vulnerabilidades conocidas sin resolver, facilitando brechas de seguridad en bases de datos."
  },
  {
    id: 34,
    question: "Una organización desarrolla un modelo de IA utilizando datos anonimizados en lugar de datos reales para proteger la privacidad de los usuarios. ¿Qué técnica está utilizando?",
    options: [
      "Plataforma de gestión de consentimiento",
      "Uso de datos sintéticos",
      "Derecho de corrección",
      "Entrenamiento adversarial"
    ],
    correctAnswer: 1,
    explanation: "El uso de datos sintéticos permite entrenar modelos de IA sin comprometer la privacidad de los usuarios reales."
  },
  {
    id: 35,
    question: "Un desarrollador web está migrando una aplicación a un entorno móvil, pero el dispositivo tiene baja capacidad de memoria. ¿Qué debería hacer?",
    options: [
      "Aumentar el almacenamiento del dispositivo",
      "Rediseñar para incluir solo funciones esenciales",
      "Usar exclusivamente APIs de escritorio",
      "Reducir el soporte del dispositivo"
    ],
    correctAnswer: 1,
    explanation: "Rediseñar la aplicación para incluir solo funciones esenciales optimiza el uso de memoria y mejora el rendimiento en dispositivos con recursos limitados."
  },
  {
    id: 36,
    question: "¿Cuál es una solución para prevenir ataques SSRF?",
    options: [
      "Hacer uso de bibliotecas de URLs antiguas",
      "Validar y sanear entradas del usuario",
      "Deshabilitar la autenticación de usuario",
      "Implementar una red de contenedores"
    ],
    correctAnswer: 1,
    explanation: "La validación y sanitización de entradas del usuario es fundamental para prevenir ataques SSRF (Server-Side Request Forgery)."
  },
  {
    id: 37,
    question: "¿Qué recomienda OWASP para mitigar riesgos de seguridad y mejorar la comprensión de las decisiones del modelo?",
    options: [
      "Reducir los datos recolectados",
      "Mantener registros cifrados",
      "Proveer explicaciones comprensibles mediante LIME o SHAP",
      "Realizar auditorías periódicas"
    ],
    correctAnswer: 2,
    explanation: "LIME (Local Interpretable Model-agnostic Explanations) y SHAP (SHapley Additive exPlanations) son técnicas que ayudan a explicar las decisiones de modelos de IA."
  },
  {
    id: 38,
    question: "Cuando una aplicación de IA cambia sus políticas de privacidad o introduce nuevas funcionalidades, ¿qué debe hacer la empresa respecto al consentimiento?",
    options: [
      "No es necesario hacer nada si el consentimiento ya ha sido obtenido",
      "La empresa debe notificar a los usuarios y pedirles que revisen y confirmen nuevamente su consentimiento",
      "Solo se debe actualizar el consentimiento si hay un cambio en el algoritmo",
      "El consentimiento no es necesario si las políticas no cambian"
    ],
    correctAnswer: 1,
    explanation: "Cualquier cambio material en políticas de privacidad o funcionalidades requiere notificación y nueva confirmación de consentimiento por parte de los usuarios."
  },
  {
    id: 39,
    question: "¿Qué actividad inicial se realiza en la gestión de configuraciones de software (SCM)?",
    options: [
      "Identificación de artículos de configuración",
      "Análisis de vulnerabilidades",
      "Auditorías técnicas",
      "Registro de solicitudes de cambio"
    ],
    correctAnswer: 0,
    explanation: "La identificación de artículos de configuración es el primer paso en SCM, definiendo qué elementos serán controlados y gestionados."
  },
  {
    id: 40,
    question: "¿Qué medida es un ejemplo de control de seguridad física?",
    options: [
      "Autenticación de dos factores",
      "Software antivirus",
      "Firewalls",
      "Tarjetas de control de acceso"
    ],
    correctAnswer: 3,
    explanation: "Las tarjetas de control de acceso son controles de seguridad física que restringen el acceso a ubicaciones o recursos físicos."
  },
  {
    id: 41,
    question: "Para prevenir configuración incorrecta de seguridad, decide realizar hardening eliminando componentes no necesarios y automatizar verificación de cambios. ¿Esto logrará impedir que se materialice la amenaza?",
    options: [
      "Falso",
      "Verdadero"
    ],
    correctAnswer: 1,
    explanation: "El hardening mediante eliminación de componentes innecesarios y automatización de verificaciones es efectivo para prevenir configuraciones incorrectas de seguridad."
  },
  {
    id: 42,
    question: "Un equipo está configurando su infraestructura en la nube. ¿Qué práctica de seguridad deben implementar?",
    options: [
      "Ignorar las claves API",
      "Dejar las claves de acceso expuestas en el código fuente",
      "Proteger las claves SSH de las API utilizadas en el código",
      "No verificar las claves SSH"
    ],
    correctAnswer: 2,
    explanation: "Proteger las claves SSH y API es fundamental para la seguridad en la nube, evitando accesos no autorizados."
  },
  {
    id: 43,
    question: "En un pipeline de DevSecOps, ¿qué herramientas son utilizadas en la fase de construcción para detectar fallas en el código antes de su implementación?",
    options: [
      "Herramientas de prueba dinámica de aplicaciones (DAST)",
      "Plataformas de análisis de vulnerabilidades",
      "Herramientas de prueba estática de aplicaciones (SAST)",
      "Consolas de administración SaaS"
    ],
    correctAnswer: 2,
    explanation: "SAST (Static Application Security Testing) analiza el código fuente durante la fase de construcción para detectar vulnerabilidades antes de la ejecución."
  },
  {
    id: 44,
    question: "¿Qué tipo de vulnerabilidades permiten al atacante acceder a objetos de datos cuyo acceso debería haberse restringido?",
    options: [
      "Gestión inadecuada del inventario",
      "Acceso sin restricciones a flujos comerciales sensibles",
      "Consumo de recursos sin restricciones",
      "Falsificación de solicitudes del lado del servidor",
      "Autorización de nivel de objeto roto",
      "Configuración incorrecta de seguridad"
    ],
    correctAnswer: 4,
    explanation: "La autorización de nivel de objeto roto permite a atacantes acceder a objetos para los cuales no deberían tener permisos."
  },
  {
    id: 45,
    question: "¿Qué práctica ayuda a garantizar que un modelo de IA sea resistente a manipulaciones externas?",
    options: [
      "Realizar pruebas de caja blanca",
      "Implementar pruebas adversariales",
      "Utilizar OWASP ZAP",
      "Supervisar métricas clave"
    ],
    correctAnswer: 1,
    explanation: "Las pruebas adversariales evalúan la resistencia del modelo ante ataques diseñados específicamente para engañar o manipular sus decisiones."
  },
  {
    id: 46,
    question: "Considerando una aplicación con validación de entrada pobre, ¿qué tipo de amenazas podrían presentarse?",
    options: [
      "Robo de sesión",
      "Inyección SQL",
      "Mensajes de error detallados",
      "Falsificación de solicitudes del lado del servidor",
      "XSS",
      "Fuerza Bruta"
    ],
    correctAnswer: 1,
    explanation: "La validación de entrada pobre es la principal causa de ataques de inyección SQL, donde código malicioso se ejecuta en la base de datos."
  },
  {
    id: 47,
    question: "Para prevenir cierto tipo de vulnerabilidad, decide implementar el número máximo de intentos de autenticación permitido y desactivar la cuenta tras superarlo. ¿Qué tipo de amenaza logrará impedir?",
    options: [
      "Falsificación de solicitudes del lado del servidor",
      "Fallos de integridad de software y datos",
      "Inyección",
      "Configuración incorrecta de seguridad",
      "Errores de identificación y autenticación",
      "Fallos de integridad de software y datos"
    ],
    correctAnswer: 4,
    explanation: "Limitar intentos de autenticación y bloquear cuentas previene ataques de fuerza bruta y otros errores de identificación y autenticación."
  },
  {
    id: 48,
    question: "Un usuario es incapaz de desactivar permisos innecesarios en una aplicación móvil. ¿Qué vulnerabilidad se está explotando?",
    options: [
      "Autenticación Insegura",
      "Protección binaria insuficiente",
      "Configuración incorrecta de seguridad",
      "Criptografía insuficiente"
    ],
    correctAnswer: 2,
    explanation: "La configuración incorrecta de seguridad incluye no permitir a los usuarios controlar los permisos de la aplicación según sus necesidades."
  },
  {
    id: 49,
    question: "¿Qué tipo de vulnerabilidad permite que el atacante pueda acceder, modificar, agregar y eliminar valores de propiedad a los objetos?",
    options: [
      "Falsificación de solicitudes del lado del servidor",
      "Autorización de nivel de propiedad de objeto roto",
      "Consumo de recursos sin restricciones",
      "Gestión inadecuada del inventario",
      "Acceso sin restricciones a flujos comerciales sensibles",
      "Configuración incorrecta de seguridad"
    ],
    correctAnswer: 1,
    explanation: "La autorización de nivel de propiedad de objeto roto permite a atacantes manipular propiedades específicas de objetos sin autorización adecuada."
  },
  {
    id: 50,
    question: "Un equipo realiza cambios frecuentes en los contenedores sin monitoreo. ¿Qué problema podría surgir?",
    options: [
      "Los contenedores se implementarán más rápido",
      "La introducción de vulnerabilidades no identificadas",
      "No será necesario hacer más pruebas",
      "Los cambios serán más fáciles de revertir"
    ],
    correctAnswer: 1,
    explanation: "Realizar cambios sin monitoreo puede introducir vulnerabilidades no identificadas, comprometiendo la seguridad del sistema."
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