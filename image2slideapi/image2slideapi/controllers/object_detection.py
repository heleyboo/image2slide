from django.conf.urls import url, include
from django.urls import path
from rest_framework import serializers, viewsets, routers
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from rest_framework.response import Response
from django.core.files.storage import FileSystemStorage
from django.conf import settings
import numpy as np
import cv2
import xmltodict, json
from ..services.ObjectDetectionService import ObjectDetectionService
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def detect_objects(request):
    """
    Detect objects
    """
    if request.method == 'POST':
        obj_detect_service = ObjectDetectionService()
        return obj_detect_service.detect_objects(request)
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def get_processed_result(request):
    """
        Get processed result
    """
    if request.method == 'POST':
        obj_detect_service = ObjectDetectionService()
        response = obj_detect_service.get_processed_result(request)
        return Response(response)

