# Intagram App

Implementar una API que permita publicar fotos (añadiendo o no textos) y que otras
personas puedan verlas.

# Entidades en la base de datos

[users] - usuario registrado

    - id
    - username
    - email
    - password
    - createdAt
    - modifiedAt

[posts]
-id
-idUser
-username
-image
-text
-likes
-createdAt
-modifiedAt

[comentarios]
-idUser
-username
-text
-createdAt
-modifiedAt

[perfil]
-id
-idUser
-username
-image
-text
-createdAt
-modifiedAt

# Endpoints clientes (usuarios anónimos)

-   GET [/users/:idUser] - Mostrar el perfil de usuario ✅

-   GET [/posts] - Mostrar ÚLTIMAS publicaciones ✅

-   GET [/posts/:idPost] - Buscar una publicacion ✅

-   POST [/login] - Inicio sesión (devuelve token) ✅

-   POST [/users] - Registro de usuario ✅

# Endpoints (usuarios normales registrado)

POST [/posts] - Permite crear un post (necesita cabecera con token) (✅)

DELETE [/posts/:idPost] - Borra un post solo si eres quien lo creó (necesita cabecera con token) (OPCIONAL)

PUT [/users/:idUser] - Modificar perfil de usuario OPCIONAL

POST [/posts/:idPost/comment] Crea un comentario OPCIONAL

POST [/posts/:idPost/like] Dar/Quitar un like ✅

# RUTAS

[/] home page
[/login]
[/registro]
