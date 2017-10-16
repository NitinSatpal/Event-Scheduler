(function () {
  'use strict';

  angular
    .module('hosts')
    .controller('HostMeetingController', HostMeetingController);

  HostMeetingController.$inject = ['$state', '$scope', 'Authentication', '$http', 'Notification'];

  function HostMeetingController($state, $scope, Authentication, $http, Notification) {
    var vm = this;
    vm.authentication = Authentication;

    vm.createMeeting = function (isValid) {
      vm.error = null;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.meetingForm');
        if(!$("#datetimepicker1").find("input").val())
            $('#dateAndtimeContentArea').addClass('has-error');
        return false;
      }
      $('#dateAndtimeContentArea').removeClass('has-error');
      vm.meeting['dateAndTime'] = $("#datetimepicker1").find("input").val();

      vm.meeting['location'] = $('#meeting_Location').val()
      $http.post('/api/host/meeting', vm.meeting).success(function (response) {
          // saved successfully
          $('#host-meeting').closest('form').find("input[type=text], textarea").val("");
          $('#show-meeting-sharable-link-trigger').click();
          $('#sharableMeetingLink').text(response.url);
      }).error(function (error) {
        
        vm.error = error;
      });
    }
    
  }
}());
