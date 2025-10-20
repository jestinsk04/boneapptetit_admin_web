# BoneAppetit Admin Web

## Panel administrativo construido con React, TypeScript y Vite.

---

## 📋 Descripción

Aplicación web administrativa que integra autenticación con Firebase, manejo de webhooks, dashboard de logs y utilidades internas. Optimizada con React 19 + Vite para un flujo de desarrollo rápido.

## 🛠 Tecnologías Principales

- React 19 (con Vite)
- TypeScript
- React Router 7
- Tailwind CSS 4 + Flowbite React (componentes UI)
- Axios (cliente HTTP)
- React Hook Form + Yup (formularios y validación)
- Zustand (estado global ligero)
- TanStack Query (cache & fetching de datos)
- Firebase (auth / config)
- AG Grid (tablas / data grid)

## 📦 Requisitos Previos

- Node.js >= 18
- Yarn (v1) instalado globalmente (`npm i -g yarn` si no lo tienes)
- Cuenta y proyecto Firebase configurado (variables de entorno)

## ⚙️ Variables de Entorno

Crea un archivo `.env` (o `.env.local`) en la raíz con los valores de Firebase y otros endpoints. Ejemplo:

| NAME                              | DEFAULT VALUE              | DESCRIPTION                          |
| --------------------------------- | -------------------------- | ------------------------------------ |
| VITE_FIREBASE_API_KEY             | xxxxx                      | API Key de Firebase                  |
| VITE_FIREBASE_AUTH_DOMAIN         | xxxxx.firebaseapp.com      | Dominio de autenticación de Firebase |
| VITE_FIREBASE_PROJECT_ID          | xxxxx                      | ID del proyecto de Firebase          |
| VITE_FIREBASE_STORAGE_BUCKET      | xxxxx.appspot.com          | Bucket de almacenamiento de Firebase |
| VITE_FIREBASE_MESSAGING_SENDER_ID | xxxxx                      | Sender ID para Firebase Messaging    |
| VITE_FIREBASE_APP_ID              | xxxxx                      | App ID de Firebase                   |
| VITE_API_BASE_URL                 | https://api.mi-backend.com | URL base para el backend/API         |

No compartas este archivo ni lo subas a git.

## 🚀 Instalación

```bash
git clone <repo-url>
cd boneapptetit_admin_web
yarn install
```

Durante `postinstall` se ejecuta el patch de `flowbite-react` (definido en `package.json`).

## 🧪 Scripts Disponibles (Yarn)

- `yarn dev`: Inicia el servidor de desarrollo (Vite) con HMR.
- `yarn build`: Compila TypeScript y genera build optimizado en `dist/`.
- `yarn preview`: Sirve el build para verificación local.
- `yarn lint`: Ejecuta ESLint sobre el proyecto.

## 💻 Modo Desarrollo

1. Configura variables de entorno.
2. Instala dependencias: `yarn install`.
3. Ejecuta: `yarn dev`.
4. Abre: http://localhost:5173 (o el puerto que Vite informe).

Hot Module Replacement (HMR) está habilitado automáticamente con Vite.

## 📡 Flujo HTTP

Las peticiones se centralizan vía `src/shared/libs/httpClient.ts` usando Axios. Ajusta el `baseURL` mediante `VITE_API_BASE_URL`.

## 🔐 Autenticación

Implementada con Firebase (`src/shared/config/firebase.ts`) y estado manejado por store en `src/app/store/auth.ts` + React Router para proteger rutas.

## 🌐 Ruteo

Definido en `src/app/navigation/RootNavigation.tsx` y `AuthNavigation.tsx` usando React Router 7.

## 🧩 UI y Estilos

- Tailwind CSS 4 integrado vía plugin oficial Vite.
- Componentes reutilizables en `src/shared/component`.
- Flowbite React para componentes pre-estilizados.

## 📊 Tablas / Data Grid

AG Grid configuración base en `src/shared/libs/ag-grid-es.ts` y tema en `src/shared/ui/ag-grid-theme.ts`.

## 🔄 Formularios y Validación

`react-hook-form` + `@hookform/resolvers` + `yup` para validación declarativa. Schemas en `src/features/**/schemas`.

## ☁️ Deploy a Firebase Hosting

Pre-requisitos:

1. Tener Firebase CLI instalado: `npm i -g firebase-tools`.
2. Autenticarse: `firebase login`.
3. Verificar archivo `firebase.json` y `dist/` como `public` (ajusta si es necesario).

### Paso a Paso

```bash
# 1. Build de producción
yarn build

# 2. (Opcional) Previsualizar build
yarn preview

# 3. Inicializar (solo la primera vez si no existe config)
firebase init hosting

# 4. Deploy
firebase deploy --only hosting
```

### Deploy rápido (si ya está configurado)

```bash
yarn build && firebase deploy --only hosting
```

## 🧹 Linting y Calidad

Ejecuta `yarn lint`. Ajusta configuración en `eslint.config.js` según tus necesidades.

## 🗂 Estructura (Resumen)

```
src/
  app/            # Navegación y store global
  features/       # Módulos funcionales (auth, webhook, home, etc.)
  shared/         # Componentes y utilidades compartidas
  assets/         # Imágenes y recursos estáticos
```

## 🧪 Testing (Pendiente)

Actualmente no hay configuración de pruebas automatizadas. Sugerido: Vitest + React Testing Library.

## 🤝 Contribución

1. Crear rama feature: `git checkout -b feature/nombre`.
2. Implementar cambios y lint: `yarn lint`.
3. Crear Pull Request a `develop`.

## 🐞 Troubleshooting

- Error de Firebase: revisa si las keys están correctamente cargadas.
- 404 en rutas: asegurar configuración de rewrites en Firebase Hosting (si usas SPA):
  ```json
  {
    "hosting": {
      "public": "dist",
      "rewrites": [{ "source": "**", "destination": "/index.html" }]
    }
  }
  ```
- Estilos no aplican: confirmar que Tailwind procesó clases y que no hay purge erróneo.

## 📄 Licencia

Proyecto interno. No distribuir sin autorización.

---
