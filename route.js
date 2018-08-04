bioApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: function () {
                return 'requests.html';
            }
        })
        .when('/user/requests', {
            templateUrl: function () {
                return 'requests.html';
            }
        })
        .when('/user/submit', {
            templateUrl: function () {
                return 'submit.html';
            }
        })
        .when('/experts/jobs', {
            templateUrl: function () {
                return 'jobs.html';
            }
        })
        .when('/user/verify/:id', {
            templateUrl: function () {
                return 'verify.html';
            }
        })
        .otherwise({
            redirectTo: '/'
        });
});