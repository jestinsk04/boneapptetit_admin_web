# Manual de Usuario (Borrador)

> Proyecto: Boneappetit Admin Web  
> Fecha de generación: 24-09-2025  
> Versión del documento: 0.1 (Borrador)

---

## 1. Introducción

Este sistema es un panel administrativo para gestionar configuraciones y monitorear actividades relacionadas con _webhooks_ y sincronización de pedidos. El objetivo de este manual es guiar a usuarios no técnicos en el uso básico de la plataforma.

## 2. Acceso al Sistema

### 2.1 Requisitos

- Navegador moderno actualizado (Chrome, Edge, Firefox).
- Conexión estable a Internet.
- Cuenta corporativa autorizada con acceso a Google (SSO).

### 2.2 Inicio de Sesión

1. Ingresa a la URL proporcionada por el equipo (por ejemplo: `https://<dominio>/`).
2. Si no has iniciado sesión serás redirigido automáticamente a la pantalla de acceso.
3. Presiona el botón **“Iniciar sesión con Google”**.
4. Selecciona tu cuenta autorizada.
5. Si el acceso es correcto, verás el panel principal y una barra superior con tu correo.

### 2.3 Cerrar Sesión

1. En la parte superior derecha presiona el botón **“Cerrar sesión”**.
2. Serás redirigido a la pantalla de inicio de sesión.

## 3. Estructura General de la Interfaz

- **Barra de navegación (superior)**: Muestra el logo, un saludo con tu correo y enlaces rápidos a secciones: _Home_, _Webhook Config_, _Webhook Logs_.
- **Contenido principal**: Cambia según la sección seleccionada.
- **Breadcrumb (miga de pan)**: Indica en qué parte del sistema te encuentras dentro de la sección Webhook.
- **Notificaciones**: Mensajes emergentes (toasts) informan resultados de acciones (éxito o error).

## 4. Secciones del Sistema

### 4.1 Home

Pantalla de bienvenida. Muestra un mensaje introductorio y te invita a usar el menú para navegar a otras secciones.

### 4.2 Webhook Config (Configuración de Webhook)

Esta pantalla permite actualizar la configuración utilizada para la sincronización de pedidos vía webhook shopify - Odoo Modulos de Sales.

Componentes principales:

- **Order Creation State**: Estado con el cual se crearán las ordenes en el sistema odoo (ej.: `CONFIRMED` o `UNCONFIRMED`).
- **Order Sync By Status**: Define en qué momento se considera que un pedido de shopify debe sincronizarse (ej.: `PAID`, `FULFILLED`, `PAID AND FULFILLED`).
- **Currency**: Selección de la moneda empleada para la integración (esta moneda debe estar configurada en la empresa de odoo).
- **Payment Methods (Metodos de Pago)**: Lista desplegable donde se marcan uno o más métodos (ej.: Zelle, Pago Móvil, etc.).
- **Botón “Save Configuration”**: Guarda los cambios. Si la operación tiene éxito verás un mensaje de confirmación.

Flujo sugerido para actualizar configuración:

1. Ingresar a la sección desde el menú: **Webhook Config**.
2. Esperar a que carguen los valores actuales.
3. Ajustar cada campo según necesidad.
4. Presionar **Save Configuration**.
5. Confirmar el mensaje de éxito.

Mensajes de error comunes:

- Validaciones por selección vacía.
- Error de red al intentar guardar.

### 4.3 Webhook Logs (Registro de Webhooks)

Esta sección muestra un tablero y una tabla con eventos de webhook procesados.

Partes de la pantalla:

- **Indicadores superiores**: Cantidad de operaciones exitosas (Total Sync) y fallidas (Total Not Sync).
- **Botones de filtro**: `All`, `Success`, `Error` para cambiar la vista rápidamente.
- **Botón Refresh**: Actualiza manualmente los datos mostrados.
- **Caja de búsqueda (Buscar)**: Filtra rápidamente registros por texto.
- **Tabla de registros**: Lista cada evento con columnas como operación, fecha, identificadores, estado y detalles.
- **Ícono verde / rojo**: Indica estado (éxito o error).
- **Botón de reintento (flecha circular)**: Aparece solo en filas con estado de error. Permite volver a intentar procesar ese evento.

Flujo para revisar y reintentar:

1. Entrar a **Webhook Logs**.
2. Usar filtros si deseas acotar la vista (ej.: solo errores).
3. Opcional: usar la búsqueda para localizar un ID específico.
4. En una fila con error, presionar el botón de reintento.
5. Esperar notificación de resultado (éxito o error).

## 5. Notificaciones y Mensajes

- **Éxito**: Se muestran en verde informando que la operación fue completada.
- **Error**: Se muestran en rojo indicando fallos (validación, conexión u operación rechazada).
- **Estados de carga**: Algunos botones pueden mostrar un indicador de cargando (spinner) mientras se procesa una acción.

## 6. Flujos Principales del Usuario

### 6.1 Iniciar Sesión

1. Abrir URL del sistema.
2. Presionar “Iniciar sesión con Google”.
3. Seleccionar cuenta válida.
4. Acceder al panel Home.

### 6.2 Actualizar Configuración de Webhook

1. Ir a **Webhook Config**.
2. Revisar valores actuales.
3. Cambiar estado de creación, moneda y métodos de pago según necesidad.
4. Guardar.
5. Confirmar mensaje de éxito.

### 6.3 Consultar y Reintentar Registros Fallidos

1. Ir a **Webhook Logs**.
2. Filtrar por **Error**.
3. Seleccionar el ícono de reintento en la fila.
4. Confirmar mensaje de éxito o revisar mensaje de error.

## 7. Resolución de Problemas Comunes

| Problema                                | Posible causa                | Acción sugerida                    |
| --------------------------------------- | ---------------------------- | ---------------------------------- |
| No puedo iniciar sesión                 | Cuenta no registrada         | Verificar con administrador        |
| Botón Google no responde                | Bloqueo de ventana emergente | Habilitar pop-ups del navegador    |
| No se guardan cambios en Webhook Config | Error de red                 | Revisar conexión y reintentar      |
| No aparecen registros en Logs           | No se han generado eventos   | Usar Refresh o validar integración |
| Reintento falla repetidamente           | Error lógico en backend      | Escalar al equipo técnico          |

## 8. Buenas Prácticas de Uso

- Cerrar sesión al terminar.
- No compartir tu cuenta con terceros.
- Validar antes de guardar configuración crítica.
- Revisar logs tras cambios importantes.

## 9. Glosario Básico

- **Webhook**: Mecanismo para enviar datos automáticamente desde un sistema a otro cuando ocurre un evento.
- **Sync (Sincronización)**: Proceso de igualar datos entre sistemas.
- **Reintento**: Intento adicional para procesar una operación fallida.
