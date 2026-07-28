/**
 * Índice de presentaciones del curso.
 * Para agregar una semana nueva: crea `presentaciones/<slug>/index.html`
 * (puedes copiar la de fundamentos-de-calidad como plantilla), añade el PDF
 * correspondiente en `pdfs/<slug>.pdf` y agrega una entrada aquí con
 * `available: true`.
 */
const TOPICS = [
  {
    week: 0,
    slug: "presentacion-del-curso",
    title: "Presentación del curso",
    subtitle: "Evaluación, calendario y políticas del semestre",
    available: true,
  },
  {
    week: 1,
    slug: "fundamentos-de-calidad",
    title: "Fundamentos de Calidad",
    subtitle: "Qué es calidad y qué es un defecto",
    available: true,
  },
  {
    week: 2,
    slug: "verificacion-validacion-y-aseguramiento",
    title: "Verificación, Validación y Aseguramiento",
    subtitle: "Proceso de QA, el modelo en V y roles del equipo",
    available: true,
  },
  {
    week: 3,
    slug: "historias-de-usuario-y-criterios-de-aceptacion",
    title: "Historias de Usuario y SQAP",
    subtitle: "Criterios de aceptación en Gherkin y el plan de aseguramiento",
    available: true,
  },
  {
    week: 4,
    slug: "referentes-de-calidad-y-auditorias",
    title: "Referentes de Calidad y Auditorías",
    subtitle: "ISO 9000, SQuaRE, CMMI, IEEE-730 y cómo se revisa el trabajo",
    available: true,
  },
  {
    week: 5,
    slug: "deuda-tecnica-y-herramientas-de-calidad",
    title: "Deuda Técnica y Herramientas de Calidad",
    subtitle: "Code smells, refactorización, análisis estático y SonarCloud",
    available: true,
  },
  {
    week: 6,
    slug: "plan-de-pruebas",
    title: "Plan de Pruebas",
    subtitle: "Alcance, estrategia, criterios de entrada/salida, riesgos y recursos",
    available: true,
  },
  {
    week: 7,
    slug: "tipos-de-pruebas",
    title: "Tipos de Pruebas",
    subtitle: "Funcional, regresión, humo, rendimiento, seguridad, usabilidad y accesibilidad",
    available: true,
  },
  {
    week: 8,
    slug: "tecnicas-de-prueba-y-cobertura",
    title: "Técnicas de Prueba y Cobertura",
    subtitle: "Caja negra, caja blanca, niveles y la pirámide de Cohn",
    available: true,
  },
  {
    week: 9,
    slug: "ciclo-de-vida-del-defecto",
    title: "Ciclo de Vida del Defecto",
    subtitle: "Proceso de pruebas, severidad vs. prioridad y reporte de defectos",
    available: true,
  },
  {
    week: 10,
    slug: "pruebas-unitarias-y-test-doubles",
    title: "Pruebas Unitarias y Test Doubles",
    subtitle: "Arrange-Act-Assert, JUnit, pytest, stubs, mocks y fakes",
    available: true,
  },
  {
    week: 11,
    slug: "metricas-de-calidad-de-software",
    title: "Métricas de Calidad de Software",
    subtitle: "Densidad de defectos, DRE, cobertura y complejidad ciclomática",
    available: true,
  },
];
