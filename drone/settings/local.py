from drone.settings.base import *

MONGO_HOST = '127.0.0.1'
MONGO_PORT = 27018
PASSWORD = '1234'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

CORS_ORIGIN_ALLOW_ALL = True
