from django.urls import path
from .views import (
    UsuarioCreateView,
    CursoCreateView,
    InscripcionCreateView,
    CategoriaEventoCreateView,
    EventoCreateView,
    AsistenteEventoCreateView
)

urlpatterns = [
    path("crear-usuario/", UsuarioCreateView.as_view()),
    path("crear-curso/", CursoCreateView.as_view()),
    path("crear-inscripcion/", InscripcionCreateView.as_view()),
    path("crear-categoria-evento/", CategoriaEventoCreateView.as_view()),
    path("crear-evento/", EventoCreateView.as_view()),
    path("crear-asistente-evento/", AsistenteEventoCreateView.as_view()),
]
