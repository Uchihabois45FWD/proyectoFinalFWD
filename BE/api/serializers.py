from rest_framework.serializers import ModelSerializer
from .models import Usuario

class UsuarioSerializer(ModelSerializer):
    class Meta:
        model = Usuario
        exclude =[
    "last_login",
    "is_superuser",
    "is_staff",
    "is_active",
    "date_joined",
    "groups", 
    "user_permissions"]
