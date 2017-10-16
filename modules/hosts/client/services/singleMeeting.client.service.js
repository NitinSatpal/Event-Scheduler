(function () {
  'use strict';

  angular
    .module('hosts.services')
    .factory('SingleMeetingService', SingleMeetingService);

  SingleMeetingService.$inject = ['$resource'];

  function SingleMeetingService($resource) {
    return $resource('/api/host/single/meeting/:meetingId', {
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
