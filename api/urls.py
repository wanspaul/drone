from django.conf.urls import url

from api import views


urlpatterns = [
    url(r'sign_in$', views.SignIn.as_view()),

    url(r'save_event$', views.SaveEvent.as_view()),
    url(r'event_list$', views.EventList.as_view()),
    url(r'event_attendance_update$', views.EventAttendanceUpdate.as_view()),
    url(r'event_delete$', views.EventDelete.as_view()),

    url(r'save_product$', views.SaveProduct.as_view()),
    url(r'product_list$', views.ProductList.as_view()),
    url(r'product_update$', views.ProductUpdate.as_view()),

    url(r'save_person$', views.SavePerson.as_view()),
    url(r'person_list$', views.PersonList.as_view()),
    url(r'person_delete$', views.PersonDelete.as_view()),
    url(r'person_init_count$', views.PersonInitCount.as_view()),
    url(r'person_info$', views.PersonInfo.as_view()),
    url(r'person_use_point$', views.PersonUsePoint.as_view()),
]