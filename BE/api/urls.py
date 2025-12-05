from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UsuarioCreateView,
    CursoCreateView,
    InscripcionCursoCreateView,
    CategoriaEventoCreateView,
    EventoCreateView,
    AsistenteEventoCreateView,
    OrganizadorCreateView,
    UsuarioLoginView,
    NoticiasCreateView,
    UsuarioPorIdView,
    EditarUsuarioView,
    ComentariosCursosCreateView,
    ComentariosNoticiasViewSet,
    comentarios_noticias,
    editar_perfil,
)

router = DefaultRouter()
router.register(r'comentarios-noticias-viewset', ComentariosNoticiasViewSet, basename='comentarios-noticias')

urlpatterns = [
    path("crear-usuario/", UsuarioCreateView.as_view()),
    path("crear-curso/", CursoCreateView.as_view()),
    path("crear-inscripcion/", InscripcionCursoCreateView.as_view()),
    path("crear-categoria-evento/", CategoriaEventoCreateView.as_view()),
    path("crear-evento/", EventoCreateView.as_view()),
    path("crear-asistente-evento/", AsistenteEventoCreateView.as_view()),
    path("crear-organizador/", OrganizadorCreateView.as_view()),
    path("crear-noticia/", NoticiasCreateView.as_view()),
    path("login/", UsuarioLoginView.as_view()),
    path("usuario-id/<int:id_usuario>/", UsuarioPorIdView.as_view()),
    path("actualizar-usuario/", EditarUsuarioView.as_view()),
    path("crear-comentario-curso/", ComentariosCursosCreateView.as_view()),
    path("comentarios-noticias/", comentarios_noticias, name="comentarios-noticias"),
    path("editar-perfil/", editar_perfil, name="editar-perfil"),
    path("", include(router.urls)),  # aquí se incluyen las rutas del ViewSet
]
