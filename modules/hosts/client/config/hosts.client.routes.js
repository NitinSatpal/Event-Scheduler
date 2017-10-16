(function () {
  'use strict';

  angular
    .module('hosts.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('host', {
        abstract: true,
        url: '/host',
        template: '<ui-view/>'
      })
      .state('host.dashboard', {
        url: '/dashboard',
        templateUrl: '/modules/hosts/client/views/host-dashboard.client.view.html',
        controller: 'HostDashBoardController',
        controllerAs: 'vm',
        data: {
          roles: ['user']
        }
      })
      .state('host.createMeeting', {
        url: '/meeting/create',
        templateUrl: '/modules/hosts/client/views/host-create-meeting.client.view.html',
        controller: 'HostMeetingController',
        controllerAs: 'vm',
        data: {
          roles: ['user']
        }
      })
      .state('host.meeting', {
        url: '/meetings/:meetingId',
        templateUrl: '/modules/hosts/client/views/meeting.client.view.html',
        controller: 'MeetingViewController',
        controllerAs: 'vm',
        resolve: {
          meetingResolve: getMeeting
        },
        data: {
          roles: ['user']
        }
      })
      .state('meeting', {
        abstract: true,
        url: '/meeting',
        template: '<ui-view/>'
      })
      .state('meeting.register', {
        url: '/register/:meetingId',
        templateUrl: '/modules/hosts/client/views/meeting-registration.client.view.html',
        controller: 'HostMeetupRegistrationController',
        controllerAs: 'vm',
        resolve: {
          meetingResolve: getMeeting
        },
      });

      getMeeting.$inject = ['$stateParams', 'SingleMeetingService'];
      function getMeeting($stateParams, SingleMeetingService) {
        return SingleMeetingService.get({
          meetingId: $stateParams.meetingId
        }).$promise;
      }
  }
}());
