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
- **Artículos guardados** en una página aparte (`/saved-news`), con el conteo y las palabras clave ordenadas por popularidad.
- **Diseño responsivo** de 320 px a 1440 px, con menú hamburguesa en móvil.
- **Ventanas modales** de registro e inicio de sesión que se cierran con la ✕, con un clic fuera o con la tecla Esc.

## Tecnologías

- **React 19** con componentes funcionales y hooks (`useState`, `useEffect`)
- **React Router 8** para las rutas `/` y `/saved-news`
- **Vite** como empaquetador y servidor de desarrollo
- **CSS3** con metodología BEM, flexbox y grid, media queries, y fuentes cargadas con `@font-face` (Roboto, Roboto Slab e Inter)
- **Fetch API** para consultar News API
- **localStorage** para conservar la última búsqueda
- **ESLint** para mantener el código consistente

## Estructura del proyecto

```
src/
├── components/     un directorio por componente, con su JSX y su CSS
├── utils/          NewsApi.js, configuración, constantes y utilidades
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

| Entorno | Servicio que se consulta |
| --- | --- |
| Desarrollo (`npm run dev`) | `https://newsapi.org/v2` |
| Producción (`npm run build`) | `https://nomoreparties.co/news/v2`, el proxy de TripleTen |

El cambio es automático, no hay que tocar nada al desplegar.

## Despliegue

La aplicación se sirve como sitio estático con **nginx** en un servidor de Vultr.

```bash
# 1. Compila la versión de producción
npm run build

# 2. Copia el resultado al servidor
scp -r dist/* usuario@TU_SERVIDOR:/var/www/news-explorer/
```

En el servidor, el archivo [`deploy/nginx.conf`](deploy/nginx.conf) tiene el bloque listo para copiar. La parte importante es esta:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Sin esa línea, entrar directamente a `/saved-news` o recargar la página estando ahí devolvería un 404: esa ruta no existe como archivo, la resuelve React Router en el navegador. El certificado HTTPS se emite con `certbot --nginx`.

## Estado del proyecto

Esta es la primera etapa: la interfaz completa conectada a News API. En las siguientes se añade una API propia con Node.js, Express y MongoDB para el registro de usuarios y el guardado real de artículos, en el repositorio [news-explorer-backend](https://github.com/DanielPzCz/news-explorer-backend).

## Autor

Daniel Pérez — [@DanielPzCz](https://github.com/DanielPzCz)
