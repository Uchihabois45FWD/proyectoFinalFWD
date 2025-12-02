from django.urls import path
from . import views
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
)

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
    path("usuario-id/<int:id_usuario>/",UsuarioPorIdView.as_view()),
    path('actualizar-usuario/',EditarUsuarioView.as_view()),
    path("crear-comentario-curso/", ComentariosCursosCreateView.as_view()),
    path('comentarios-noticias/', views.comentarios_noticias, name='comentarios-noticias'),
]
