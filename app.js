var bioApp = angular.module('bioApp', []);

bioApp.controller('submitCtrl', function ($scope) {
    // init
    $scope.categories = ['Not selected', 'bird', 'cat', 'dog', 'mouse'];

    $scope.selectedCategory = $scope.categories[0];
    $scope.imageURL = '';
    $scope.name = '';
    $scope.userID = '';

    $scope.longitude = '';
    $scope.latitude = '';


    $scope.submit = function () {
        console.log('action has been sent');

        console.log($scope.userID,
            $scope.longitude,
            $scope.latitude,
            $scope.name,
            $scope.selectedCategory,
            $scope.imageURL);


        ACTIONS.submit(
            $scope.userID,
            $scope.longitude,
            $scope.latitude,
            $scope.name,
            $scope.selectedCategory,
            $scope.imageURL);
    }

});