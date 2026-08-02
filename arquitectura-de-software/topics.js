/**
 * Índice de presentaciones de Arquitectura de Software.
 * Para agregar una semana: crea `presentaciones/<slug>/index.html`
 * (puedes copiar la de calidad-de-software/presentaciones/fundamentos-de-calidad
 * como plantilla), añade el PDF en `pdfs/<slug>.pdf` y agrega una entrada aquí
 * con `available: true`. Ejemplo:
 *
 * { week: 1, slug: "introduccion-arquitectura", title: "Introducción a la arquitectura",
 *   subtitle: "Qué es y por qué importa", available: true },
 */
const TOPICS = [
  {
    week: 0,
    slug: "presentacion-del-curso",
    title: "Presentación del curso",
    subtitle: "Dinámica semanal, evaluación, unidades y calendario del semestre",
    available: true,
  },
  {
    week: 1,
    slug: "introduccion-backend-frontend-fullstack",
    title: "Introducción a Backend, Frontend y Fullstack",
    subtitle: "Dónde vive el código, con el caso real de HealthCare.gov",
    available: true,
  },
  {
    week: 1,
    slug: "definiciones-arquitectura-software",
    title: "Definiciones de Arquitectura de Software",
    subtitle: "Qué es y qué no es arquitectura, con el caso del monolito de Twitter",
    available: true,
  },
  {
    week: 2,
    slug: "historia-arquitectura-software",
    title: "Historia de la Arquitectura de Software",
    subtitle: "Del IBM System/360 a la nube: cinco eras de la computación",
    available: true,
  },
  {
    week: 2,
    slug: "evolucion-arquitectura-software",
    title: "Evolución de la Arquitectura de Software",
    subtitle: "Tecnologías y frameworks, con el caso real de Ruby on Rails",
    available: true,
  },
  {
    week: 3,
    slug: "diseno-vs-arquitectura",
    title: "Diseño vs Arquitectura",
    subtitle: "Costo de revertir una decisión, con el caso del Aeropuerto de Denver",
    available: true,
  },
  {
    week: 3,
    slug: "uml-vistas-arquitectonicas",
    title: "Integración de UML para Vistas Arquitectónicas",
    subtitle: "El modelo 4+1 de Kruchten y los diagramas del Sprint 1",
    available: true,
  },
  {
    week: 4,
    slug: "rol-arquitecto-software",
    title: "El Rol del Arquitecto de Software",
    subtitle: "Roles, tipos y cualidades, con el caso real de Netflix",
    available: true,
  },
  {
    week: 4,
    slug: "requisitos-no-funcionales-iso25010",
    title: "Requisitos No Funcionales — ISO 25010",
    subtitle: "Por qué son decisiones arquitectónicas, con el caso de Pokémon GO",
    available: true,
  },
  {
    week: 5,
    slug: "conectores-protocolos-garlan-shaw",
    title: "Conectores y Protocolos de Garlan y Shaw",
    subtitle: "Taxonomía de conectores, con el caso real del vuelo 501 de Ariane 5",
    available: true,
  },
  {
    week: 5,
    slug: "stack-tecnologico",
    title: "Stack Tecnológico",
    subtitle: "LAMP, MEAN, MERN y el caso real de Instagram — cierre de la Unidad 1",
    available: true,
  },
];
