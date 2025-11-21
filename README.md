# Proyecto Final FWD - Centro Cívico por la Paz

Este es el proyecto final desarrollado por Adrian David Campos Cisneros y Mariana Solis Araya. Se trata de una aplicación web full-stack para el Centro Cívico por la Paz, una plataforma que facilita la gestión de cursos, noticias, eventos y usuarios en un entorno comunitario dedicado a la promoción de la paz y el desarrollo personal.

## Descripción General

La aplicación permite a los usuarios registrarse, iniciar sesión y acceder a diversas funcionalidades como inscribirse en cursos, explorar noticias destacadas, participar en eventos y gestionar su perfil. Los instructores pueden crear y gestionar cursos, mientras que los administradores tienen acceso completo al sistema.

## Características Principales

- **Gestión de Usuarios**: Registro, inicio de sesión y autenticación JWT. Roles definidos: Usuario, Instructor y Administrador.
- **Cursos**: Creación, visualización y inscripción a cursos con detalles como fechas, instructor, cupos y días de la semana.
- **Noticias**: Publicación y visualización de noticias destacadas con imágenes y descripciones.
- **Eventos**: Organización de eventos categorizados, con registro de asistentes.
- **Inscripciones**: Sistema de inscripciones a cursos con estados (activa, cancelada, finalizada).
- **Perfil de Usuario**: Visualización y edición de información personal.
- **Interfaz Responsiva**: Diseño moderno y adaptable a diferentes dispositivos.

## Tecnologías Utilizadas

### Backend
- **Django**: Framework web para Python.
- **Django REST Framework**: Para construir APIs RESTful.
- **JWT (JSON Web Tokens)**: Para autenticación segura.
- **SQLite**: Base de datos (configurable para otros motores como PostgreSQL).
- **Modelos Django**: Definición de entidades como Usuario, Curso, Inscripcion, etc.

### Frontend
- **React**: Biblioteca para construir interfaces de usuario.
- **Vite**: Herramienta de desarrollo rápida para proyectos React.
- **React Router**: Para navegación entre páginas.
- **CSS**: Estilos personalizados para componentes.
- **Fetch API**: Para consumir la API del backend.

## Estructura del Backend

El backend está organizado en la carpeta `BE/` y utiliza Django con una aplicación principal `api`.

### Modelos Principales
- **Usuario**: Extiende AbstractUser con campos adicionales como fecha de nacimiento, teléfono, dirección y rol.
- **Curso**: Incluye nombre, descripción, fechas, instructor, destacado, cupos, días de la semana e imagen.
- **Noticias**: Título, descripción, imagen, fecha de notificación y destacado.
- **Inscripcion**: Relación entre usuario y curso con estado y fecha de inscripción.
- **Evento**: Título, descripción, fecha, hora, lugar, categoría y organizador.
- **AsistenteEvento**: Registro de asistentes a eventos.
- **CategoriaEvento**: Categorías para clasificar eventos.
- **Organizador**: Información adicional para organizadores de eventos.

### Vistas y Serializers
- Vistas genéricas para CRUD de cada modelo (Usuario, Curso, etc.).
- Vista de login con JWT.
- Serializers para validación y transformación de datos.

### URLs
- Endpoints RESTful para todas las entidades, incluyendo login y obtención de usuario por ID.

## Estructura del Frontend

El frontend está en la carpeta `FE/proyecto_fe/` y utiliza React con Vite.

### Páginas
- **Inicio**: Página de bienvenida con hero, cursos destacados y noticias.
- **Registro**: Formulario de registro de usuarios.
- **Cursos**: Lista de cursos disponibles.
- **Noticias**: Lista de noticias.
- **Perfil**: Visualización y edición del perfil de usuario.
- **CursoDetalle**: Detalles específicos de un curso seleccionado.

### Componentes
- **Navbar**: Navegación principal.
- **Hero**: Sección de bienvenida.
- **CursosDestacados**: Tarjetas de cursos destacados.
- **NoticiasDestacadas**: Tarjetas de noticias destacadas.
- **LoginForm**: Formulario de inicio de sesión.
- **RegistroComp**: Componente de registro.
- **PerfilView/PerfilEdit**: Visualización y edición de perfil.
- **Footer**: Pie de página.

### Servicios
- **fetch.js**: Funciones para consumir la API del backend (GET, POST, etc.).

### Estilos
- Archivos CSS individuales para cada componente y página, con un archivo global para estilos comunes.

## Instalación y Configuración

### Prerrequisitos
- Python 3.x
- Node.js y npm
- Git

### Backend
1. Navega a la carpeta `BE/`:
   ```
   cd BE
   ```
2. Crea un entorno virtual:
   ```
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```
3. Instala las dependencias:
   ```
   pip install -r requirements.txt
   ```
4. Ejecuta las migraciones:
   ```
   python manage.py migrate
   ```
5. Inicia el servidor:
   ```
   python manage.py runserver
   ```
   El backend estará disponible en `http://localhost:8000`.

### Frontend
1. Navega a la carpeta `FE/proyecto_fe/`:
   ```
   cd FE/proyecto_fe
   ```
2. Instala las dependencias:
   ```
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```
   El frontend estará disponible en `http://localhost:5173` (o el puerto indicado por Vite).

## Uso

1. Regístrate como usuario o inicia sesión si ya tienes una cuenta.
2. Explora los cursos destacados en la página de inicio.
3. Navega a la sección de Cursos para ver todos los cursos disponibles e inscribirte.
4. Revisa las noticias en la sección de Noticias.
5. Gestiona tu perfil en la sección de Perfil.
6. Si eres instructor, accede a funcionalidades adicionales para crear cursos.
7. Los administradores tienen acceso completo para gestionar usuarios, cursos y eventos.

## Contribución

Este proyecto fue desarrollado como parte de un curso final. Para contribuciones futuras, asegúrate de seguir las mejores prácticas de desarrollo con Django y React.

## Autores

- Adrian David Campos Cisneros
- Mariana Solis Araya
