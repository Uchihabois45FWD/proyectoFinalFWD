<<<<<<< HEAD
from django.urls import path, include
from rest_framework.routers import DefaultRouter
=======
from django.urls import path
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902
from .views import (
    UsuarioDetailView,
    UsuarioCreateView,
    CursoCreateView,
    InscripcionCursoCreateView,
    CategoriaEventoCreateView,
    EventoCreateView,
    AsistenteEventoCreateView,
    OrganizadorCreateView,
    UsuarioLoginView,
    NoticiasCreateView,
    EditarUsuarioView,
    ComentariosCursosCreateView,
<<<<<<< HEAD
    ComentariosNoticiasViewSet,
    comentarios_noticias,
    editar_perfil,
=======
    EliminarUsuarioView,
    EditarCursoView,
    EliminarCursoView,
    CursoDetailView
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902
)

router = DefaultRouter()
router.register(r'comentarios-noticias-viewset', ComentariosNoticiasViewSet, basename='comentarios-noticias')

urlpatterns = [
    path("crear-usuario/", UsuarioCreateView.as_view(), name='crear-usuario'),
    path("crear-curso/", CursoCreateView.as_view()),
    path("crear-inscripcion/", InscripcionCursoCreateView.as_view()),
    path("crear-categoria-evento/", CategoriaEventoCreateView.as_view()),
    path("crear-evento/", EventoCreateView.as_view()),
    path("crear-asistente-evento/", AsistenteEventoCreateView.as_view()),
    path("crear-organizador/", OrganizadorCreateView.as_view()),
    path("crear-noticia/", NoticiasCreateView.as_view()),
    path("login/", UsuarioLoginView.as_view()),
<<<<<<< HEAD
    path("usuario-id/<int:id_usuario>/", UsuarioPorIdView.as_view()),
    path("actualizar-usuario/", EditarUsuarioView.as_view()),
    path("crear-comentario-curso/", ComentariosCursosCreateView.as_view()),
    path("comentarios-noticias/", comentarios_noticias, name="comentarios-noticias"),
    path("editar-perfil/", editar_perfil, name="editar-perfil"),
    path("", include(router.urls)),  # aquí se incluyen las rutas del ViewSet
]
=======
    path("usuario-id/<int:pk>/", UsuarioDetailView.as_view(), name="usuario-detail"),
    path('actualizar-usuario/', EditarUsuarioView.as_view()),
    path("crear-comentario-curso/", ComentariosCursosCreateView.as_view()),
    path("eliminar-usuario/<int:pk>/", EliminarUsuarioView.as_view()),
    path("actualizar-curso/<int:id_curso>/", EditarCursoView.as_view(), name="actualizar-curso"),
    path("eliminar-curso/<int:id>/", EliminarCursoView.as_view(), name="eliminar-curso"),
    path("curso-detail/<int:pk>/", CursoDetailView.as_view(), name="curso-detail"),
]
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902
