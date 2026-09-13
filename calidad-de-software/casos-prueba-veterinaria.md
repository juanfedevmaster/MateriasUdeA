# Casos de Prueba — Sistema de Gestión Veterinaria VetCare
**Fábrica-Escuela | CodeFactory_2025-2**

---

## CP-01: Registro exitoso de mascota con propietario existente

| **Nombre caso prueba** | Registro exitoso de mascota con propietario existente | **Id CP:** | CP-01 |
|---|---|---|---|
| | | **Módulo que se prueba:** | Gestión de Pacientes |

**Descripción:**
Verificar que un usuario con rol Recepcionista puede registrar una nueva mascota ingresando todos los campos obligatorios y vinculándola a un propietario previamente registrado en el sistema.

**Objetivo:**
Confirmar que el módulo de registro de mascotas almacena correctamente los datos del paciente y lo deja disponible para búsqueda y agendamiento.

**Criterios de aceptación:**
- La mascota queda guardada en la base de datos con todos los campos ingresados.
- El sistema muestra un mensaje de confirmación de registro exitoso.
- La mascota aparece en los resultados al buscar por nombre o por propietario.

**Criterios de rechazo:**
- El sistema no guarda el registro o muestra un error inesperado tras ingresar datos válidos.
- La mascota no aparece en la búsqueda después del registro.
- Los datos guardados no coinciden con los ingresados.

**Prerrequisitos:**
1. El sistema está desplegado y accesible en el ambiente de pruebas.
2. Existe un usuario con rol Recepcionista con credenciales activas: `recepcionista@vetcare.com` / `Test1234!`.
3. El propietario con nombre "Carlos Rueda" ya está registrado (ID propietario: PRP-001).
4. No existe ninguna mascota llamada "Luna" vinculada a PRP-001.

**Pasos camino feliz:**
1. Iniciar sesión con el usuario Recepcionista.
2. Navegar al menú **Pacientes → Registrar nueva mascota**.
3. Ingresar los siguientes datos:
   - Nombre: `Luna`
   - Especie: `Canino`
   - Raza: `Labrador`
   - Fecha de nacimiento: `2021-03-15`
   - Propietario: buscar y seleccionar `Carlos Rueda (PRP-001)`
4. Hacer clic en **Guardar**.
5. En el buscador de pacientes, buscar por nombre `Luna`.

**Resultado esperado del camino feliz:**
- El sistema muestra el mensaje: *"Mascota registrada exitosamente."*
- La búsqueda por nombre `Luna` devuelve el registro con los datos ingresados y lo vincula a Carlos Rueda.

**Pasos camino de excepción:**
1. Iniciar sesión con el usuario Recepcionista.
2. Navegar al menú **Pacientes → Registrar nueva mascota**.
3. Ingresar solo los campos: Nombre: `Toby`, Especie: `Felino`. Dejar Raza y Propietario vacíos.
4. Hacer clic en **Guardar**.

**Resultado esperado camino de excepción:**
- El sistema no guarda el registro.
- Muestra mensajes de error indicando los campos faltantes: *"El campo Raza es obligatorio"* y *"Debe seleccionar un propietario"*.
- El formulario permanece abierto con los datos ya ingresados.

**Pasa o no pasa la prueba?**
_Por diligenciar tras ejecución_

**Autor(es)**
- Quién diseñó la prueba: Ana Gómez
- Quién ejecutó la prueba: _Por diligenciar_

---

## CP-02: Agendamiento de cita en horario disponible

| **Nombre caso prueba** | Agendamiento de cita en horario disponible | **Id CP:** | CP-02 |
|---|---|---|---|
| | | **Módulo que se prueba:** | Agendamiento |

**Descripción:**
Verificar que un Recepcionista puede crear una cita para una mascota registrada, asignando un veterinario con disponibilidad real en la fecha y hora seleccionada, y que el sistema notifica al propietario.

**Objetivo:**
Confirmar que el módulo de agendamiento registra la cita sin conflictos y activa la notificación al propietario cuando los datos son válidos.

**Criterios de aceptación:**
- La cita queda registrada con estado "Programada".
- El horario seleccionado queda bloqueado para el veterinario asignado.
- El propietario recibe correo de confirmación con los datos de la cita.

**Criterios de rechazo:**
- La cita no se registra pese a que los datos son válidos.
- El horario no queda bloqueado y permite doble agendamiento.
- No se envía notificación al propietario.

**Prerrequisitos:**
1. El sistema está desplegado y accesible en el ambiente de pruebas.
2. Usuario Recepcionista activo: `recepcionista@vetcare.com` / `Test1234!`.
3. Mascota `Luna` (MAS-001) registrada y vinculada al propietario Carlos Rueda (correo: `crueda@mail.com`).
4. Veterinario `Dr. Andrés Mora` (VET-001) sin citas el día `2025-10-01` a las `10:00`.
5. El servidor de correo del ambiente de pruebas está configurado y operativo.

**Pasos camino feliz:**
1. Iniciar sesión con el usuario Recepcionista.
2. Navegar a **Citas → Nueva cita**.
3. Seleccionar mascota: `Luna (MAS-001)`.
4. Seleccionar veterinario: `Dr. Andrés Mora (VET-001)`.
5. Seleccionar fecha: `2025-10-01` y hora: `10:00`.
6. Hacer clic en **Confirmar cita**.
7. Revisar el correo de `crueda@mail.com` en el cliente de prueba.

**Resultado esperado del camino feliz:**
- El sistema muestra: *"Cita agendada exitosamente."*
- La cita aparece en el calendario del Dr. Andrés Mora el 2025-10-01 a las 10:00 con estado "Programada".
- El correo de confirmación llega a `crueda@mail.com` con mascota, veterinario, fecha y hora.

**Pasos camino de excepción:**
1. Iniciar sesión con el usuario Recepcionista.
2. Navegar a **Citas → Nueva cita**.
3. Seleccionar mascota: `Luna (MAS-001)`.
4. Seleccionar veterinario: `Dr. Andrés Mora (VET-001)`.
5. Seleccionar fecha: `2025-09-01` (fecha pasada) y hora: `10:00`.
6. Hacer clic en **Confirmar cita**.

**Resultado esperado camino de excepción:**
- El sistema no registra la cita.
- Muestra el mensaje: *"La fecha debe ser futura."*
- El formulario permanece abierto con los datos ingresados para corrección.

**Pasa o no pasa la prueba?**
_Por diligenciar tras ejecución_

**Autor(es)**
- Quién diseñó la prueba: Ana Gómez
- Quién ejecutó la prueba: _Por diligenciar_

---

## CP-03: Conflicto de horario al agendar cita

| **Nombre caso prueba** | Detección de conflicto de horario al agendar | **Id CP:** | CP-03 |
|---|---|---|---|
| | | **Módulo que se prueba:** | Agendamiento |

**Descripción:**
Verificar que el sistema detecta y bloquea el intento de agendar una cita para un veterinario en un horario ya ocupado, y que ofrece alternativas de horario disponibles el mismo día.

**Objetivo:**
Confirmar que la lógica de validación de conflictos de horario funciona correctamente y guía al Recepcionista hacia una alternativa sin pérdida de datos.

**Criterios de aceptación:**
- El sistema detecta el conflicto y muestra aviso claro antes de guardar.
- No se genera una segunda cita solapada para el mismo veterinario.
- El sistema propone al menos un horario alternativo disponible del mismo día.

**Criterios de rechazo:**
- El sistema permite registrar dos citas para el mismo veterinario en el mismo horario.
- El aviso de conflicto no se muestra o aparece después de guardar.
- No se ofrecen alternativas de horario.

**Prerrequisitos:**
1. El sistema está desplegado y accesible en el ambiente de pruebas.
2. Usuario Recepcionista activo: `recepcionista@vetcare.com` / `Test1234!`.
3. Cita existente: `Dr. Andrés Mora (VET-001)` tiene una cita confirmada el `2025-10-01` a las `10:00` con la mascota `Kira (MAS-002)`.
4. Segunda mascota disponible: `Luna (MAS-001)` registrada.

**Pasos camino feliz (detección del conflicto):**
1. Iniciar sesión con el usuario Recepcionista.
2. Navegar a **Citas → Nueva cita**.
3. Seleccionar mascota: `Luna (MAS-001)`.
4. Seleccionar veterinario: `Dr. Andrés Mora (VET-001)`.
5. Seleccionar fecha: `2025-10-01` y hora: `10:00` (horario ya ocupado).
6. Hacer clic en **Confirmar cita**.

**Resultado esperado del camino feliz:**
- El sistema muestra: *"El veterinario ya tiene una cita en ese horario."*
- Despliega los próximos horarios disponibles del Dr. Mora el 2025-10-01, por ejemplo: 11:00, 14:00, 16:00.
- No se registra la cita duplicada.

**Pasos camino de excepción (selección de horario alternativo):**
1. Tras el aviso de conflicto, el Recepcionista selecciona el horario alternativo sugerido: `11:00`.
2. Hacer clic en **Confirmar con nuevo horario**.

**Resultado esperado camino de excepción:**
- La cita se registra exitosamente para `Luna (MAS-001)` con el `Dr. Andrés Mora` el `2025-10-01` a las `11:00`.
- El sistema muestra: *"Cita agendada exitosamente."*
- La cita original de Kira a las 10:00 no se ve afectada.

**Pasa o no pasa la prueba?**
_Por diligenciar tras ejecución_

**Autor(es)**
- Quién diseñó la prueba: Carlos Pérez
- Quién ejecutó la prueba: _Por diligenciar_

---

## CP-04: Control de acceso al historial médico por rol

| **Nombre caso prueba** | Control de acceso al historial médico según rol de usuario | **Id CP:** | CP-04 |
|---|---|---|---|
| | | **Módulo que se prueba:** | Historial Clínico / Control de Acceso |

**Descripción:**
Verificar que el historial médico de una mascota es accesible únicamente para usuarios con rol Veterinario o Administrador, y que el sistema deniega el acceso a usuarios con rol Recepcionista mostrando el mensaje de error correspondiente.

**Objetivo:**
Confirmar que las reglas de control de acceso basado en roles (RBAC) se aplican correctamente sobre el módulo de historial clínico, protegiendo la confidencialidad de la información médica.

**Criterios de aceptación:**
- El Veterinario accede al historial completo: vacunas, consultas, diagnósticos y tratamientos.
- El Administrador accede al historial completo.
- El acceso es denegado para el Recepcionista con mensaje claro.

**Criterios de rechazo:**
- El Recepcionista puede ver total o parcialmente el historial médico.
- El Veterinario no puede acceder al historial de su paciente.
- El mensaje de denegación no aparece o es incorrecto.

**Prerrequisitos:**
1. El sistema está desplegado y accesible en el ambiente de pruebas.
2. Usuario Veterinario activo: `veterinario@vetcare.com` / `Vet1234!`.
3. Usuario Recepcionista activo: `recepcionista@vetcare.com` / `Test1234!`.
4. Mascota `Luna (MAS-001)` tiene al menos una entrada de historial médico registrada: consulta del `2025-08-15`, diagnóstico `Dermatitis leve`, tratamiento `Crema Betametasona 0.1 %`.

**Pasos camino feliz (acceso autorizado — Veterinario):**
1. Iniciar sesión con el usuario Veterinario.
2. Navegar a **Pacientes → Buscar paciente**.
3. Buscar `Luna` y seleccionar `MAS-001`.
4. Hacer clic en la pestaña **Historial médico**.

**Resultado esperado del camino feliz:**
- El sistema muestra el historial completo de Luna:
  - Consulta del 2025-08-15
  - Diagnóstico: Dermatitis leve
  - Tratamiento: Crema Betametasona 0.1 %
- No se muestra ningún aviso de acceso restringido.

**Pasos camino de excepción (acceso denegado — Recepcionista):**
1. Cerrar sesión del Veterinario.
2. Iniciar sesión con el usuario Recepcionista.
3. Navegar a **Pacientes → Buscar paciente**.
4. Buscar `Luna` y seleccionar `MAS-001`.
5. Intentar hacer clic en la pestaña **Historial médico** (si es visible) o intentar acceder directamente a la URL del historial.

**Resultado esperado camino de excepción:**
- La pestaña de historial médico no está disponible para el Recepcionista, o al intentar acceder el sistema muestra: *"No tiene permisos para ver esta información."*
- No se expone ningún dato del historial médico de Luna.
- El Recepcionista permanece en la vista de datos generales de la mascota.

**Pasa o no pasa la prueba?**
_Por diligenciar tras ejecución_

**Autor(es)**
- Quién diseñó la prueba: Laura Torres
- Quién ejecutó la prueba: _Por diligenciar_
