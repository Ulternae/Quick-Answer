# Quick Answer

Aplicación web para iniciar sesión, consultar respuestas de actividades y visualizar formularios dinámicos.

## Demo

[quick-answer-one.vercel.app](https://quick-answer-one.vercel.app/)

## Video

https://github.com/user-attachments/assets/26a16476-595b-4314-933b-d14d7b835bca

### Credenciales

```text
Email: demo@prueba.tech
Password: Demo1234!
```

## Instalación

Requiere Node.js 20.9 o superior y pnpm.

```bash
pnpm install
```

Crea un archivo `.env.local`:

```env
NEXT_PUBLIC_DEFAULT_LOCALE="es"
API_BASE_URL="https://proincentive-api-dev-3sksn.ondigitalocean.app/api"
```

Inicia el entorno de desarrollo:

```bash
pnpm dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Funcionalidades

- Autenticación y protección de rutas.
- Renovación transparente de la sesión.
- Listado, filtro por estado y paginación mediante la URL.
- Detalle de respuestas y renderizado de formularios dinámicos.
- Fechas adaptadas a la zona horaria del navegador.
- Traducciones en español e inglés.
- Estados de carga, error y vacío.
- Cierre de sesión.
- Diseño responsive y accesibilidad básica.

## Retos opcionales implementados

- Persistencia de sesión con `GET /auth/me`.
- Renovación del access token mediante refresh token.
- Cliente HTTP centralizado con manejo global de `401`.
- Logout.
- Detalle en Sheet con soporte para `checkbox`, `select`, `number`, `textarea` y archivos.
- Filtros y paginación persistidos en la URL.
- Internacionalización y zonas horarias.

## Decisiones y supuestos

1. **Sesión en cookies `httpOnly`:** los tokens se gestionan en el servidor para evitar exponerlos al JavaScript del navegador.
2. **Cliente HTTP centralizado:** `authenticatedRequest` agrega el bearer token, intenta renovar la sesión ante un `401` y limpia las cookies cuando el refresh falla.
3. **Estado en la URL:** el filtro y la página forman parte de la URL para conservar la navegación al recargar o compartir el enlace.
4. **Errores con un contrato global:** los errores de Zod y los errores independientes se transforman al mismo formato. Los componentes pueden traducir códigos conocidos o mostrar directamente mensajes externos sin depender de la fuente del error.
5. **Formulario con `useActionState`:** el login mantiene en un solo flujo el estado pendiente, los valores enviados y los errores devueltos por la Server Action, evitando estado duplicado en el cliente.
6. **Datatable dirigido por el servidor:** la página y los filtros se leen desde la URL en el Server Component. La acción consulta únicamente los registros necesarios y entrega al datatable los datos junto con la metadata de paginación; el cliente solo actualiza la URL para solicitar la siguiente vista.

El proyecto organiza cada dominio en `features`, separando tipos, schemas, acciones de servidor y componentes de presentación.
