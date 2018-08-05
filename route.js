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
        .when('/expert/jobs', {
            templateUrl: function () {
                return 'jobs.html';
            }
        })
        .when('/expert/verify/:id', {
            templateUrl: function () {
                return 'verify.html';
            }
        })
        .when('/user/requests/:id', {
            templateUrl: function () {
                return 'show.html';
            }
        })
        .when('/user/profile', {
            templateUrl: function () {
                return 'profile.html';
            }
        })
        .when('/user/leaderboard', {
            templateUrl: function () {
                return 'leaderboard.html';
            }
        })
        .otherwise({
            redirectTo: '/'
        });
});
