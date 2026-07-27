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
  { week: 6, slug: "semana-6", title: "Semana 6", subtitle: "Próximamente", available: false },
  { week: 7, slug: "semana-7", title: "Semana 7", subtitle: "Próximamente", available: false },
  { week: 8, slug: "semana-8", title: "Semana 8", subtitle: "Pirámide de pruebas", available: false },
  { week: 9, slug: "semana-9", title: "Semana 9", subtitle: "Próximamente", available: false },
  { week: 10, slug: "semana-10", title: "Semana 10", subtitle: "Próximamente", available: false },
  { week: 11, slug: "semana-11", title: "Semana 11", subtitle: "Cobertura de pruebas", available: false },
];
