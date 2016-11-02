/**
 * JavaScript for index.html
 */

var ENDPOINT = "/data";

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


        $scope.state = "home";
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
