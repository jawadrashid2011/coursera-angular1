(function() {
    'use strict';

    angular.module('LunchCheck', [])
    	.controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
    	$scope.lunchItems = "";
    	$scope.message = "";
    	$scope.textboxBorder = "no-border";

    	$scope.tooMuchButtonClicked = function() {
    		var items = $scope.lunchItems.split(",");
    		items = items.filter(item=>item.trim() != "");

    		if(items == "") {
    			$scope.message = "Please enter data first";
    			$scope.messageColor = "red";
    			$scope.textboxBorder = "red-border";
    			return;
    		}

    		if(items.length <= 3) {
    			$scope.message = "Enjoy!";
    		} else {
    			$scope.message = "Too much!";
    		}
    		$scope.messageColor = "green";
    		$scope.textboxBorder = "green-border";

    	};
    }
})();