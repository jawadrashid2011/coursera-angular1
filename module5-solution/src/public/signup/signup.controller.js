(function() {
"use strict";

angular.module('public')
    .controller('SignupController', SignupController);

SignupController.$inject = ['MenuService', 'SignupService']
function SignupController(MenuService, SignupService) {
    var $ctrl = this;

    $ctrl.user = {};
    $ctrl.favoriteDish = {};
    $ctrl.menuItemValid = true;
    $ctrl.informationSaved = false;

    $ctrl.submit = function() {
        $ctrl.menuItemValid = true;
        $ctrl.informationSaved = false;
        if($ctrl.user.favdish != "" && $ctrl.user.favdish != undefined) {
            MenuService.getMenuItems().then(function(response) {
                var items = response.menu_items;
                var found = false;
                
                items.forEach(function(item) {
                    if(item.short_name == $ctrl.user.favdish) {
                        found = true;
                        $ctrl.favoriteDish = item;
                    }
                }, this);

                if(found) {
                    $ctrl.saveUserInfo();
                } else {
                    $ctrl.menuItemValid = false;
                }
            });
        } else {
            $ctrl.saveUserInfo();
        }
    }

    $ctrl.saveUserInfo = function() {
        $ctrl.user.favoriteDishObj = $ctrl.favoriteDish;
        SignupService.saveUserInfo($ctrl.user);

        $ctrl.informationSaved = true;
    }
}

})();