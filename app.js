var bioApp = angular.module('bioApp', ['ngRoute']);

bioApp.controller('indexPageCtrl', function ($scope, $interval, $location) {
    $scope.goToProfile = function () {
        $location.path('/user/profile/');
    }

    $scope.goToSubmit = function () {
        $location.path('/user/submit/');
    }

    $scope.goToJobs = function () {
        $location.path('/expert/jobs/');
    }

    $scope.isActive = function (viewLocation){
      console.log(viewLocation, $location.path());
      return ( viewLocation === $location.path() );
    }
});

bioApp.controller('jobsPageCtrl', function ($scope, $interval, $location) {
    $scope.statusNames = ['','Pending','Rejected','Confirmed'];
    var tableResult = ACTIONS.getTable();
    console.log('*** ');
    $interval(function () {
        result = ACTIONS.getTable();
        tableResult.then(function (result) {
            $scope.rows = result.rows;
            console.log(result.rows);
        });
    }, 1000, 0);

    $scope.goToVerify = function (id) {
        $location.path('/expert/verify/' + id);
    }
});

bioApp.controller('requestPageCtrl', function ($scope, $interval, $location) {
    $scope.url = 'http://172.16.97.1:8000';
    $scope.statusNames = ['','Pending','Rejected','Confirmed'];
    var tableResult = ACTIONS.getTable();
    console.log('*** ');
    $interval(function () {
        result = ACTIONS.getTable();
        tableResult.then(function (result) {
            $scope.$apply(function () {
                $scope.rows = result.rows;
                console.log(result.rows);
            });

        });
    }, 1000, 0);

    $scope.goToSubmit = function () {
        $location.path('/user/submit');
    }
});

bioApp.controller('submitCtrl', function ($scope, $location) {
    var url = 'http://172.16.97.1:8000';
    var myInput = document.getElementById('myFileInput');
    myInput.addEventListener('change', sendPic, false);
    var formData = new FormData();
    $scope.fileName = null;
    $scope.imageURL = '';

    function sendPic() {
        var file = myInput.files[0];
        formData.append('file', file);

        fetch(url, {
            method: 'POST',
            body: formData
        }).then(response => {
            $scope.$apply(function () {
                $scope.fileName = url + '/' + file.name;
                $scope.imageURL = file.name;
            });
            console.log('** here is the response ', response);
        });
    }

    // init
    $scope.categories = ['Not selected', 'Birds', 'Amphibians', 'Reptiles', 'Mammals', 'Spiders, Mites and Ticks', "Mushrooms and Lichen", "Ferns, Mosses, Palms, Pines and Allies", "Centipedes, Millipedes and Allies", "Crawling and Hopping Insects", "Flying Insects and Ants", "Snails, Slugs, Octopuses, Squid, Mussels, Oysters, Scallops and Allies", "Crabs and Worms", "Starfish, Corals, Chitons and Sponges", "Flowering Plants", "Ray-finned Fishes"];

    $scope.selectedCategory = $scope.categories[0];

    $scope.name = '';
    $scope.userID = '';

    $scope.longitude = 151.199505;
    $scope.latitude = -33.872791;

    $scope.cancel = function () {
        $location.path('/user/requests');
    }
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

bioApp.controller('profilePageCtrl', function ($scope, $interval, $location){
  var result = eos.getAccount("alice1111111" );
  result.then(function (data){
    $scope.$apply(function(){
      $scope.data = data;
    })
  })
});

bioApp.controller('verifyCtrl', function ($scope, $location, $routeParams) {

    var url = 'http://172.16.97.1:8000';
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

                if(row.id == $scope.id){
                    console.log('* got the row', row);
                    $scope.userSampleCategory = row.sample_category;
                    $scope.userSampleName = row.sample_name;
                    $scope.userSampleImage = row.images[0];
                    $scope.userSampleLong = row.longitude;
                    $scope.userSampleLat = row.latitude;
                    $scope.id = row.id;


                    $scope.imageUrl = url + '/' + $scope.userSampleImage;
                    console.log('image url is', $scope.imageUrl);
                    console.log('* the imageurl is', $scope.imageUrl);
                    $scope.sampleName = $scope.userSampleName;
                    $scope.categoryName = $scope.userSampleCategory;
                }


            });
        });

    });


    $scope.submitVerify = function () {
        ACTIONS.verify($scope.id, ($scope.nameStatus == 1 && $scope.categoryStatus == 1) ? 1 : 0, $scope.sampleName, $scope.categoryName, $scope.remark);
        $location.path('/expert/jobs');
    };

    $scope.cancelVerify = function () {
        $location.path('/expert/jobs');
    };

});
