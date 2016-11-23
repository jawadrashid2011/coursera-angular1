(function() {

'use strict';

angular.module('common')
.service('SignupService', SignupService);

SignupService.$inject = [];
function SignupService() {
    var service = this;
    var userInfo = {};

    service.saveUserInfo = function(userInfo) {
        service.userInfo = userInfo;
    }

    service.getUserInfo = function() {
        return service.userInfo;
    }
}

})();