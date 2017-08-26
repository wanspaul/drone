"""
WSGI config for drone project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/howto/deployment/wsgi/
"""


import os
import socket
from django.core.wsgi import get_wsgi_application

if os.environ.get('DJANGO_SETTINGS_MODULE') is None:
    if socket.gethostname() == 'ec2-52-78-93-33.ap-northeast-2.compute.amazonaws.com' or socket.gethostname('ip-172-31-2-13'):
        print('production setting')
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'drone.settings.production')
    else:
        print('local setting')
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'drone.settings.local')

application = get_wsgi_application()