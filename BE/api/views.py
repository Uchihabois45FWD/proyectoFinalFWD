from django.shortcuts import render
from .models import Usuario
from .serializers import UsuarioSerializer
from rest_framework.generics import ListCreateAPIView

class UsuarioCreateView(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
