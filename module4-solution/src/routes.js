(function () {
'use strict';

angular.module('MenuApp')
       .config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider']
function RoutesConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

    .state('home', {
        url: '/',
        templateUrl: 'src/templates/home.template.html'
    })
    
    .state('categories', {
        url: '/categories',
        templateUrl: 'src/templates/categorieslist.template.html',
        controller: 'CategoriesListController as categoriesList',
        resolve: {
            items: ['MenuDataService', function(MenuDataService) {
                return MenuDataService.getCategories();
            }]
        }  
    })
    
    .state('items', {
        url: '/items/{categoryShortName}',
        templateUrl: 'src/templates/itemslist.template.html',
        controller: 'ItemsListController as itemsList',
        resolve: {
            items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
                return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
            }],
            shortName: ['$stateParams', function($stateParams) {
                return $stateParams.categoryShortName;
            }]
        }  
    });

}

}) ();