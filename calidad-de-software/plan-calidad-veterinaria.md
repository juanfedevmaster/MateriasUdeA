# Plan de Calidad del Software — Sistema de Gestión Veterinaria VetCare

| Campo | Detalle |
|---|---|
| **Módulo** | CodeFactory_2025-2 — Fábrica-Escuela |
| **Producto** | Plan de Calidad del Software — VetCare |
| **Elaborado por** | Equipo Módulo Veterinaria |
| **Versión** | 1.0 |
| **Fecha** | 2025-09-23 |

---

## 1. Objetivos de Calidad

Los objetivos de calidad del sistema VetCare están alineados con las necesidades del cliente (clínica veterinaria) y los requisitos del negocio de gestión de pacientes animales, citas y registros médicos.

| # | Objetivo | Métrica de éxito |
|---|---|---|
| OC-01 | Garantizar que el registro de mascotas y propietarios sea completo y libre de duplicados | 0 registros duplicados en producción al final del sprint |
| OC-02 | Asegurar que el agendamiento de citas no genere conflictos de horario | Cobertura de pruebas de la lógica de agenda ≥ 80 % |
| OC-03 | Proteger la confidencialidad del historial médico de cada mascota | Acceso al historial solo con rol Veterinario o Administrador |
| OC-04 | Mantener la disponibilidad del sistema durante el horario de atención (7 a.m. – 8 p.m.) | Tiempo de inactividad no planificado < 30 min/mes |
| OC-05 | Entregar funcionalidad verificada mediante pruebas automatizadas antes de cada merge a rama principal | Quality Gate de SonarCloud en verde antes de fusionar |

---

## 2. Estándares y Procesos de Calidad

### Estándares aplicados al proyecto

| Estándar | Aplicación en VetCare |
|---|---|
| **IEEE 730 (SQAP)** | Base estructural de este documento de plan de calidad |
| **ISO/IEC 25010 (SQuaRE)** | Referencia para definir características de calidad del producto: funcionalidad, fiabilidad, usabilidad, seguridad y mantenibilidad |
| **ISO 9001** | Marco de mejora continua: ciclo Planificar-Hacer-Verificar-Actuar aplicado a cada sprint |
| **Gherkin / BDD** | Formato estándar para escribir criterios de aceptación de las historias de usuario |
| **Conventional Commits** | Estándar de mensajes de commit: `feat`, `fix`, `test`, `chore`, `docs` |

### Procesos de calidad adoptados

- **Revisión de código (Pull Request):** todo código pasa por revisión de al menos un compañero antes de fusionarse.
- **Análisis estático automático:** SonarCloud analiza cada PR. No se permite fusionar si el Quality Gate falla.
- **Definición de Listo (DoD):** una historia se considera terminada cuando tiene pruebas unitarias, pasa el Quality Gate y fue aprobada en revisión de pares.
- **Retrospectiva de sprint:** al cierre de cada iteración se identifican mejoras al proceso.

---

## 3. Roles y Responsabilidades

| Rol | Integrante(s) | Responsabilidades de calidad |
|---|---|---|
| **QA Lead** | Ana Gómez | Mantener este documento; coordinar ejecución de pruebas; reportar hallazgos al equipo |
| **Desarrollador** | Carlos Pérez, Laura Torres | Escribir pruebas unitarias; corregir hallazgos del análisis estático; cumplir DoD antes de abrir PR |
| **Product Owner** | Sofía Ramírez | Validar criterios de aceptación; aprobar historias de usuario refinadas |
| **Scrum Master** | Diego Herrera | Facilitar retrospectivas; asegurar que el proceso de calidad se respeta en cada sprint |
| **Docente / Auditor** | Robinson Coronado G | Revisar y aprobar el plan de calidad; realizar walkthroughs de artefactos |

---

## 4. Criterios de Aceptación

Los criterios de aceptación se expresan en formato Gherkin (Dado-Cuando-Entonces) y se definen por historia de usuario. A continuación se presentan los criterios de las historias principales.

### HU-01: Registrar mascota

```gherkin
Escenario: Registro exitoso de una mascota nueva
  Dado que el usuario tiene rol Recepcionista o Veterinario
  Y el propietario ya está registrado en el sistema
  Cuando ingresa los datos obligatorios de la mascota (nombre, especie, raza, fecha de nacimiento, propietario)
  Entonces el sistema guarda la mascota y muestra confirmación
  Y la mascota queda disponible en la búsqueda por nombre o propietario

Escenario: Intento de registro con datos incompletos
  Dado que el usuario intenta registrar una mascota
  Cuando omite un campo obligatorio
  Entonces el sistema muestra un mensaje de error indicando el campo faltante
  Y no guarda el registro
```

### HU-02: Agendar cita

```gherkin
Escenario: Agendamiento exitoso sin conflicto de horario
  Dado que existe una mascota registrada
  Y el veterinario seleccionado tiene disponibilidad en la fecha y hora elegida
  Cuando el recepcionista agenda la cita
  Entonces el sistema registra la cita y notifica al propietario por correo

Escenario: Intento de agendar en horario ocupado
  Dado que el veterinario ya tiene una cita en la fecha y hora seleccionada
  Cuando el recepcionista intenta agendar en ese mismo horario
  Entonces el sistema muestra un aviso de conflicto
  Y propone los siguientes horarios disponibles del mismo día
```

### HU-03: Consultar historial médico

```gherkin
Escenario: Veterinario consulta historial de su paciente
  Dado que el usuario tiene rol Veterinario
  Cuando busca la mascota por nombre o número de ficha
  Entonces el sistema muestra el historial completo: vacunas, consultas, diagnósticos y tratamientos

Escenario: Recepcionista intenta ver historial médico
  Dado que el usuario tiene rol Recepcionista
  Cuando intenta acceder al historial médico de una mascota
  Entonces el sistema deniega el acceso y muestra el mensaje "No tiene permisos para ver esta información"
```

---

## 5. Procesos de Revisión y Validación

### Plan de Verificación y Validación (V&V)

| Fase | Tipo de revisión | Quién | Artefacto revisado | Criterio de salida |
|---|---|---|---|---|
| Requisitos | Walkthrough | Todo el equipo + docente | Historias de usuario e historias refinadas | Historias cumplen INVEST; criterios en Gherkin aprobados |
| Diseño | Revisión de pares | Desarrolladores | Diagrama de clases, modelo de datos | Sin dependencias circulares; nomenclatura consistente |
| Código | Pull Request + análisis estático | Par asignado + SonarCloud | Rama de feature | PR aprobado; Quality Gate verde |
| Sistema | Pruebas funcionales manuales | QA Lead | Aplicación desplegada en ambiente de pruebas | Todos los escenarios Gherkin pasan |
| Aceptación | Validación con Product Owner | Product Owner | Demo de la historia | PO aprueba la historia como "Lista" |

### Proceso de walkthrough del plan de calidad

1. El QA Lead distribuye este documento con 48 horas de anticipación.
2. Cada integrante anota observaciones de forma individual.
3. En sesión grupal (máx. 60 min) se consolidan hallazgos.
4. Los hallazgos se registran en el formato de la Sección 7 *(pendiente semana 9)*.
5. Se genera acta con compromisos y fechas de corrección.

---

## 6. Prueba

### Alcance de las pruebas

**Dentro del alcance:**
- Módulo de registro de mascotas y propietarios
- Módulo de agendamiento de citas
- Control de acceso por rol (Veterinario, Recepcionista, Administrador)
- Consulta y registro de historial médico

**Fuera del alcance (v1.0):**
- Módulo de facturación y pagos
- Integración con laboratorio externo
- Aplicación móvil

### Tipos de prueba aplicados

| Tipo | Herramienta | Cuándo se ejecuta |
|---|---|---|
| Unitaria | JUnit 5 + Mockito | En cada commit; integrada al pipeline CI |
| De humo | Script manual / Postman | Al desplegar en ambiente de pruebas |
| Funcional (caja negra) | Manual guiado por escenarios Gherkin | Al cerrar cada historia |
| Análisis estático | SonarCloud | En cada Pull Request |

### Estrategia de pruebas

Se sigue la **pirámide de Cohn**: base amplia de pruebas unitarias sobre reglas de negocio (validación de citas, lógica de roles), menos pruebas de integración sobre la capa de persistencia, y pruebas funcionales manuales sobre los flujos críticos del usuario final.

**Criterios de entrada:** historia de usuario con criterios de aceptación aprobados y código en rama de feature.

**Criterios de salida:** cobertura de líneas ≥ 70 %; Quality Gate de SonarCloud verde; todos los escenarios Gherkin del sprint ejecutados sin falla abierta de severidad Alta o Crítica.

**Criterios de suspensión:** si el ambiente de pruebas está caído o si hay un defecto Crítico bloqueante, se suspenden las pruebas hasta resolución.

### Diseño de casos de prueba — HU-02 (partición de equivalencia y valores límite)

| ID | Técnica | Entrada | Resultado esperado |
|---|---|---|---|
| TC-01 | Partición válida | Fecha futura, veterinario disponible | Cita registrada |
| TC-02 | Partición inválida | Fecha pasada | Error: "La fecha debe ser futura" |
| TC-03 | Valor límite | Fecha = hoy a la hora actual | Error: "Debe reservar con al menos 1 hora de anticipación" |
| TC-04 | Partición inválida | Horario ya ocupado por otra cita | Aviso de conflicto + sugerencia de horario |
| TC-05 | Partición inválida | Veterinario inexistente en BD | Error: "Veterinario no encontrado" |

---

## 8. Procesos de Gestión de Cambios

Cualquier cambio al alcance, requisitos o artefactos del proyecto sigue este proceso:

1. **Solicitud:** cualquier integrante registra la solicitud de cambio en el backlog de Jira con etiqueta `cambio`.
2. **Evaluación de impacto:** el QA Lead y el PO evalúan el impacto en calidad, tiempo y alcance (máx. 24 h).
3. **Aprobación:** cambios menores (sin impacto en alcance ni en historias ya probadas) los aprueba el Scrum Master. Cambios mayores requieren aprobación del docente.
4. **Implementación:** el cambio se implementa en rama separada siguiendo el flujo de Pull Request.
5. **Verificación:** el QA Lead confirma que el cambio no introduce regresiones antes de fusionar.
6. **Actualización documental:** se actualiza este plan de calidad y el backlog en la misma iteración.

| Categoría | Criterio | Aprobador |
|---|---|---|
| Cambio menor | No afecta historias ya aceptadas ni el alcance definido | Scrum Master |
| Cambio mayor | Modifica alcance, agrega o elimina historias, cambia arquitectura | Scrum Master + Docente |

---

## 9. Métricas y Herramientas de Seguimiento, Técnicas y Metodologías

### Métricas de calidad de código (SonarCloud)

| Métrica | Umbral aceptable | Acción si se supera |
|---|---|---|
| Cobertura de pruebas unitarias | ≥ 70 % | Escribir pruebas faltantes antes del siguiente sprint |
| Code smells | 0 de severidad Crítica o Alta | Refactorizar antes de fusionar |
| Duplicación de código | < 3 % | Extraer a método o clase compartida |
| Deuda técnica acumulada | < 1 día por sprint | Incluir tarea de remediación en el backlog |
| Bugs detectados | 0 de severidad Crítica | Corrección inmediata; bloquea el merge |

### Métricas de proceso

| Métrica | Descripción | Frecuencia |
|---|---|---|
| Velocidad del equipo | Story points completados por sprint | Por sprint |
| Tasa de defectos escapados | Defectos encontrados en validación PO / total de historias entregadas | Por sprint |
| Tiempo medio de resolución | Tiempo desde apertura hasta cierre de un hallazgo | Por sprint |

### Herramientas

| Herramienta | Propósito |
|---|---|
| **SonarCloud** | Análisis estático de código |
| **GitHub Actions** | Pipeline de integración continua |
| **JUnit 5 + Mockito** | Pruebas unitarias y test doubles |
| **Postman** | Pruebas de API y pruebas de humo |
| **Jira** | Gestión del backlog y seguimiento de defectos |

### Metodología

El proyecto sigue **Scrum** con sprints de dos semanas. Las prácticas de calidad se integran al flujo de trabajo mediante la Definición de Listo y el pipeline de CI/CD.

---

## 10. Planes de Formación y Capacitación

| Necesidad | Integrante(s) | Actividad | Fecha límite |
|---|---|---|---|
| Uso de SonarCloud y análisis de métricas | Carlos Pérez | Tutorial oficial SonarCloud + revisión con QA Lead | Sprint 1 |
| Escritura de criterios en Gherkin | Todo el equipo | Taller interno (30 min) liderado por QA Lead | Sprint 1 |
| JUnit 5 y Mockito para test doubles | Laura Torres, Carlos Pérez | Práctica sobre kata de lógica de citas | Sprint 2 |
| Revisión de Pull Requests efectiva | Todo el equipo | Lectura de guía interna de revisión + una ronda de práctica | Sprint 1 |

---

## 11. Planes de Auditoría y Revisión

| Actividad | Tipo | Frecuencia | Responsable | Artefactos revisados |
|---|---|---|---|---|
| Walkthrough de historias de usuario | Walkthrough (IEEE 1028) | Inicio de cada sprint | QA Lead | Historias refinadas, criterios de aceptación |
| Revisión del plan de calidad | Inspección ligera | Cada dos sprints | Docente + QA Lead | Este documento |
| Auditoría de métricas SonarCloud | Revisión técnica | Semanal | QA Lead | Dashboard de SonarCloud |
| Revisión de resultados de pruebas | Revisión de pares | Al cierre de cada sprint | Todo el equipo | Casos de prueba ejecutados, hallazgos |

**Criterios de un hallazgo en auditoría:**

| Severidad | Descripción | Plazo de corrección |
|---|---|---|
| Alta | Incumplimiento de un criterio de aceptación o del Quality Gate | Antes del siguiente merge |
| Media | Desviación del proceso definido (ej. merge sin PR aprobado) | Dentro del sprint en curso |
| Baja | Mejora sugerida sin impacto en funcionalidad | Próximo sprint |

---

## 12. Calendario y Asignación de Recursos

### Calendario de actividades de calidad

| Semana | Actividad | Responsable |
|---|---|---|
| 1 (sprint 1 inicio) | Walkthrough de historias del sprint; configurar SonarCloud | QA Lead + equipo |
| 2 (sprint 1 cierre) | Ejecución de pruebas funcionales; revisión de métricas; retrospectiva | QA Lead + PO |
| 3 (sprint 2 inicio) | Walkthrough de historias del sprint; revisión del plan de calidad | QA Lead + docente |
| 4 (sprint 2 cierre) | Pruebas de regresión; auditoría de métricas; retrospectiva | QA Lead + equipo |
| 5 (sprint 3 inicio) | Walkthrough de historias; actualización de riesgos | QA Lead + SM |
| 6 (sprint 3 cierre) | Pruebas de sistema completo; entrega de artefactos de calidad | Todo el equipo |

### Asignación de recursos

| Recurso | Cantidad | Dedicación semanal estimada |
|---|---|---|
| QA Lead (Ana Gómez) | 1 persona | 5 h/semana en actividades de calidad |
| Desarrolladores (Carlos, Laura) | 2 personas | 2 h/semana en pruebas unitarias y revisión de PR |
| Product Owner (Sofía) | 1 persona | 1 h/semana en validación de historias |
| SonarCloud (plan gratuito) | 1 organización | Sin costo — plan Community |
| GitHub Actions | Repositorio del proyecto | Sin costo — plan Free |

---

## 13. Gestión de Riesgos

| ID | Riesgo | Disparador | Probabilidad | Impacto | Responsable | Estrategia de mitigación | Contingencia |
|---|---|---|---|---|---|---|---|
| R-01 | Conflictos de horario no detectados en la lógica de citas | Prueba de carga o caso límite no cubierto | Alta | Alta | Carlos Pérez | Diseñar casos de prueba con partición de equivalencia y valores límite desde el sprint 1 | Hotfix prioritario; suspender agendamiento hasta corrección |
| R-02 | Acceso no autorizado al historial médico | Error en la lógica de control de roles | Media | Alta | Laura Torres | Prueba de seguridad por rol en cada historia que involucre historial | Revocar accesos; notificar al administrador; corregir en menos de 4 h |
| R-03 | Baja cobertura de pruebas al cierre del sprint | Presión de tiempo; historias subestimadas | Media | Media | QA Lead | Incluir tiempo de pruebas en la estimación de cada historia; monitorear cobertura en SonarCloud semanalmente | Agregar deuda técnica al backlog; no cerrar la historia hasta alcanzar umbral |
| R-04 | Pérdida de datos de pacientes por error en migración de base de datos | Script de migración sin respaldo previo | Baja | Crítica | Scrum Master | Exigir backup antes de cada migración; revisar scripts en PR | Restaurar desde último backup; comunicar tiempo de inactividad al cliente |
| R-05 | Ambiente de pruebas no disponible | Caída del servidor o conflicto de configuración | Media | Media | Todo el equipo | Mantener ambiente local funcional como respaldo | Ejecutar pruebas en local; documentar el incidente; recuperar ambiente en 24 h |

---

## 14. Glosario de Términos del Negocio

| Término | Definición |
|---|---|
| **Mascota / Paciente** | Animal registrado en la clínica que recibe atención veterinaria |
| **Propietario / Cliente** | Persona natural responsable de una o más mascotas registradas |
| **Ficha clínica** | Registro digital que agrupa toda la historia médica de una mascota: consultas, diagnósticos, vacunas y tratamientos |
| **Cita** | Reserva de un espacio de tiempo con un veterinario específico para atender a una mascota |
| **Veterinario** | Profesional habilitado para realizar diagnósticos, prescribir tratamientos y registrar entradas en la ficha clínica |
| **Recepcionista** | Usuario del sistema encargado de registrar mascotas, propietarios y agendar citas; no tiene acceso al historial médico |
| **Administrador** | Usuario con acceso completo al sistema, incluida la gestión de usuarios y configuración general |
| **Vacuna** | Procedimiento preventivo registrado en la ficha clínica con fecha, tipo de vacuna y próxima dosis recomendada |
| **Tratamiento** | Plan de medicamentos o procedimientos indicados por el veterinario tras un diagnóstico |
| **Diagnóstico** | Conclusión médica registrada por el veterinario al finalizar una consulta |
| **Conflicto de horario** | Situación en la que se intenta agendar una cita en un espacio ya ocupado por otra cita para el mismo veterinario |
| **Quality Gate** | Conjunto de reglas mínimas de calidad de código que deben cumplirse en SonarCloud para permitir un merge a la rama principal |
| **Rol** | Perfil de usuario que determina los permisos de acceso dentro del sistema (Administrador, Veterinario, Recepcionista) |

---

## 14. Historias de Usuario Refinadas y Criterios de Aceptación

### HU-01: Registrar mascota

**Como** recepcionista  
**Quiero** registrar una nueva mascota con sus datos básicos y vincularla a un propietario existente  
**Para** tener un perfil de paciente disponible para agendar citas y registrar historial médico

**Criterios INVEST:** Independiente ✓ | Negociable ✓ | Valiosa ✓ | Estimable ✓ | Small ✓ | Testeable ✓

**Criterios de aceptación:**
```gherkin
Escenario: Registro exitoso
  Dado que el propietario ya está registrado
  Cuando el recepcionista ingresa nombre, especie, raza, fecha de nacimiento y propietario
  Entonces el sistema guarda la mascota y la muestra en la búsqueda

Escenario: Campo obligatorio vacío
  Cuando se omite cualquier campo obligatorio
  Entonces el sistema indica el campo faltante y no guarda el registro
```

---

### HU-02: Agendar cita

**Como** recepcionista  
**Quiero** reservar una cita para una mascota con un veterinario disponible  
**Para** garantizar atención oportuna sin conflictos de horario

**Criterios de aceptación:**
```gherkin
Escenario: Agendamiento exitoso
  Dado que la mascota está registrada y el veterinario tiene disponibilidad
  Cuando el recepcionista selecciona fecha, hora y veterinario
  Entonces el sistema confirma la cita y notifica al propietario por correo

Escenario: Conflicto de horario
  Dado que el veterinario tiene otra cita en ese horario
  Cuando el recepcionista intenta agendar
  Entonces el sistema muestra aviso y propone horarios disponibles

Escenario: Fecha pasada
  Cuando se selecciona una fecha anterior a hoy
  Entonces el sistema rechaza la acción con el mensaje "La fecha debe ser futura"
```

---

### HU-03: Consultar historial médico

**Como** veterinario  
**Quiero** ver el historial completo de una mascota antes de atenderla  
**Para** tomar decisiones clínicas informadas sin repetir exámenes ya realizados

**Criterios de aceptación:**
```gherkin
Escenario: Veterinario consulta historial
  Dado que el usuario tiene rol Veterinario
  Cuando busca una mascota por nombre o número de ficha
  Entonces el sistema muestra vacunas, consultas anteriores, diagnósticos y tratamientos

Escenario: Recepcionista intenta acceder al historial
  Dado que el usuario tiene rol Recepcionista
  Cuando intenta abrir el historial médico
  Entonces el sistema deniega el acceso con el mensaje "No tiene permisos para ver esta información"
```

---

### HU-04: Registrar resultado de consulta

**Como** veterinario  
**Quiero** registrar diagnóstico y tratamiento al finalizar una consulta  
**Para** mantener la ficha clínica actualizada y disponible para futuras atenciones

**Criterios de aceptación:**
```gherkin
Escenario: Registro exitoso de consulta
  Dado que existe una cita en estado "En curso"
  Cuando el veterinario ingresa diagnóstico y tratamiento
  Entonces el sistema guarda la entrada en la ficha clínica con fecha y hora automáticas

Escenario: Intento de registro sin diagnóstico
  Cuando el veterinario intenta guardar sin ingresar diagnóstico
  Entonces el sistema muestra "El diagnóstico es obligatorio" y no guarda
```

---

## 14. User Story Mapping

El User Story Mapping organiza las historias por flujo de actividad del usuario, de izquierda a derecha según el recorrido natural del proceso veterinario.

```
ACTIVIDAD        │ REGISTRAR       │ AGENDAR         │ ATENDER          │ SEGUIMIENTO
                 │                 │                 │                  │
TAREA DEL        │ Registrar       │ Consultar       │ Ver historial    │ Ver próximas
USUARIO          │ propietario     │ disponibilidad  │ del paciente     │ vacunas
                 │                 │                 │                  │
                 │ Registrar       │ Agendar cita    │ Registrar        │ Enviar
                 │ mascota         │                 │ diagnóstico      │ recordatorio
                 │                 │ Cancelar /      │                  │ de cita
                 │ Buscar          │ reprogramar     │ Registrar        │
                 │ mascota/dueño   │ cita            │ tratamiento      │ Generar
                 │                 │                 │                  │ reporte de
                 │                 │ Notificar al    │ Registrar        │ atenciones
                 │                 │ propietario     │ vacuna           │
─────────────────┼─────────────────┼─────────────────┼──────────────────┼──────────────
RELEASE 1        │ HU-01 ✓         │ HU-02 ✓         │ HU-03 ✓          │
(MVP)            │ HU-05           │ HU-06           │ HU-04 ✓          │
─────────────────┼─────────────────┼─────────────────┼──────────────────┼──────────────
RELEASE 2        │ HU-07           │ HU-08           │ HU-09            │ HU-10
                 │ (editar datos)  │ (reprogramar)   │ (adjuntar examen)│ HU-11
─────────────────┼─────────────────┼─────────────────┼──────────────────┼──────────────
RELEASE 3        │                 │                 │                  │ HU-12
(reportes)       │                 │                 │                  │ HU-13
```

**Leyenda:** ✓ = historia incluida en el sprint actual | Las historias sin ✓ están en el backlog para releases futuras.

**Grupos funcionales identificados:**
1. **Gestión de pacientes y propietarios** — núcleo del sistema; prerrequisito de todo lo demás
2. **Agendamiento** — flujo principal del recepcionista
3. **Atención clínica** — flujo principal del veterinario; maneja la ficha clínica
4. **Seguimiento y notificaciones** — valor agregado post-consulta; release 2 en adelante
