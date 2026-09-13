# Entregables — Arquitectura de Software

> Basado en Lineamientos Integrados CodeF@ctory V2 (julio 2026), rúbrica de evaluación y presentación del curso.

---

## Trabajos del Curso (evaluación independiente de los sprints)

> Los trabajos se entregan cuando el curso ya cubrió los temas necesarios para ejecutarlos.

### 20% — Diseño Arquitectónico Formal
> Entregar alrededor de Semana 9-10, tras ver Estilos Arquitectónicos (sem. 9), ISO 25010 (sem. 4) y Rol del Arquitecto (sem. 4).

Documento + justificación con:

- Drivers arquitectónicos identificados
- Estilo arquitectónico seleccionado y justificado *(preliminar ya definido en Sprint 1 — aquí se formaliza con criterios técnicos completos)*
- 2 a 3 ADR formales *(ya entregados en Sprint 1: mínimo 3 ADR priorizados, y actualizados en Sprint 2 — aquí se consolidan y profundizan)*
- Definición de atributos de calidad

### 20% — Análisis de Calidad y Trade-offs
> Entregar alrededor de Semana 12-13, tras ver Arquitecturas Modernas y DevOps (sem. 11) y Proceso de Desarrollo orientado a Arquitectura (sem. 12).

- APIs implementadas — adjuntar repositorio; se evalúa diseño y buenas prácticas *(ya entregadas en Sprint 2: mínimo 3 APIs REST o GraphQL operativas — aquí se analizan, no se reimplementan)*
- Análisis de trade-offs documentados
- Identificación de riesgos arquitectónicos

### 20% — Seguridad Arquitectónica y Hardening
> Entregar alrededor de Semana 15-16, tras ver Principios de Arq. Segura y Seguridad en APIs (sem. 16). Implementación debe iniciar desde Sprint 3.

- Threat modeling documentado
- Hardening de APIs implementado — adjuntar repositorio; se evalúa implementación de políticas de seguridad *(aseguramiento mediante tokens ya entregado en Sprint 3 — aquí se amplía con políticas completas)*
- Identificación de vulnerabilidades OWASP Top Ten *(ya identificadas en Sprint 2 — aquí se documentan con remediación aplicada)*
- Métricas básicas: latencia y errores *(base disponible desde Sprint 3 con Grafana/Prometheus — aquí se interpretan y documentan)*

### 10% — Sustentación Final Arquitectónica
> Semana 16 — Cierre del curso.

- Defensa oral de las decisiones arquitectónicas del proyecto

---

---

## Sprint 1

### Entregables (lineamientos sección 3.7)

- Diagrama de paquetes y componentes con interfaces
- Estilo arquitectónico preliminar definido (limpia, hexagonal, capas, monolito modular o microservicio delimitado)
- Proyecto base Spring Boot en GitHub con despliegue inicial funcional
- Al menos 1 historia de usuario implementada y demostrable
- **Mínimo 3 ADR priorizados** (contexto, alternativas, elección, consecuencias, responsable, fecha)

### Qué se evalúa (rúbrica — Arquitectura de Solución)

| Nota | Criterio |
|------|----------|
| **4** | Todas las decisiones justificadas con contexto del sistema y criterio técnico claro de selección o adaptación |
| **3** | Mayoría justificadas; algunas parciales o sin profundidad |
| **2** | Solo algunas decisiones justificadas; relación con contexto superficial o incompleta |
| **1** | Sin justificación o justificaciones desconectadas del sistema y los criterios técnicos |

> **Nota Sprint 1 — Calidad Interna:** solo se evalúa cobertura de pruebas unitarias (≥65% para nota 4, ≥50% nota 3, ≥40% nota 2, ≥30% nota 1). El análisis estático debe estar habilitado desde este sprint.

---

## Sprint 2

### Entregables (lineamientos sección 3.7)

- Diagrama de despliegue actualizado
- Mínimo 3 APIs REST o GraphQL priorizadas e implementadas
- CI/CD inicial con GitHub Actions
- Identificación de vulnerabilidades OWASP Top Ten documentada
- Documentación de APIs (OpenAPI/Swagger versionado para REST; SDL para GraphQL)
- ADR actualizados por cada nueva decisión arquitectónica del sprint

### Qué se evalúa (rúbrica — Arquitectura de Solución)

| Nota | Criterio |
|------|----------|
| **4** | Todas las decisiones justificadas con contexto del sistema y criterio técnico claro de selección o adaptación |
| **3** | Mayoría justificadas; algunas parciales o sin profundidad |
| **2** | Solo algunas decisiones justificadas; relación con contexto superficial o incompleta |
| **1** | Sin justificación o justificaciones desconectadas del sistema y los criterios técnicos |

> **Nota Sprint 2 — Calidad Interna:** se evalúan 4 de los 5 Quality Gates para nota 3, los 5 para nota 4: cobertura ≥65%, deuda técnica ≤2 días, complejidad ciclomática <50, hallazgos Minor o mejor, 0 vulnerabilidades críticas.

---

## Sprint 3

### Entregables (lineamientos sección 3.7)

- Refinamiento de APIs (contratos finales, versionado, compatibilidad)
- Contenedores con Docker Compose; orquestación con Kubernetes cuando aplique
- Observabilidad: Grafana + Prometheus (métricas, dashboards, alertas)
- Pruebas de integración sobre el backend real
- Aseguramiento mediante tokens (expiración, rotación, revocación)
- Diagramas finales coincidentes con código e infraestructura desplegada

### Qué se evalúa (rúbrica — Arquitectura de Solución)

| Nota | Criterio |
|------|----------|
| **4** | Todas las decisiones justificadas con contexto del sistema y criterio técnico claro de selección o adaptación |
| **3** | Mayoría justificadas; algunas parciales o sin profundidad |
| **2** | Solo algunas decisiones justificadas; relación con contexto superficial o incompleta |
| **1** | Sin justificación o justificaciones desconectadas del sistema y los criterios técnicos |

> **Nota Sprint 3 — Calidad Interna:** mismos 5 Quality Gates que Sprint 2. Aplica la misma escala 1-4.

---

## Reglas generales

1. **ADR es la evidencia directa del criterio Arquitectura de Solución.** Sin ADRs con justificación técnica real, la nota máxima posible es 2.
2. **Cada ADR debe responder:** ¿por qué esta tecnología o patrón y no otra alternativa? Contexto + alternativas evaluadas + criterio de decisión.
3. **Los diagramas deben coincidir con el código e infraestructura desplegada.** Divergencia entre diagrama y código descalifica para nota 4.
4. **El análisis estático (SonarCloud/SonarQube) debe estar habilitado desde Sprint 1**, no es opcional activarlo después.
5. **Los ADR se actualizan en el mismo sprint en que cambia la solución** (sección 4.4 lineamientos). ADR desactualizado = decisión no justificada.

---

## Quality Gates — referencia rápida

| Quality Gate | Sprint 1 | Sprint 2 y 3 |
|---|---|---|
| Cobertura pruebas unitarias | ≥ 65% (nota 4) | ≥ 65% (nota 4) |
| Deuda técnica | — | ≤ 2 días |
| Complejidad ciclomática | — | < 50 |
| Severidad de hallazgos | — | Minor o mejor |
| Vulnerabilidades críticas | — | 0 |

> Sprint 1: solo se evalúa cobertura. Sprint 2 y 3: los 5 gates. Para nota 4 se deben cumplir todos los gates del sprint correspondiente.
