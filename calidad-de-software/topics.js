/**
 * Índice de presentaciones del curso.
 * Para agregar una semana nueva: crea `presentaciones/<slug>/index.html`
 * (puedes copiar la de fundamentos-de-calidad como plantilla), añade el PDF
 * correspondiente en `pdfs/<slug>.pdf` y agrega una entrada aquí con
 * `available: true`.
 */
const TOPICS = [
  {
    week: 1,
    slug: "fundamentos-de-calidad",
    title: "Fundamentos de Calidad",
    subtitle: "Qué es calidad y qué es un defecto",
    available: true,
  },
  { week: 2, slug: "semana-2", title: "Semana 2", subtitle: "Verificación y validación", available: false },
  { week: 3, slug: "semana-3", title: "Semana 3", subtitle: "Próximamente", available: false },
  { week: 4, slug: "semana-4", title: "Semana 4", subtitle: "ISO/IEC 25010", available: false },
  { week: 5, slug: "semana-5", title: "Semana 5", subtitle: "Próximamente", available: false },
  { week: 6, slug: "semana-6", title: "Semana 6", subtitle: "Próximamente", available: false },
  { week: 7, slug: "semana-7", title: "Semana 7", subtitle: "Próximamente", available: false },
  { week: 8, slug: "semana-8", title: "Semana 8", subtitle: "Pirámide de pruebas", available: false },
  { week: 9, slug: "semana-9", title: "Semana 9", subtitle: "Próximamente", available: false },
  { week: 10, slug: "semana-10", title: "Semana 10", subtitle: "Próximamente", available: false },
  { week: 11, slug: "semana-11", title: "Semana 11", subtitle: "Cobertura de pruebas", available: false },
];
