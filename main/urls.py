from django.urls import path
from django.contrib.auth.views import LogoutView
from main.views import (
    ChangeCoachView,
    CreateParticipantView,
    ChangeParticipantView,
    CreateTeamView,
    CreateCoachView,
    TeamView,
    TeamListView,
    TeamSemifinalListView,
    TeamSchoolFinalListView,
    TeamStudentFinalListView,
    UserLoginView,
    VerifyView,
    IndexView,
    RulesView,
    CommonInfoView,
    UserLoginView,
    SignUpView,
    TeamInfoView,
)

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('rules', RulesView.as_view(), name='rules'),
    path('common-info', CommonInfoView.as_view(), name='common-info'),
    path('teams', TeamListView.as_view(), name='team-list'),
    path('semifinal', TeamSemifinalListView.as_view(), name='semifinal'),
    path('studfinal', TeamStudentFinalListView.as_view(), name='stud-final'),
    path('junfinal', TeamSchoolFinalListView.as_view(), name='jun-final'),
    path('team/', TeamView.as_view(), name='team-detail'),
    path('team/create', CreateTeamView.as_view(), name='create-team'),
    path('team/participant/create', CreateParticipantView.as_view(), name='create-participant'),
    path('team/participant/<int:id>/change', ChangeParticipantView.as_view(), name='change-participant'),
    path('team/coach/create', CreateCoachView.as_view(), name='create-coach'),
    path('team/coach/change', ChangeCoachView.as_view(), name='change-coach'),
    path('team/verification', VerifyView.as_view(), name='verification'),

    path('api/team/<int:id>', TeamInfoView.as_view()),
    path('accounts/', LogoutView.as_view(), name='logout'),
    path('accounts/login', UserLoginView.as_view(), name='login'),
    path('accounts/signup', SignUpView.as_view(), name='signup'),
]