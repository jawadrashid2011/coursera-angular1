(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
    		.controller('NarrowItDownController', NarrowItDownController)
    		.service('MenuSearchService', MenuSearchService)
    		.constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com')
    		.directive('foundItems', FoundItems);

    
    function FoundItems() {
    	var ddo = {
    		templateUrl: 'foundItems.html',
    		restrict: 'E',
    		scope: {
    			found: '<',
    			onRemove: '&'
    		}
    	};
    	return ddo;
    }


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
    	var narrowCtrl = this;

    	narrowCtrl.searchTerm = "";
    	narrowCtrl.errorMessage = "";
    	narrowCtrl.found = [];

    	narrowCtrl.narrowDownResults = function() {
            narrowCtrl.found = [];
    		if(narrowCtrl.searchTerm.trim() == "") {
    			narrowCtrl.errorMessage = "Nothing found";
    			return;	
    		}
    		var promise = MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm);

    		promise.then(function(items) {
    			narrowCtrl.found = items;
    			if(items.length == 0) {
    				narrowCtrl.errorMessage = "Nothing found";
    				return;
    			}

    			narrowCtrl.errorMessage = "";
    		})
    		.catch(function(error) {
    			narrowCtrl.errorMessage = "Nothing found";
    		});
    	};

    	narrowCtrl.removeItem = function(index) {
    		narrowCtrl.found.splice(index, 1);
    	};
    };


    MenuSearchService.$inject = ['$http', 'ApiBasePath']
    function MenuSearchService($http, ApiBasePath) {
    	var service = this;

    	service.getMatchedMenuItems = function(searchTerm) {
    		return $http({
    			method: 'GET',
    			url: (ApiBasePath + "/menu_items.json")
    		}).then(function(result) {
    			var menuItems = result.data.menu_items;
    			var foundItems = [];

    			for (var i = 0; i < menuItems.length; i++) {
    				var menuItem = menuItems[i];
    				if(menuItem.description.search(searchTerm) !== -1) {
    					foundItems.push(menuItem);
    				}
    			};

    			return foundItems;
    		});

    	};


    }

})();