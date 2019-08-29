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
from ..services.CornerDetectionService import CornerDetectionService
@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def detect_corners(request):
    """
    Detect corners
    """
    if request.method == 'POST':
        corner_detection_service = CornerDetectionService()
        return corner_detection_service.detect_corners(request)
