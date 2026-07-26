/**
 * Índice de presentaciones de Técnicas de Programación.
 * Para agregar una semana: crea `presentaciones/<slug>/index.html`
 * (puedes copiar la de calidad-de-software/presentaciones/fundamentos-de-calidad
 * como plantilla), añade el PDF en `pdfs/<slug>.pdf` y agrega una entrada aquí
 * con `available: true`. Ejemplo:
 *
 * { week: 1, slug: "introduccion", title: "Introducción",
 *   subtitle: "Presentación del curso", available: true },
 */
const TOPICS = [
  {
    week: 0,
    slug: "presentacion-del-curso",
    title: "Presentación del curso",
    subtitle: "Unidades, laboratorios y esquema de evaluación",
    available: true,
  },
  {
    week: 1,
    slug: "introduccion-a-la-programacion",
    title: "Introducción a la Programación",
    subtitle: "Lenguaje Java, notación camel, JDK/JRE y primer programa",
    available: true,
  },
  {
    week: 1,
    slug: "topicos-generales-ingenieria-software",
    title: "Tópicos Generales de Ingeniería de Software",
    subtitle: "Sintaxis, semántica, pragmática y panorama de la industria",
    available: true,
  },
  {
    week: 1,
    slug: "operadores-aritmeticos-y-ciclos",
    title: "Operadores Aritméticos y Ciclos",
    subtitle: "Operadores lógicos, acumuladores, ciclos y casting en Java",
    available: true,
  },
];
