/**
 * Índice de presentaciones de Análisis y Diseño 2.
 * Para agregar una semana: crea `presentaciones/<slug>/index.html`
 * (puedes copiar la de calidad-de-software/presentaciones/fundamentos-de-calidad
 * como plantilla), añade el PDF en `pdfs/<slug>.pdf` y agrega una entrada aquí
 * con `available: true`. Ejemplo:
 *
 * { week: 1, slug: "introduccion-diseno", title: "Introducción al diseño",
 *   subtitle: "Del análisis al diseño", available: true },
 */
const TOPICS = [
  {
    week: 1,
    slug: "presentacion-del-curso-y-diagnostico",
    title: "Presentación del Curso y Evaluación Diagnóstica",
    subtitle: "Cómo funciona el curso, evaluación, unidades y evaluación diagnóstica",
    available: true,
  },
  {
    week: 1,
    slug: "fundamentos-de-scrum",
    title: "Fundamentos de Scrum",
    subtitle: "Valores ágiles, roles, eventos y artefactos del marco de trabajo Scrum",
    available: true,
  },
  {
    week: 1,
    slug: "historias-de-usuario-tablero-y-backlog",
    title: "Historias de Usuario, Tablero y Backlog",
    subtitle: "Historia de usuario, criterios INVEST, tablero, límites WIP y estimación con story points",
    available: true,
  },
  {
    week: 2,
    slug: "definicion-del-proyecto-de-curso",
    title: "Identificación y Definición del Proyecto",
    subtitle: "Enunciado del problema, interesados, alcance, elevator pitch y roles del equipo",
    available: true,
  },
  {
    week: 2,
    slug: "laboratorio-sprint-0-y-backlog-inicial",
    title: "Laboratorio: Sprint 0 y Backlog Inicial",
    subtitle: "Definición de Terminado y demostración en vivo del montaje del backlog inicial",
    available: true,
  },
  {
    week: 3,
    slug: "modelado-conceptual-y-sus-beneficios",
    title: "Modelado Conceptual: Beneficios en el Desarrollo de Software",
    subtitle: "Qué es un modelo conceptual, sus beneficios y el caso del FBI Virtual Case File",
    available: true,
  },
  {
    week: 3,
    slug: "elaboracion-del-modelo-de-dominio",
    title: "Elaboración del Modelo de Dominio",
    subtitle: "Clases conceptuales, atributos y asociaciones, aplicados al proyecto del curso",
    available: true,
  },
  {
    week: 3,
    slug: "refinamiento-del-modelo-de-dominio",
    title: "Refinamiento del Modelo de Dominio",
    subtitle: "Errores comunes, generalización, paquetes y clases de asociación",
    available: true,
  },
  {
    week: 4,
    slug: "diagrama-de-clases-de-dominio",
    title: "Modelado en UML: Diagrama de Clases de Dominio",
    subtitle: "Notación formal: asociación, agregación, composición, generalización y paquetes",
    available: true,
  },
  {
    week: 4,
    slug: "diagramas-de-secuencia-del-sistema",
    title: "Interfaz Externa del Sistema: Diagramas de Secuencia del Sistema (DSS)",
    subtitle: "El sistema como caja negra, eventos de sistema y su relación con los casos de uso",
    available: true,
  },
  {
    week: 4,
    slug: "laboratorio-de-modelado-de-analisis",
    title: "Laboratorio de Modelado de Análisis",
    subtitle: "Cierre de la Unidad 2: consolidación del modelo de dominio, clases y DSS del proyecto",
    available: true,
  },
];
