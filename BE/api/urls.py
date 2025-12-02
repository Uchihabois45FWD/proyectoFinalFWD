from django.urls import path
from . import views
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
    EliminarUsuarioView
)

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
    path("usuario-id/<int:id_usuario>/", UsuarioDetailView.as_view(), name='usuario-por-id'),
    path('actualizar-usuario/', EditarUsuarioView.as_view()),
    path("crear-comentario-curso/", ComentariosCursosCreateView.as_view()),
    path("eliminar-usuario/<int:id>/", EliminarUsuarioView.as_view()),
    path('comentarios-noticias/', views.comentarios_noticias, name='comentarios-noticias'),
]
