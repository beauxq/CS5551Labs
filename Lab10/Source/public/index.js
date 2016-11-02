/**
 * JavaScript for index.html
 */

var ENDPOINT = "/data";
var READ_ENDPOINT = "/dataread";

var application = angular.module("lab10", []);

application.directive('enterPress', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.enterPress);
                });

                event.preventDefault();
            }
        });
    };
});

application.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});

application.controller("lab10Controller", function($scope, $http) {
    $scope.state = "start";

    $scope.startLoginButtonClick = function() {
        $scope.state = "login";
    };
    $scope.startRegisterButtonClick = function() {
        $scope.state = "reg";
    };

    $scope.loginLoginButtonClick = function() {
        $scope.homeUsername = $scope.loginUsername;

        var request1 = $http({
            method: 'POST',
            url: READ_ENDPOINT,
            data: {
                'query': {},  // everything
                'fields': {
                    'username': true,
                    'firstName': true,
                    'lastName': true
                }
            }
        });

        request1.success(function(data, status, headers, config) {
            $scope.userList = data.results;
            console.log(data);

            var request2 = $http.post(READ_ENDPOINT, {
                'query': {'username': $scope.homeUsername}  // user that logged in
            });

            request2.success(function(data, status, headers, config) {
                console.log("success for request2");
                console.log(data);
                if (data.results.length === 0) {
                    alert("invalid log in");
                    $scope.state = "start";
                }
                else {
                    $scope.userProfile = data.results[0];
                    $scope.state = "home";
                }
            });
            request2.error(function(data, status, headers, config) {
                alert("error retrieving your profile: " + JSON.stringify({data: data}));
                $scope.state = "start";
            });
        });
        request1.error(function(data, status, headers, config) {
            alert( "error getting user list: " + JSON.stringify({data: data}));
            $scope.state = "start";
        });
    };

    $scope.registerRegisterButtonClick = function() {
        if (! $scope.registerUsername) {
            return;
        }

        var dataParameters = {
            'username': $scope.registerUsername,
            'password': $scope.registerPassword,
            'firstName': $scope.registerFirstName,
            'lastName': $scope.registerLastName,
            'email': $scope.registerEmail
        };

        var request = $http.post(ENDPOINT, dataParameters);
        request.success(function(data, status, headers, config) {
            $scope.message = data;
            console.log(data);
            $scope.loginUsername = $scope.registerUsername;
            $scope.state = "login";
        });
        request.error(function(data, status, headers, config) {
            alert("error: " + data);
            $scope.state = "start";
        });
    };

    $scope.getInformationButtonClick = function() {
        console.log("button clicked");
        $http.get("thingInfo?thing=" + $scope.thing).then(function(response) {
            $scope.description = response.data.type;
            $scope.shortUrl = response.data.shortUrl;
        });
    };
});
