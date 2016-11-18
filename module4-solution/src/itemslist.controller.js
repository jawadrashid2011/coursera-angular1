(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsListController', ItemsListController);

ItemsListController.$inject = ['items', 'shortName'];
function ItemsListController(items, shortName) {
    var itemsList = this;

    itemsList.items = items;
    itemsList.shortName = shortName;
}

}) ();