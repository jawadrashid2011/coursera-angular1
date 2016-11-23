(function() {

'use strict';

angular.module('public')
.controller('MyInfoController', MyInfoController);


MyInfoController.$inject = ['SignupService']
function MyInfoController(SignupService) {
    var ctrl = this;

    ctrl.info = SignupService.getUserInfo();
} 


})();