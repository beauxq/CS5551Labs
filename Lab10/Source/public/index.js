/**
 * JavaScript for index.html
 */

angular.module("lab10", [])

    .directive('enterPress', function () {
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
    })

    .controller("lab10Controller", function($scope, $http) {
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
            $scope.loginUsername = $scope.registerUsername;
            $scope.state = "login";
        };

        $scope.getInformationButtonClick = function() {
            console.log("button clicked");
            $http.get("thingInfo?thing=" + $scope.thing).then(function(response) {
                $scope.description = response.data.type;
                $scope.shortUrl = response.data.shortUrl;
            });
        };
    });
