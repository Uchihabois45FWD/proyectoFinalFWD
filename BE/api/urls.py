from django.urls import path
from .views import (
    UsuarioCreateView,
    CursoCreateView,
    InscripcionCreateView,
    CategoriaEventoCreateView,
    EventoCreateView,
    AsistenteEventoCreateView,
    OrganizadorCreateView,
    UsuarioLoginView,
    NoticiasCreateView,
    UsuarioPorIdView,
    EditarUsuarioView,
    UsuarioDetailView
)

urlpatterns = [
    path("crear-usuario/", UsuarioCreateView.as_view()),
    path("crear-curso/", CursoCreateView.as_view()),
    path("crear-inscripcion/", InscripcionCreateView.as_view()),
    path("crear-categoria-evento/", CategoriaEventoCreateView.as_view()),
    path("crear-evento/", EventoCreateView.as_view()),
    path("crear-asistente-evento/", AsistenteEventoCreateView.as_view()),
    path("crear-organizador/", OrganizadorCreateView.as_view()),
    path("crear-noticia/", NoticiasCreateView.as_view()),
    path("login/", UsuarioLoginView.as_view()),
    path("usuario-id/<int:id_usuario>/",UsuarioPorIdView.as_view()),
    path('actualizar-usuario/',EditarUsuarioView.as_view()),
    path('usuario/<int:pk>/', UsuarioDetailView.as_view()),
]
