# Profile Picture Implementation Plan

## Back-end Tasks
- [x] Add `imagen_perfil` ImageField to Usuario model in BE/api/models.py
- [x] Configure MEDIA_URL and MEDIA_ROOT in BE/proyecto_be/settings.py
- [x] Update UsuarioSerializer in BE/api/serializers.py to handle image uploads
- [x] Modify EditarUsuarioView in BE/api/views.py to support image updates
- [x] Ensure API endpoints handle multipart/form-data for uploads

## Front-end Tasks
- [x] Update PerfilView component in FE/proyecto_fe/src/components/Usuario/PerfilView.jsx to display image and allow uploads

## Follow-up Tasks
- [x] Run Django migrations
- [x] Test upload and display functionality
