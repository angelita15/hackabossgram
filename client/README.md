# Intagram App

Implementar frontend que permita hacer peticiones al backend de la aplicación.

# RUTAS

[/login] Inicio de sesión
[/signup] Registro
[/posts] Muestra todas las publicaciones en orden
[/posts/new] Ruta donde se crea la publicación
[/posts/:idPost] Ruta para ver un post en específico

# Entidades en la base de datos

# USERS

[users] - usuario registrado

    - id
    - username
    - email
    - password
    - createdAt

# POSTS

[posts]

    - id
    - idUser
    - image
    - text
    - createdAt

# Likes

[userVotes]

    - id
    - idUser
    - vote
    - idPost
    - createdAt

# Endpoints clientes (usuarios anónimos)

- GET [/users/:idUser] - Mostrar el perfil de usuario ✅

- GET [/posts] - Mostrar ÚLTIMAS publicaciones ✅

- GET [/posts/:idPost] - Buscar una publicacion ✅

- POST [/login] - Inicio sesión (devuelve token) ✅

- POST [/users] - Registro de usuario ✅

# Endpoints (usuarios registrados)

- POST [/posts] - Permite crear un post (necesita cabecera con token) ✅

- DELETE [/posts/:idPost] - Borra un post solo si eres quien lo creó (necesita cabecera con token) ✅

- POST [/posts/:idPost/like] Dar/Quitar un like ✅
