# News Explorer

Aplicación web donde puedes buscar noticias sobre cualquier tema y guardarlas en tu cuenta personal. Es el proyecto final del bootcamp de desarrollo web de TripleTen, construido con React sobre un diseño pixel-perfect de Figma.

## La aplicación en línea

### → https://news.around-daniel.lat

## Qué hace

Escribes un tema en el buscador y la aplicación consulta [News API](https://newsapi.org) para traer los artículos publicados durante los últimos 7 días. Los resultados se muestran de tres en tres, con un botón para ir cargando más.

- **Búsqueda de noticias** con validación: si el campo va vacío, avisa que hace falta una palabra clave.
- **Preloader** mientras llega la respuesta del servidor.
- **Estados claros**: si no hay resultados aparece "No se ha encontrado nada"; si la solicitud falla, un mensaje explicando que puede ser un problema de conexión.
- **Mostrar más**: los artículos se revelan de tres en tres y el botón desaparece cuando ya no queda ninguno.
- **La búsqueda sobrevive**: al volver al sitio se recuperan los resultados, el término buscado y la cantidad de tarjetas que tenías abiertas.
- **Diseño responsivo** de 320 px a 1440 px, con menú hamburguesa en móvil.

Con una cuenta, además:

- **Registro e inicio de sesión** en ventanas modales, con validación instantánea: los mensajes de error aparecen mientras escribes y el botón sigue gris hasta que el formulario es válido. Se cierran con la ✕, con un clic fuera o con la tecla Esc.
- **Guardar artículos**: el marcador de cada tarjeta se pinta de azul y el artículo se envía a la API propia. Sin sesión iniciada, el marcador invita a iniciar sesión.
- **Artículos guardados** en una página aparte (`/saved-news`), con el conteo y las palabras clave ordenadas por popularidad, y una papelera para eliminarlos.
- **Ruta protegida**: `/saved-news` solo se abre con la sesión iniciada. Entrar por un enlace directo devuelve a la página principal y abre la ventana de inicio de sesión.
- **La sesión sobrevive**: el token se guarda en `localStorage` y se valida contra `/users/me` al abrir la aplicación.

## Tecnologías

- **React 19** con componentes funcionales y hooks (`useState`, `useEffect`, `useContext`, `useCallback`)
  - `CurrentUserContext` para compartir el usuario actual sin pasarlo por props
  - Hook propio `useFormValidation` para la validación de los formularios
  - Componente de orden superior `ProtectedRoute` para la ruta privada
- **React Router 8** para las rutas `/` y `/saved-news`
- **Vite** como empaquetador y servidor de desarrollo
- **CSS3** con metodología BEM, flexbox y grid, media queries, y fuentes cargadas con `@font-face` (Roboto, Roboto Slab e Inter)
- **Fetch API** para consultar News API (`NewsApi.js`) y la API propia (`MainApi.js`)
- **localStorage** para conservar la última búsqueda y el token de la sesión
- **ESLint** para mantener el código consistente

## Estructura del proyecto

```
src/
├── components/     un directorio por componente, con su JSX y su CSS
├── contexts/       CurrentUserContext
├── hooks/          useFormValidation
├── utils/          NewsApi.js, MainApi.js, configuración, constantes y utilidades
├── images/         imágenes e iconos SVG
├── vendor/         normalize.css y las fuentes en formato WOFF
└── index.css       estilos base y variables de color
```

## Cómo ejecutarlo en tu computadora

Necesitas [Node.js](https://nodejs.org) 18 o superior.

```bash
# 1. Clona el repositorio
git clone https://github.com/DanielPzCz/news-explorer-frontend.git
cd news-explorer-frontend

# 2. Instala las dependencias
npm install

# 3. Levanta el servidor de desarrollo
npm run dev
```

Abre la dirección que aparece en la terminal (normalmente `http://localhost:5173`).

Otros comandos disponibles:

```bash
npm run build     # compila la versión de producción en dist/
npm run preview   # sirve esa compilación para revisarla
npm run lint      # revisa el código con ESLint
```

## Sobre la clave de News API

La clave vive en `src/utils/config.js`. En la versión gratuita, News API **solo acepta solicitudes desde `localhost`**, así que la aplicación cambia de dirección según el entorno:

| Entorno                      | Servicio que se consulta                                  |
| ---------------------------- | --------------------------------------------------------- |
| Desarrollo (`npm run dev`)   | `https://newsapi.org/v2`                                  |
| Producción (`npm run build`) | `https://nomoreparties.co/news/v2`, el proxy de TripleTen |

El cambio es automático, no hay que tocar nada al desplegar.

## La API propia

El registro de usuarios y el guardado de artículos los atiende un back-end hecho con Node.js, Express y MongoDB, que vive en su propio repositorio: [news-explorer-backend](https://github.com/DanielPzCz/news-explorer-backend).

### → https://api.news.around-daniel.lat

`MainApi.js` es la clase que habla con él: `/signup`, `/signin`, `/users/me` y `/articles`. Las rutas privadas se piden con el encabezado `Authorization: Bearer <token>`.

La dirección se resuelve en `src/utils/config.js` a partir de la variable `VITE_API_URL`:

| Entorno                      | Dirección de la API                                                |
| ---------------------------- | ------------------------------------------------------------------ |
| Desarrollo (`npm run dev`)   | `http://localhost:3001`, el valor por defecto                      |
| Producción (`npm run build`) | lo que diga `VITE_API_URL` en [`.env.production`](.env.production) |

Para levantar el back-end en tu computadora, sigue las instrucciones de su repositorio y, si lo pones en otro puerto, crea un archivo `.env.local` con la dirección que quieras:

```bash
VITE_API_URL=http://localhost:3000
```

Vite solo expone al navegador las variables que empiezan con `VITE_`, y las resuelve al compilar, no al ejecutar: si cambias el archivo hay que volver a compilar.

## Despliegue

La aplicación se sirve como sitio estático con **nginx** en un servidor de Vultr.

Sustituye `usuario` y `servidor` por los tuyos.

```bash
# 1. En tu máquina: compila la versión de producción
npm run build
scp -r dist usuario@servidor:~/dist-nuevo
```

```bash
# 2. En el servidor: reemplaza el contenido publicado
sudo rm -rf /var/www/news-explorer/*
sudo cp -r ~/dist-nuevo/* /var/www/news-explorer/
sudo chown -R www-data:www-data /var/www/news-explorer
rm -rf ~/dist-nuevo
```

Se borra la carpeta antes de copiar porque Vite nombra los archivos con un hash del contenido: en cada compilación cambian de nombre y, sin la limpieza, los antiguos se irían acumulando. El `chown` deja los archivos a nombre del usuario con el que corre nginx, que si no, no puede leerlos.

En el servidor, el archivo [`deploy/nginx.conf`](deploy/nginx.conf) tiene el bloque listo para copiar.

## Autor

Daniel Pérez — [@DanielPzCz](https://github.com/DanielPzCz)
