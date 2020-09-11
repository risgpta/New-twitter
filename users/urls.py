from django.urls import path
from .views import RegisterUser
from rest_framework.authtoken import views as auth_views


urlpatterns = [
	path('register/', RegisterUser.as_view(),name = 'register-user'),
    path('login/', auth_views.obtain_auth_token,name = 'login-user'),
]