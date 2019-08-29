from django.core.files.storage import FileSystemStorage
import xmltodict
import dicttoxml
import rpyc
import cv2
from django.conf import settings
from django.contrib.sessions.backends.db import SessionStore
import json
import base64
import xml.etree.ElementTree as ET
from rest_framework.response import Response
import traceback
import time
from ..exceptions.customException import GetAIProcessResultErr

def cvtNetrefToNumpy(obj):
    obj = rpyc.classic.obtain(obj)
    return obj

class ObjectDetectionService:
    def detect_objects(self, request):
        try:
            # get data from request body
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            xmlstr = body['xml']
            session_id = body['session_id']

            
            # Connect AI
            rpyc.core.protocol.DEFAULT_CONFIG['allow_pickle'] = True
            conn = rpyc.connect(settings.RPYC_HOST, settings.RPYC_PORT, config = {"allow_public_attrs" : True})
            contr = conn.root

            print('connected rypc')

            self.__update_corner(contr, session_id, xmlstr)

            self.__get_detection_result(contr, session_id)

            

            imgProcessed = contr.getBoardProcessResult(session_ID=session_id)
            inputImg = cvtNetrefToNumpy(imgProcessed)

            # Add data to detection module
            contr.addProcesedImg(image=inputImg, session_ID=session_id)


            #object_detect_res = contr.getObjectDetectionResult(session_ID)
            # Stub data, remove when integrated with AI module
            xml_path = settings.MEDIA_ROOT + '/detections.xml'
            with open(xml_path, 'r') as f:
                xml_return = f.readlines()
            xml_return = ''.join(xml_return)

            # img_path = settings.MEDIA_ROOT + '/2.JPG'
            # with open(img_path, "rb") as image_file:
            #     encoded_string = base64.b64encode(image_file.read())

            obj = xmltodict.parse(xml_return)
            obj['session_id'] = session_id
            # obj['processed_img'] = encoded_string
            return Response(obj)

        except ConnectionRefusedError:
            print(traceback.format_exc())
            return Response({'error_code': 'AI_CONN_ERROR'})
        except Exception:
            print(traceback.format_exc())
            return Response({'error_code': 'API_SERVER_ERROR'})

    def get_processed_result(self, request):
        data = json.loads(request.body)
        xml_new = data['xml']
        session_id = data['session_id']
        #process
        files = {
            'pptx': 'http://localhost:3000/sample.pdf',
            'pdf': 'http://localhost:3000/sample.pdf'
        }
        return files
    def __update_corner(self, contr, session_id, xmlstr):
        print('updateting')
        print(xmlstr)
        print(session_id)
        # Read data from session
        xml_update = ET.fromstring(xmlstr)
        session = SessionStore(session_key=session_id)
        image_url = session['img_url']
        print(image_url)
        cv2_img = cv2.imread(image_url)
        img = cvtNetrefToNumpy(cv2_img)
        # Update corners
        contr.addCorner(im=img, xml=xml_update, session_ID=session_id)
        time.sleep(0.1)

    def __get_detection_result(self, contr, session_id):
        print('detecting' + session_id)
        count = 5
        img = None
        while type(img) == type(None):
            print('getting image')
            img = contr.getBoardProcessResult(session_ID='w3r1k83strtufk2o47cpziefj5kjql6f')

        print('get board process result done')
        
        if type(img) == type(None):
            raise GetAIProcessResultErr('Error when get board process result')

        img = cvtNetrefToNumpy(img)
        # Add data to detection module
        contr.addProcesedImg(image=img, session_ID=session_id)
        # Get detection xmls
        xml = None
        count = 5
        while (type(xml) == type(None) or count >= 0 ):
            xml = contr.getObjectDetectionResult(session_ID=session_id)
            time.sleep(0.2)
            count -= 1
        if type(xml) == type(None):
            raise GetAIProcessResultErr('Error when get detection result')
        return {
            'xml': ET.tostring(xml),
            'img': img
        }
        



