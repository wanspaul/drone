import pymongo
from bson import ObjectId
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.views import APIView
from pymongo import MongoClient
import numpy as np
import json
from django.conf import settings
import serpy


class APIStatusCode():
    SUCCESS = 0
    ERROR = 500


class APIStatusMessage():
    SUCCESS = '호출을 성공하였습니다.'
    ERROR = '서버 에러가 발생하였습니다.'


class APIResult(object):

    def __init__(self):
        self.status = APIStatusCode.SUCCESS
        self.message = APIStatusMessage.SUCCESS
        self.data = {}

    def add_object(self, name, value):
        self.data[name] = value


class APIResultSerializer(serpy.Serializer):
    status = serpy.IntField()
    message = serpy.StrField()
    data = serpy.Field()


class SavePerson(APIView):

    def post(self, request):
        name = request.POST.get('name')
        phone = request.POST.get('phone')
        group = request.POST.get('group')

        data = {
            'name': name,
            'phone': phone,
            'group': group,
            'point': 0,
            'win_prize_count': 0,
            'attendance_count': 0,
            'active': True
        }

        client = MongoClient(host=settings.MONGO_HOST, port=settings.MONGO_PORT)
        db = client['drone']

        api_result = APIResult()
        result = {}

        try:
            _id = db.person.insert(data)

            person = db.person.find_one(_id)

            # is_attendance 를 False 로 설정해 object를 만드는 이유
            # 새로운 인원이 추가되면 이벤트 등록에 관련 정보가 같이 추가되어야 하는데, is_attendance 정보가 필요하다. (한시적인 상태값)
            # 이에 따라 person 도큐먼트와는 상관없지만, 임의로 is_attendance 필드를 추가해준다.
            result.update({
                '_id': str(person.get('_id')),
                'name': person.get('name'),
                'phone': person.get('phone'),
                'group': person.get('group'),
                'point': person.get('point'),
                'attendance_count': person.get('attendance_count'),
                'win_prize_count': person.get('win_prize_count'),
                'is_attendance': False
            })

            api_result.add_object('person', result)
            api_result.message = APIStatusMessage.SUCCESS
        except:
            api_result.status = APIStatusCode.ERROR
            api_result.message = APIStatusMessage.ERROR

        return Response(APIResultSerializer(api_result).data)


class PersonList(APIView):

    def get(self, request):

        client = MongoClient(host=settings.MONGO_HOST, port=settings.MONGO_PORT)
        db = client['drone']

        api_result = APIResult()
        result_list = []
        try:
            person_list = db.person.find({'active': True})
            # 도저히 SavePerson에서 ObjectId 값을 Object 로 넘기는 방법을 모르겠어서, 실제 Id 값만 스트링 형태로 다시 바꿔서 넘겨주는 것으로 통일한다.
            idx = 0 # for search person
            for person in person_list:
                result_list.append({
                    '_id': str(person.get('_id')),
                    'idx': idx,
                    'name': person.get('name'),
                    'phone': person.get('phone'),
                    'group': person.get('group'),
                    'point': person.get('point'),
                    'attendance_count': person.get('attendance_count'),
                    'win_prize_count': person.get('win_prize_count'),
                    'is_attendance': False
                })
                idx += 1

            api_result.add_object('person_list', result_list)
            api_result.message = APIStatusMessage.SUCCESS
        except:
            api_result.status = APIStatusCode.ERROR
            api_result.message = APIStatusMessage.ERROR

        return Response(APIResultSerializer(api_result).data)


class PersonDelete(APIView):

    def post(self, request):

        _id = request.POST.get('id')

        client = MongoClient(host=settings.MONGO_HOST, port=settings.MONGO_PORT)
        db = client['drone']

        api_result = APIResult()
        # 삭제 하지 않고 비활성화 시킨다. DB 수작업 말고는 다시 활성화 시킬 방법은 없다.
        try:
            db.person.update_one(
                {'_id': ObjectId(_id)},
                {'$set': {'active': False}}
            )
            api_result.message = APIStatusMessage.SUCCESS
        except:
            api_result.status = APIStatusCode.ERROR
            api_result.message = APIStatusMessage.ERROR

        return Response(APIResultSerializer(api_result).data)


class SaveEvent(APIView):

    def post(self, request):
        title = request.POST.get('title')
        first = request.POST.get('first')
        second = request.POST.get('second')
        third = request.POST.get('third')
        checked_person_list = request.POST.get('checked_person_list', [])
        checked_person_list = json.loads(checked_person_list)

        client = MongoClient(host=settings.MONGO_HOST, port=settings.MONGO_PORT)
        db = client['drone']

        attendance_count, g_count, k_count, y_count, b_count = (0,) * 5
        # 참석한 인원에게 순번을 매기고, 배열에 따로 모은다.
        attendance_person_list = []
        for checked_person in checked_person_list:
            if checked_person.get('is_attendance'):
                group = checked_person.get('group', '')
                if group == 'g':
                    g_count += 1
                elif group == 'k':
                    k_count += 1
                elif group == 'y':
                    y_count += 1
                elif group == 'b':
                    b_count += 1
                attendance_count += 1
                attendance_person_list.append(checked_person)

        # 참석 인원을 랜덤하게 셔플한다.
        np.random.shuffle(attendance_person_list)

        api_result = APIResult()
        event_result = {}

        try:
            event_attendance_list = []
            for attendance_person in attendance_person_list:
                person_id = ObjectId(attendance_person.get('_id'))
                event_attendance_id = db.event_attendance.insert({
                    'person_id': person_id,
                    'product_id': ''
                })
                event_attendance_list.append(event_attendance_id)
                # person point 1 증가
                db.person.update_one(
                    {
                        '_id': person_id
                    },
                    {
                        '$inc': {'point': 1, 'attendance_count': 1}
                    }
                )

            event_data = {
                'title': title,
                'first': first,
                'second': second,
                'third': third,
                'event_attendance_list': event_attendance_list,
                'attendance_count': attendance_count,
                'g_count': g_count,
                'k_count': k_count,
                'y_count': y_count,
                'b_count': b_count,
                'active': True,
                'create_dt': timezone.now()
            }

            event_id = db.event.insert(event_data)

            # make json result
            event = db.event.find_one(event_id)

            checked_person_list = []
            for event_attendance_id in event.get('event_attendance_list'):
                event_attendance = db.event_attendance.find_one(event_attendance_id)
                person = db.person.find_one(event_attendance.get('person_id'))
                checked_person_dict = {
                    'event_attendance_id': str(event_attendance_id),
                    'name': person.get('name'),
                    'phone': person.get('phone'),
                    'product_id': str(event_attendance.get('product_id'))
                }
                checked_person_list.append(checked_person_dict)

            event_result.update({
                '_id': str(event.get('_id')),
                'title': event.get('title'),
                'first': event.get('first'),
                'second': event.get('second'),
                'third': event.get('third'),
                'checked_person_list': checked_person_list,
                'attendance_count': event.get('attendance_count'),
                'g_count': event.get('g_count'),
                'k_count': event.get('k_count'),
                'y_count': event.get('y_count'),
                'b_count': event.get('b_count')
            })

            api_result.add_object('event', event_result)
            api_result.message = APIStatusMessage.SUCCESS
        except:
            api_result.status = APIStatusCode.ERROR
            api_result.message = APIStatusMessage.ERROR

        return Response(APIResultSerializer(api_result).data)


class EventList(APIView):

    def get(self, request):
        client = MongoClient(host=settings.MONGO_HOST, port=settings.MONGO_PORT)
        db = client['drone']

        api_result = APIResult()
        result_list = []
        try:
            event_list = db.event.find({'active': True}).sort('create_dt', pymongo.DESCENDING)
            # 도저히 SavePerson에서 ObjectId 값을 Object 로 넘기는 방법을 모르겠어서, 실제 Id 값만 스트링 형태로 다시 바꿔서 넘겨주는 것으로 통일한다.
            for event in event_list:

                # make json result
                event_attendance_list = event.get('event_attendance_list')
                checked_person_list = []
                for event_attendance_id in event_attendance_list:
                    event_attendance = db.event_attendance.find_one(event_attendance_id)
                    person = db.person.find_one(event_attendance.get('person_id'))
                    checked_person_dict = {
                        'event_attendance_id': str(event_attendance_id),
                        'name': person.get('name'),
                        'phone': person.get('phone'),
                        'product_id': str(event_attendance.get('product_id'))
                    }
                    checked_person_list.append(checked_person_dict)

                result_list.append({
                    '_id': str(event.get('_id')),
                    'title': event.get('title'),
                    'first': event.get('first', ''),
                    'second': event.get('second', ''),
                    'third': event.get('third', ''),
                    'checked_person_list': checked_person_list,
                    'attendance_count': event.get('attendance_count'),
                    'g_count': event.get('g_count'),
                    'k_count': event.get('k_count'),
                    'y_count': event.get('y_count'),
                    'b_count': event.get('b_count'),
                })

            api_result.add_object('event_list', result_list)
            api_result.message = APIStatusMessage.SUCCESS
        except:
            api_result.status = APIStatusCode.ERROR
            api_result.message = APIStatusMessage.ERROR

        return Response(APIResultSerializer(api_result).data)


class SaveProduct(APIView):
    def post(self, request):
        name = request.POST.get('name')

        data = {
            'name': name,
            'active': True
        }

        client = MongoClient(host=settings.MONGO_HOST, port=settings.MONGO_PORT)
        db = client['drone']

        api_result = APIResult()
        result = {}

        try:
            _id = db.product.insert(data)

            product = db.product.find_one(_id)

            result.update({
                '_id': str(product.get('_id')),
                'name': product.get('name'),
                'active': product.get('active')
            })

            api_result.add_object('product', result)
            api_result.message = APIStatusMessage.SUCCESS
        except:
            api_result.status = APIStatusCode.ERROR
            api_result.message = APIStatusMessage.ERROR

        return Response(APIResultSerializer(api_result).data)


class ProductUpdate(APIView):

    def post(self, request):

        _id = request.POST.get('id')
        active = request.POST.get('active')

        client = MongoClient(host=settings.MONGO_HOST, port=settings.MONGO_PORT)
        db = client['drone']

        api_result = APIResult()
        result = {}

        try:
            db.product.update_one(
                {'_id': ObjectId(_id)},
                {'$set': {'active': active == "true"}}
            )

            product = db.product.find_one(ObjectId(_id))

            result.update({
                '_id': str(product.get('_id')),
                'name': product.get('name'),
                'active': product.get('active')
            })

            api_result.add_object('product', result)

            api_result.message = APIStatusMessage.SUCCESS
        except:
            api_result.status = APIStatusCode.ERROR
            api_result.message = APIStatusMessage.ERROR

        return Response(APIResultSerializer(api_result).data)


class ProductList(APIView):
    def get(self, request):

        client = MongoClient(host=settings.MONGO_HOST, port=settings.MONGO_PORT)
        db = client['drone']

        api_result = APIResult()
        result_list = []
        try:
            product_list = db.product.find()
            for product in product_list:
                result_list.append({
                    '_id': str(product.get('_id')),
                    'name': product.get('name'),
                    'active': product.get('active')
                })

            api_result.add_object('product_list', result_list)
            api_result.message = APIStatusMessage.SUCCESS
        except:
            api_result.status = APIStatusCode.ERROR
            api_result.message = APIStatusMessage.ERROR

        return Response(APIResultSerializer(api_result).data)


class EventAttendanceUpdate(APIView):
    def post(self, request):
        event_attendance_id = request.POST.get('event_attendance_id')
        product_id = request.POST.get('product_id')
        event_id = request.POST.get('event_id')

        client = MongoClient(host=settings.MONGO_HOST, port=settings.MONGO_PORT)
        db = client['drone']

        api_result = APIResult()
        result = {}

        if len(product_id) == 0:
            product_id = ''
        else:
            product_id = ObjectId(product_id)

        try:
            # 1. 기존 데이터 조회
            event_attendance = db.event_attendance.find_one(ObjectId(event_attendance_id))
            person = db.person.find_one(event_attendance.get('person_id'))

            # 2. 당첨 기준 확인
            if event_attendance.get('product_id') == '' and person.get('win_prize_count') > 1:
                api_result.status = APIStatusCode.ERROR
                api_result.message = '이번 달 당첨 가능한 횟수를 초과하였습니다. (한달 2회까지 가능)'
                return Response(APIResultSerializer(api_result).data)

            # 3. 조건에 따라 당첨횟수 증감
            if event_attendance.get('product_id') == '':
                db.person.update_one(
                    {'_id': event_attendance.get('person_id')},
                    {'$inc': {'win_prize_count': 1}}
                )
            elif product_id == '':
                db.person.update_one(
                    {'_id': event_attendance.get('person_id')},
                    {'$inc': {'win_prize_count': -1}}
                )

            # 4. 상품 업데이트
            db.event_attendance.update_one(
                {'_id': ObjectId(event_attendance_id)},
                {'$set': {'product_id': product_id}}
            )

            # make json result
            event = db.event.find_one(ObjectId(event_id))

            checked_person_list = []
            for event_attendance_id in event.get('event_attendance_list'):
                event_attendance = db.event_attendance.find_one(event_attendance_id)
                person = db.person.find_one(event_attendance.get('person_id'))
                checked_person_dict = {
                    'event_attendance_id': str(event_attendance_id),
                    'name': person.get('name'),
                    'phone': person.get('phone'),
                    'product_id': str(event_attendance.get('product_id'))
                }
                checked_person_list.append(checked_person_dict)

            result.update({
                '_id': str(event.get('_id')),
                'title': event.get('title'),
                'first': event.get('first'),
                'second': event.get('second'),
                'third': event.get('third'),
                'checked_person_list': checked_person_list,
                'attendance_count': event.get('attendance_count'),
                'g_count': event.get('g_count'),
                'k_count': event.get('k_count'),
                'y_count': event.get('y_count'),
                'b_count': event.get('b_count')
            })

            api_result.add_object('event', result)

            api_result.message = APIStatusMessage.SUCCESS
        except:
            api_result.status = APIStatusCode.ERROR
            api_result.message = APIStatusMessage.ERROR

        return Response(APIResultSerializer(api_result).data)


class EventDelete(APIView):
    def post(self, request):

        _id = request.POST.get('id')

        client = MongoClient(host=settings.MONGO_HOST, port=settings.MONGO_PORT)
        db = client['drone']

        api_result = APIResult()
        # 삭제 하지 않고 비활성화 시킨다. DB 수작업 말고는 다시 활성화 시킬 방법은 없다.
        try:
            db.event.update_one(
                {'_id': ObjectId(_id)},
                {'$set': {'active': False}}
            )
            event = db.event.find_one({'_id': ObjectId(_id)})
            event_attendance_list = event.get('event_attendance_list')
            for event_attendance_id in event_attendance_list:
                event_attendance = db.event_attendance.find_one({'_id': event_attendance_id})
                if event_attendance.get('product_id') != '':
                    win_prize_count = -1
                else:
                    win_prize_count = 0

                db.person.update_one(
                    {
                        '_id': event_attendance.get('person_id')
                    },
                    {
                        '$inc': {'point': -1, 'win_prize_count': win_prize_count, 'attendance_count': -1}
                    }
                )

            api_result.message = APIStatusMessage.SUCCESS
        except:
            api_result.status = APIStatusCode.ERROR
            api_result.message = APIStatusMessage.ERROR

        return Response(APIResultSerializer(api_result).data)


class PersonInitCount(APIView):
    def post(self, request):

        client = MongoClient(host=settings.MONGO_HOST, port=settings.MONGO_PORT)
        db = client['drone']

        api_result = APIResult()
        try:
            db.person.update_many(
                {},
                {'$set': {'win_prize_count': 0, 'attendance_count': 0}}
            )
            api_result.message = APIStatusMessage.SUCCESS
        except:
            api_result.status = APIStatusCode.ERROR
            api_result.message = APIStatusMessage.ERROR

        return Response(APIResultSerializer(api_result).data)


class PersonInfo(APIView):
    def get(self, request):
        _id = request.GET.get('id')

        client = MongoClient(host=settings.MONGO_HOST, port=settings.MONGO_PORT)
        db = client['drone']

        api_result = APIResult()
        result = {}
        result_list = []
        try:
            person = db.person.find_one(ObjectId(_id))
            result.update({
                '_id': str(person.get('_id')),
                'name': person.get('name'),
                'phone': person.get('phone'),
                'group': person.get('group'),
                'point': person.get('point'),
                'attendance_count': person.get('attendance_count'),
                'win_prize_count': person.get('win_prize_count')
            })

            point_use_list = db.point_use.find(
                {'person_id': ObjectId(_id)}
            )
            for point_use in point_use_list:
                result_list.append({
                    '_id': str(point_use.get('_id')),
                    'day': point_use.get('day'),
                    'use_point': point_use.get('use_point')
                })

            api_result.add_object('person', result)
            api_result.add_object('point_use_list', result_list)
            api_result.message = APIStatusMessage.SUCCESS
        except:
            api_result.status = APIStatusCode.ERROR
            api_result.message = APIStatusMessage.ERROR

        return Response(APIResultSerializer(api_result).data)


class PersonUsePoint(APIView):
    def post(self, request):

        _id = request.POST.get('id')
        use_point = int(request.POST.get('use_point', 0))

        client = MongoClient(host=settings.MONGO_HOST, port=settings.MONGO_PORT)
        db = client['drone']

        api_result = APIResult()
        result = {}
        result_list = []
        try:
            deduction_point = use_point * (-1)

            db.person.update_one(
                {'_id': ObjectId(_id)},
                {'$inc': {'point': deduction_point}}
            )

            day = timezone.now().strftime('%Y-%m-%d')

            db.point_use.insert({
                'day': day,
                'person_id': ObjectId(_id),
                'use_point': use_point
            })

            person = db.person.find_one(ObjectId(_id))
            result.update({
                '_id': str(person.get('_id')),
                'name': person.get('name'),
                'phone': person.get('phone'),
                'group': person.get('group'),
                'point': person.get('point'),
                'attendance_count': person.get('attendance_count'),
                'win_prize_count': person.get('win_prize_count')
            })

            point_use_list = db.point_use.find(
                {'person_id': ObjectId(_id)}
            )
            for point_use in point_use_list:
                result_list.append({
                    '_id': str(point_use.get('_id')),
                    'day': point_use.get('day'),
                    'use_point': point_use.get('use_point')
                })
            api_result.add_object('person', result)
            api_result.add_object('point_use_list', result_list)
            api_result.message = APIStatusMessage.SUCCESS
        except:
            api_result.status = APIStatusCode.ERROR
            api_result.message = APIStatusMessage.ERROR

        return Response(APIResultSerializer(api_result).data)


class SignIn(APIView):

    def post(self, request):

        password = request.POST.get('password')

        api_result = APIResult()

        if settings.PASSWORD == password:
            api_result.message = APIStatusMessage.SUCCESS
        else:
            api_result.message = APIStatusMessage.ERROR
            api_result.status = APIStatusCode.ERROR

        return Response(APIResultSerializer(api_result).data)
