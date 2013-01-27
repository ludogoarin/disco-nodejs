'use strict';

/* Services */

angular.module('inventoryServices', []).
    factory('CategoryService', function () {
        return { items: null };
    }).
    factory('ProductService', function () {
        return { items: null };
    });
