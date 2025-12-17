# TODO List for News System Implementation

## Backend Changes
- [x] Change URL from "crear-noticia/" to "noticias/" in urls.py
- [x] Add EliminarNoticiaView in views.py with admin permission check
- [x] Add URL for "noticias/<int:pk>/" in urls.py
- [x] Modify NoticiasCreateView to require authentication and admin role for creation

## Frontend Changes
- [x] Update AgregarNoticiasModal to post to "noticias/" and return created news on submit
- [x] Add AgregarNoticiasModal to Noticias.jsx for admin users
- [x] Update fetch URL in Noticias.jsx to "noticias/"
- [x] Update delete URL in Noticias.jsx to "noticias/${id}/"
- [x] Fix userRole check from "administrador" to "admin"
- [x] Ensure state updates immediately after create/delete without page reload
