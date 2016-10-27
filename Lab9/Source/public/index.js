/**
 * JavaScript for index.html
 */

angular.module("lab9", [])

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

.controller("lab9Controller", function($scope, $http) {
    $scope.description = "";
    $scope.shortUrl = "#";
    $scope.thing = "";

    $scope.getInformationButtonClick = function() {
        console.log("button clicked");
        $http.get("thingInfo?thing=" + $scope.thing).then(function(response) {
            $scope.description = response.data.type;
            $scope.shortUrl = response.data.shortUrl;
        });
    };
});