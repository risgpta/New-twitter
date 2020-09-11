from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework import generics,status
from rest_framework.response import Response
# from rest_framework import status

class RegisterUser(generics.CreateAPIView):
	serializer_class = UserSerializer

	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		self.perform_create(serializer)
		headers = self.get_success_headers(serializer.data)
		return Response(f"Account successfully created for {serializer.data.get('first_name')} {serializer.data.get('last_name')} ", status=status.HTTP_201_CREATED, headers=headers)



