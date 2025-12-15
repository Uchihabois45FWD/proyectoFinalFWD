from django.urls import path
from .views import (
    UsuarioDetailView,
    UsuarioCreateView,
    CursoCreateView,
    InscripcionCreateView,
    InscripcionCursoCreateView,
    EventoCreateView,
    OrganizacionCreateView,
    UsuarioLoginView,
    NoticiasCreateView,
    EditarUsuarioView,
    ComentariosCursosCreateView,
    EliminarUsuarioView,
    EditarCursoView,
    EliminarCursoView,
    EliminarInscripcionView,
    CursoDetailView,
    ComentariosNoticiasCreateView,
    CategoriaCreateView
)
urlpatterns = [
    path("crear-usuario/", UsuarioCreateView.as_view(), name='crear-usuario'),
    path("crear-curso/", CursoCreateView.as_view()),
    path("crear-inscripcion/", InscripcionCreateView.as_view()),
    path("crear-evento/", EventoCreateView.as_view()),
    path("crear-organizacion/", OrganizacionCreateView.as_view()),
    path("crear-noticia/", NoticiasCreateView.as_view()),
    path("login/", UsuarioLoginView.as_view()),
    path("usuario-id/<int:pk>/", UsuarioDetailView.as_view(), name="usuario-detail"),
    path('actualizar-usuario/', EditarUsuarioView.as_view()),
    path("crear-comentario-curso/", ComentariosCursosCreateView.as_view()),
    path("eliminar-usuario/<int:pk>/", EliminarUsuarioView.as_view()),
    path("actualizar-curso/<int:id_curso>/", EditarCursoView.as_view(), name="actualizar-curso"),
    path("eliminar-curso/<int:id>/", EliminarCursoView.as_view(), name="eliminar-curso"),
    path("eliminar-inscripcion/<int:id>/", EliminarInscripcionView.as_view(), name="eliminar-inscripcion"),
    path("curso-detail/<int:pk>/", CursoDetailView.as_view(), name="curso-detail"),
    path("comentarios-noticias/", ComentariosNoticiasCreateView.as_view(), name="curso-detail"),
    path("crear-categoria/", CategoriaCreateView.as_view())
    
]
