
/* App Module */

angular.module('manage', ['inventoryFilters','inventoryServices']).
  config(['$routeProvider', function ($routeProvider) {
        var appRoot = '/js/app/';
        $routeProvider.
            when('/', { templateUrl: appRoot + 'home/partials/index.html', controller: HomeCtrl }).
            when('/categories', { templateUrl: appRoot + 'inventory/partials/categories.html', controller: CategoriesCtrl }).
            when('/category/:itemId', { templateUrl: appRoot + 'inventory/partials/categories-edit.html', controller: CategoryDetailCtrl }).
            when('/products/:categoryId', { templateUrl: appRoot + 'inventory/partials/products.html', controller: ProductsCtrl }).
            when('/products', { templateUrl: appRoot + 'inventory/partials/products.html', controller: ProductsCtrl }).
            when('/product/:itemId', { templateUrl: appRoot + 'inventory/partials/products-edit.html', controller: ProductDetailCtrl }).
            when('/attributes', { templateUrl: appRoot + 'inventory/partials/attributes.html', controller: AttributesCtrl }).
            when('/attribute/:itemId', { templateUrl: appRoot + 'inventory/partials/attributes-edit.html', controller: AttributeDetailCtrl }).
            when('/vendors', { templateUrl: appRoot + 'vendors/partials/index.html', controller: VendorsCtrl }).
            otherwise({ redirectTo: '/' });
  }]);

function checkAppState($scope, $http, $location){

    var stateOk = true;

    // are categories loaded?
    if(!app.cache.categories.items){
        stateOk = false;
    };

    // are attributes loaded?
    if(!app.cache.attributes.items){
        stateOk = false;
    };

    // if state is not ready, reload by going to main page
    if (!stateOk){
        $location.path('/');
    }
}

function init($scope, $http) {
    // initialize the app
    refreshCategories($scope, $http);
    // initialize the app
    refreshAttributes($scope, $http);
}

var states = [{"Label":"ALABAMA","Value":"AL"},{"Label":"ALASKA","Value":"AK"},{"Label":"ARIZONA","Value":"AZ"},{"Label":"ARKANSAS","Value":"AR"},{"Label":"CALIFORNIA","Value":"CA"},{"Label":"COLORADO","Value":"CO"},{"Label":"CONNECTICUT","Value":"CT"},{"Label":"DELAWARE","Value":"DE"},{"Label":"DISTRICT OF COLUMBIA","Value":"DC"},{"Label":"FLORIDA","Value":"FL"},{"Label":"GEORGIA","Value":"GA"},{"Label":"HAWAII","Value":"HI"},{"Label":"IDAHO","Value":"ID"},{"Label":"ILLINOIS","Value":"IL"},{"Label":"INDIANA","Value":"IN"},{"Label":"IOWA","Value":"IA"},{"Label":"KANSAS","Value":"KS"},{"Label":"KENTUCKY","Value":"KY"},{"Label":"LOUISIANA","Value":"LA"},{"Label":"MAINE","Value":"ME"},{"Label":"MARYLAND","Value":"MD"},{"Label":"MASSACHUSETTS","Value":"MA"},{"Label":"MICHIGAN","Value":"MI"},{"Label":"MINNESOTA","Value":"MN"},{"Label":"MISSISSIPPI","Value":"MS"},{"Label":"MISSOURI","Value":"MO"},{"Label":"MONTANA","Value":"MT"},{"Label":"NEBRASKA","Value":"NE"},{"Label":"NEVADA","Value":"NV"},{"Label":"NEW HAMPSHIRE","Value":"NH"},{"Label":"NEW JERSEY","Value":"NJ"},{"Label":"NEW MEXICO","Value":"NM"},{"Label":"NEW YORK","Value":"NY"},{"Label":"NORTH CAROLINA","Value":"NC"},{"Label":"NORTH DAKOTA","Value":"ND"},{"Label":"OHIO","Value":"OH"},{"Label":"OKLAHOMA","Value":"OK"},{"Label":"OREGON","Value":"OR"},{"Label":"PENNSYLVANIA","Value":"PA"},{"Label":"RHODE ISLAND","Value":"RI"},{"Label":"SOUTH CAROLINA","Value":"SC"},{"Label":"SOUTH DAKOTA","Value":"SD"},{"Label":"TENNESSEE","Value":"TN"},{"Label":"TEXAS","Value":"TX"},{"Label":"UTAH","Value":"UT"},{"Label":"VERMONT","Value":"VT"},{"Label":"VIRGINIA","Value":"VA"},{"Label":"WASHINGTON","Value":"WA"},{"Label":"WEST VIRGINIA","Value":"WV"},{"Label":"WISCONSIN","Value":"WI"},{"Label":"WYOMING","Value":"WY"}];

function refreshCategories($scope, $http, callback){
    $http.get('/categories/all').success(function (data) {
        $scope.categories = data;

        // save to cache
        app.cache.categories.items = $scope.categories;

        if(callback) {
            callback(data);
        }
    });
};

function refreshProducts($scope, $http, categoryId, callback){
    categoryId = categoryId && categoryId != 'null' ? categoryId : 'all';

    $http.get('/products/' + categoryId).success(function (data) {
        $scope.products = data;

        if(callback) {
            callback(data);
        }
    });
};

function refreshAttributes($scope, $http, callback){
    $http.get('/attributes/all').success(function (data) {
        $scope.attributes = data;

        // save to cache
        app.cache.attributes.items = $scope.attributes;

        if(callback) {
            callback(data);
        }
    });
};

function HomeCtrl($scope, $http, $location) {
    // initialize app
    init($scope, $http);
}

function ProductsCtrl($scope, $http, $location, $routeParams, ProductService) {
    // check app state
    checkAppState($scope, $http, $location);

    $scope.categoryId = $routeParams.categoryId;
    $scope.category = app.cache.categories.findById($scope.categoryId);
    $scope.categories = app.cache.categories.items;

    refreshProducts($scope, $http, $scope.categoryId, function(data){ $scope.products = data; });

    // prepare model for new category
    $scope.newItem = { category_ids: [$scope.categoryId]};

    $scope.addProduct = function () {

        if ($scope.form_item_new.$invalid) {
            // send alert..
            app.util.message('Invalid fields.', { placeholderId: '#new_item_messages', alertType: app.util.alertType.error() });
        } else {
            $http({ method: 'POST', url: '/products/add', data: $scope.newItem }).
                success(function (data, status, headers, config) {
                    refreshProducts($scope, $http, $scope.categoryId);
                    $location.path('/products/' + $scope.categoryId);
                    $('#mdl_new_item').modal('hide');
                    app.util.message('New product saved to database.', { alertType: app.util.alertType.success() });
                }).
                error(function (data, status, headers, config) {
                    console.log(data);
                    app.util.message('An error occurred.', { placeholderId: '#new_item_messages', alertType: app.util.alertType.error() });
                });
        }
    };

    $scope.changeCategory = function() {
        $location.path('/products/' + $scope.categoryId);
    };
}

function ProductDetailCtrl($scope, $http, $location, $routeParams, ProductService) {
    // check app state
    checkAppState($scope, $http, $location);

    var itemId = $routeParams.itemId;

    $scope.categories = [];
    $scope.attributes = [];

    // get data
    $http.get('/product/' + itemId).success(function (data) {
        $scope.product = data;

        // see which categories are selected
        _.each(app.cache.categories.items, function(item, i, list){
            $scope.categories.push(_.extend(item, { selected:_.contains($scope.product.category_ids, item._id) }));
        });

        // see which attributes are selected
        _.each(app.cache.attributes.items, function(item, i, list){
            $scope.attributes.push(_.extend(item, { selected:_.contains($scope.product.attribute_ids, item._id) }));
        });
    });

    $scope.deleteItem = function () {

        if (confirm('Are you sure?')) {
            $http({ method: 'DELETE', url: '/product/' + itemId }).
                success(function (data, status, headers, config) {
                    app.util.message('Product deleted.', { alertType: app.util.alertType.info() });
                    app.cache.categories.removeById(itemId);
                    $location.path('/products');
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with status
                    // code outside of the <200, 400) range
                });
        }
    };

    $scope.updateItem = function () {

        // category selection
        var selectedCategories = _.where($scope.categories, { selected: true });
        $scope.product.category_ids = [];

        _.each(selectedCategories, function(item, i, list){
            $scope.product.category_ids.push(item._id);
        });

        // attribute selection
        var selectedAttributes = _.where($scope.attributes, { selected: true });
        $scope.product.attribute_ids = [];

        _.each(selectedAttributes, function(item, i, list){
            $scope.product.attribute_ids.push(item._id);
        });

        if ($scope.form_item_edit.$invalid) {
            // do nothing..
        } else {
            $http({ method: 'PUT', url: '/product/' + itemId, data: $scope.product }).
                success(function (data, status, headers, config) {
                    app.util.message('Product updated.', { alertType: app.util.alertType.info() });
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with status
                    // code outside of the <200, 400) range
                });
        }
    };

    $scope.isCategorySelected = function(category){
        return true;
    }
}

function CategoriesCtrl($scope, $http, $location, CategoryService) {
    // initialize app
    checkAppState($scope, $http, $location);

    $scope.categories = app.cache.categories.items;

    // prepare model for new category
    $scope.newItem = {};

    $scope.addItem = function () {

        if ($scope.form_item_new.$invalid) {
            // send alert..
            app.util.message('Invalid fields.', { placeholderId: '#new_item_messages', alertType: app.util.alertType.error() });
        } else {
            $http({ method: 'POST', url: '/categories/add', data: $scope.newItem }).
                success(function (data, status, headers, config) {
                    refreshCategories($scope, $http);
                    $('#mdl_new_item').modal('hide');
                    app.util.message('New category saved to database.', { alertType: app.util.alertType.success() });
                }).
                error(function (data, status, headers, config) {
                    console.log(data);
                    app.util.message('An error occurred.', { placeholderId: '#new_item_messages', alertType: app.util.alertType.error() });
                });
        }
    };
}

function CategoryDetailCtrl($scope, $http, $location, $routeParams, CategoryService) {
    // check app state
    checkAppState($scope, $http, $location);

    var itemId = $routeParams.itemId;

    // get data
    $http.get('/category/' + itemId).success(function (data) {
        $scope.category = data;

        CategoryService.items = $scope.categories;
    });

    $scope.deleteItem = function () {

        if (confirm('Are you sure?')) {
            $http({ method: 'DELETE', url: '/category/' + itemId }).
                success(function (data, status, headers, config) {
                    app.util.message('Category deleted.', { alertType: app.util.alertType.info() });
                    app.cache.categories.removeById(itemId);
                    $location.path('/categories');
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with status
                    // code outside of the <200, 400) range
                });
        }
    };

    $scope.updateItem = function () {

        if ($scope.form_item_edit.$invalid) {
            // do nothing..
        } else {
            $http({ method: 'PUT', url: '/category/' + itemId, data: $scope.category }).
                success(function (data, status, headers, config) {
                    app.util.message('Category updated.', { alertType: app.util.alertType.info() });
                    refreshCategories($scope, $http);
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with status
                    // code outside of the <200, 400) range
                });
        }
    };
}

function AttributesCtrl($scope, $http, $location) {
    // check app state
    checkAppState($scope, $http, $location);

    $scope.attributes = app.cache.attributes.items;

    // prepare model for new category
    $scope.newItem = {};

    $scope.addItem = function () {

        if ($scope.form_item_new.$invalid) {
            // send alert..
            app.util.message('Invalid fields.', { placeholderId: '#new_item_messages', alertType: app.util.alertType.error() });
        } else {
            $http({ method: 'POST', url: '/attributes/add', data: $scope.newItem }).
                success(function (data, status, headers, config) {
                    refreshAttributes($scope, $http);
                    $('#mdl_new_item').modal('hide');
                    app.util.message('New attribute saved to database.', { alertType: app.util.alertType.success() });
                }).
                error(function (data, status, headers, config) {
                    console.log(data);
                    app.util.message('An error occurred.', { placeholderId: '#new_item_messages', alertType: app.util.alertType.error() });
                });
        }
    };
}

function AttributeDetailCtrl($scope, $http, $location, $routeParams, CategoryService) {
    // check app state
    checkAppState($scope, $http, $location);

    var itemId = $routeParams.itemId;

    // get data
    $http.get('/attribute/' + itemId).success(function (data) {
        $scope.attribute = data;
        $scope.attribute.options = $scope.attribute.options ? $scope.attribute.options.map(function(val){return {value:val};}) : [];

        $scope.showOptions = function(){
            return _.contains(['select-one','select-multiple'], $scope.attribute.input_type);

        };

        $scope.inputTypeChange = function(){
            $scope.showOptions
        };

        console.log($scope.attribute.options);
    });

    $scope.deleteItem = function() {

        if (confirm('Are you sure?')) {
            $http({ method: 'DELETE', url: '/attribute/' + itemId }).
                success(function (data, status, headers, config) {
                    app.util.message('Attribute deleted.', { alertType: app.util.alertType.info() });
                    app.cache.attributes.removeById(itemId);
                    $location.path('/attributes');
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with status
                    // code outside of the <200, 400) range
                });
        }
    };

    $scope.updateItem = function() {
        var optionValues = [];
        _.each($scope.attribute.options, function(item, i, list){
            optionValues.push(item.value);
        });
        $scope.attribute.options = optionValues;

        if ($scope.form_item_edit.$invalid) {
            // do nothing..
        } else {
            $http({ method: 'PUT', url: '/attribute/' + itemId, data: $scope.attribute }).
                success(function (data, status, headers, config) {
                    app.util.message('Attribute updated.', { alertType: app.util.alertType.info() });
                    refreshAttributes($scope, $http);
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with status
                    // code outside of the <200, 400) range
                });
        }
    };
}

function VendorsCtrl($scope, $http, $location) {
    // initialize app
    checkAppState($scope, $http, $location);

    // prepare model for new item
    !$scope.newItem ? $scope.newItem = { address: { country: 'USA' }, coordinates: { long: 0, lat: 0 }}:$scope.newItem;
    $scope.states = states;
    $scope.validation = { coordinates: false };

    $scope.setCoordinates = function(){
        alert('lat: ' + $scope.newItem.coordinates.lat + '\r\n' +
            'long: ' + $scope.newItem.coordinates.long);
    };

    $scope.loadCoordinates = function(){

        var full_address = $scope.newItem.address.street + " " +
            $scope.newItem.address.street2 + ", " +
            $scope.newItem.address.city + ", " +
            $scope.newItem.address.state + ", " +
            $scope.newItem.address.postal_code + ", " +
            $scope.newItem.address.country;

        var geoSvc = new locjs.geo.gmapsService();

        console.log(full_address);
        geoSvc.getGeoDataFromAddress(full_address, function(locationInfo){
            console.log(locationInfo);

            $scope.newItem.coordinates.lat = locationInfo.latitude;
            $scope.newItem.coordinates.long = locationInfo.longitude;

            $scope.validation.coordinates = locationInfo.latitude != 0 && locationInfo.longitude != 0;
        });

    };

    $scope.addItem = function () {

        if ($scope.form_item_new.$invalid) {
            // send alert..
            app.util.message('Invalid fields.', { placeholderId: '#new_item_messages', alertType: app.util.alertType.error() });
        } else {
            $http({ method: 'POST', url: '/vendors/add', data: $scope.newItem }).
                success(function (data, status, headers, config) {
                    $('#mdl_new_item').modal('hide');
                    app.util.message('New vendor saved to database.', { alertType: app.util.alertType.success() });
                }).
                error(function (data, status, headers, config) {
                    console.log(data);
                    app.util.message('An error occurred.', { placeholderId: '#new_item_messages', alertType: app.util.alertType.error() });
                });
        }
    };
}
