(function () {
  'use strict';

  angular
    .module('hosts')
    .controller('HostMeetupRegistrationController', HostMeetupRegistrationController);

  HostMeetupRegistrationController.$inject = ['$scope', 'Authentication', 'meetingResolve'];

  function HostMeetupRegistrationController($scope, Authentication, meeting) {
    var vm = this;
    vm.authentication = Authentication;
    vm.meeting = meeting;
    $scope.amount = vm.meeting.amount;
    $scope.userStripeId = vm.meeting.user.stripeData.stripe_user_id;
    $scope.meetingId = vm.meeting._id;
  }
}());
