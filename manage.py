#!/usr/bin/env python
import os
import sys
import socket

if __name__ == "__main__":
    if socket.gethostname() == 'ec2-52-78-93-33.ap-northeast-2.compute.amazonaws.com' or socket.gethostname() == 'ip-172-31-2-13':
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "drone.settings.production")
    else:
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "drone.settings.local")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)