(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
    var service = this;

    service.getCategories = function() {
        return $http({
            method: 'GET',
            url: (ApiBasePath + "/categories.json")
        }).then(function(result) {
           return result.data;
        });
    };

    service.getItemsForCategory = function(categoryShortName) {
        return $http({
            method: 'GET',
            url: (ApiBasePath + "/menu_items.json"),
            params: {
                categoryShortName: categoryShortName
            }
        }).then(function(result) {
           return result.data.menu_items;
        });
    };
}

}) ();