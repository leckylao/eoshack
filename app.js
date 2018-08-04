var bioApp = angular.module('bioApp', ['ngRoute']);

bioApp.controller('jobsPageCtrl', function ($scope, $interval, $location) {
    var tableResult = ACTIONS.getTable();
    console.log('*** ');
    $interval(function () {
        result = ACTIONS.getTable();
        tableResult.then(function (result) {
            $scope.rows = result.rows;
            console.log(result.rows);
        });
    }, 1000, 0);

    $scope.verify = function (id) {
        $location.path('/expert/verify/id');
    }
});


bioApp.controller('requestPageCtrl', function ($scope, $interval, $location) {
    var tableResult = ACTIONS.getTable();
    console.log('*** ');
    $interval(function () {
        result = ACTIONS.getTable();
        tableResult.then(function (result) {
            $scope.rows = result.rows;
            console.log(result.rows);
        });
    }, 1000, 0);

    $scope.goToSubmit = function () {
        $location.path('/user/submit');
    }
});

bioApp.controller('submitCtrl', function ($scope, $location) {

    var myInput = document.getElementById('myFileInput');
    myInput.addEventListener('change', sendPic, false);
    function sendPic() {
        var file = myInput.files[0];

    }



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
        $location.path('/user/requests');
    };

    $scope.cancel = function () {
        $location.path('/user/requests');
    }

});

bioApp.controller('verifyCtrl', function ($scope, $location, $routeParams) {

    $scope.id = $routeParams.id;

    $scope.userSampleCategory = '';
    $scope.userSampleName = '';
    $scope.userSampleImage = '';
    $scope.userSampleLong = '';
    $scope.userSampleLat = '';

    $scope.nameStatus = 0;
    $scope.categoryStatus = 0;

    $scope.sampleName = '';
    $scope.categoryName = '';
    $scope.remark = '';

    ACTIONS.getTable().then(function (result) {
        $scope.$apply(function () {
            result.rows.forEach(function (row) {
                console.log('* got the row', row);
                $scope.userSampleCategory = row.sample_category;
                $scope.userSampleName = row.sample_name;
                $scope.userSampleImage = row.images[0];
                $scope.userSampleLong = row.longitude;
                $scope.userSampleLat = row.latitude;
                $scope.id = row.id;
            });
        });

    });

    // init
    $scope.categories = ['Not selected', 'bird', 'cat', 'dog', 'mouse'];
    $scope.selectedCategory = $scope.categories[0];

    $scope.longitude = '';
    $scope.latitude = '';

    // ACTIONS.verify($scope.id, $scope.sampleName, $scope.categoryName)




    $scope.submitVerify = function () {
        ACTIONS.verify($scope.id, $scope.sampleName, $scope.categoryName, $scope.remark);
    };

    $scope.cancelVerify = function () {

    };

});