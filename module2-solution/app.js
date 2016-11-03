(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
           .controller('ToBuyController', ToBuyController)
           .controller('AlreadyBoughtController', AlreadyBoughtController)
           .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    
    
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.shoppingList = ShoppingListCheckOffService.getToBuyList();

        toBuy.buyItem = function(itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    }


    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var bought = this;

        bought.boughtList = ShoppingListCheckOffService.getBoughtList();
    }


    function ShoppingListCheckOffService() {
        var service = this;

        var toBuy = [
            { name: "Bread", quantity: 2},
            { name: "Chips", quantity: 6},
            { name: "Noodles", quantity: 8},
            { name: "Pizza", quantity: 1},
            { name: "Biscuits", quantity: 10},
            { name: "Candies", quantity: 50}
        ];
        var bought = [];

        service.getToBuyList = function() {
            return toBuy;
        };

        service.getBoughtList = function() {
            return bought;
        };

        service.buyItem = function(itemIndex) {
            var item = toBuy[itemIndex];

            bought.push(item);
            toBuy.splice(itemIndex, 1);
        };
    }

})();