from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

# 👇 simple homepage route (fixes "Not Found")
def home(request):
    return JsonResponse({
        "message": "Backend is running successfully 🚀"
    })

urlpatterns = [
    path('', home),  # ✅ FIX: root URL
    path('admin/', admin.site.urls),
    path('api/', include('ingestion.urls')),
]