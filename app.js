var bioApp = angular.module('bioApp', ['ngRoute']);

bioApp.controller('requestPageCtrl', function ($scope, $interval, $location){
    var tableResult = ACTIONS.getTable();
    console.log('*** ');
    $interval(function () {
        result = ACTIONS.getTable();
        tableResult.then(function (result){
            $scope.rows = result.rows;
            console.log(result.rows);
        });
    }, 1000,0);

    $scope.goToSubmit = function () {
        $location.path('/user/submit');
    }
});

bioApp.controller('submitCtrl', function ($scope,$location) {
    // init
    $scope.categories = ['Not selected', 'Birds', 'Amphibians', 'Reptiles', 'Mammals', 'Spiders, Mites and Ticks', "Mushrooms and Lichen", "Ferns, Mosses, Palms, Pines and Allies", "Centipedes, Millipedes and Allies", "Crawling and Hopping Insects", "Flying Insects and Ants", "Snails, Slugs, Octopuses, Squid, Mussels, Oysters, Scallops and Allies", "Crabs and Worms", "Starfish, Corals, Chitons and Sponges", "Flowering Plants", "Ray-finned Fishes"];

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

        $location.path('/user/requests');

    }

    $scope.cancel = function () {
        $location.path('/user/requests');
    }

});

bioApp.controller('profilePageCtrl', function ($scope, $interval, $location){
  var result = eos.getAccount("alice1111111" );
  result.then(function (data){
    $scope.$apply(function(){
      $scope.data = data;
    })
  })
});
