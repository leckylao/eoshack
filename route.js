bioApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: function () {
                return 'submit.html';
            }
        })
        .when('/user/requests', {
            templateUrl: function () {
                return '/requests.html';
            }
        })
        .when('/user/submit', {
            templateUrl: function () {
                return '/submit.html';
            }
        })
        .when('/experts/jobs', {
            templateUrl: function () {
                return 'jobs.html';
            }
        })
        .when('/user/verify', {
            templateUrl: function () {
                return 'verify.html';
            }
        })
        .otherwise({
            redirectTo: '/'
        });
});