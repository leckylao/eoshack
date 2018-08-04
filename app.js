var bioApp = angular.module('bioApp', []);

bioApp.controller('submitCtrl', function ($scope) {
    // init
    $scope.categories = ['not selected','bird', 'cat', 'dog', 'mouse'];

    $scope.selectedCategory = $scope.categories[0];
    $scope.imageURL = null;
    $scope.name = null;
    $scope.userID = null;


    $scope.submit = function () {
        ACTIONS.submit()
    }

});