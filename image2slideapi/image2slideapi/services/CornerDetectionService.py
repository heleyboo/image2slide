from django.core.files.storage import FileSystemStorage
import xmltodict
import rpyc
import cv2
from django.conf import settings
from django.contrib.sessions.backends.db import SessionStore
from rest_framework.response import Response
import xml.etree.ElementTree as ET
import traceback

class CornerDetectionService:

    def detect_corners(self, request):
        try:
            target_image = request.FILES['image']
            # Store image
            fs = FileSystemStorage(location=settings.MEDIA_ROOT)
            fs.save(target_image.name, target_image)
            image_url = settings.MEDIA_ROOT + '/' + target_image.name
            cv2_img = cv2.imread(image_url)

            session = SessionStore()
            session['img_url'] = image_url
            session.create()
            session_id = session.session_key

            rpyc.core.protocol.DEFAULT_CONFIG['allow_pickle'] = True
            conn = rpyc.connect(settings.RPYC_HOST, settings.RPYC_PORT, config = {"allow_public_attrs" : True})
            contr = conn.root
            contr.addInputImage(image=cv2_img, session_ID=session_id)

            xml = None

            while type(xml) == type(None):
                xml = contr.getBoardDetectionResult(session_ID=session_id)

            xml_str = ET.tostring(xml)
            obj = xmltodict.parse(xml_str)
            obj['session_id'] = session_id
            print('detected corners' + session_id)
            return Response(obj)

        except ConnectionRefusedError:
            print(traceback.format_exc())
            return Response({'error_code': 'AI_CONN_ERROR'})
        except Exception:
            print(traceback.format_exc())
            return Response({'error_code': 'API_SERVER_ERROR'})


