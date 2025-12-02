from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Usuario  # ajusta al nombre real del modelo

@csrf_exempt
def actualizar_usuario(request):
    if request.method not in ("PATCH", "PUT", "POST"):
        return HttpResponse(status=405)
    try:
        data = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return HttpResponseBadRequest("JSON inválido")
    id_usuario = data.get("id_usuario")
    if not id_usuario:
        return JsonResponse({"message": "id_usuario requerido"}, status=400)
    try:
        user = Usuario.objects.get(pk=id_usuario)
    except Usuario.DoesNotExist:
        return JsonResponse({"message": "Usuario no encontrado"}, status=404)

    # Campos editables
    campos = ["username", "first_name", "last_name", "email", "rol",
              "fecha_nacimiento", "num_telefono", "direccion"]
    for campo in campos:
        if campo in data:
            setattr(user, campo, data[campo])
    user.save()

    # Devolver JSON del usuario actualizado (sin password)
    result = {
        "id_usuario": user.pk,
        "username": user.username,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "rol": getattr(user, "rol", "")
    }
    return JsonResponse(result, status=200)


@csrf_exempt
def usuario_id_detail(request, id_usuario):
    try:
        user = Usuario.objects.get(pk=id_usuario)
    except Usuario.DoesNotExist:
        return JsonResponse({"message": "Usuario no encontrado"}, status=404)

    if request.method == "GET":
        result = {
            "id_usuario": user.pk,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "rol": getattr(user, "rol", "")
        }
        return JsonResponse(result)

    if request.method == "DELETE":
        user.delete()
        return HttpResponse(status=204)

    return HttpResponse(status=405)