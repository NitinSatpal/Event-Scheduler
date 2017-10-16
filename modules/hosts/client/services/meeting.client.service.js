(function () {
  'use strict';

  angular
    .module('hosts.services')
    .factory('MeetingService', MeetingService);

  MeetingService.$inject = ['$resource'];

  function MeetingService($resource) {
    return $resource('/api/host/meeting/', {
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
