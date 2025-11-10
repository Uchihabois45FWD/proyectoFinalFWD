from django.urls import path
from .views import UsuarioCreateView

urlpatterns = [
    path("crear-usuario/",UsuarioCreateView.as_view())
]
