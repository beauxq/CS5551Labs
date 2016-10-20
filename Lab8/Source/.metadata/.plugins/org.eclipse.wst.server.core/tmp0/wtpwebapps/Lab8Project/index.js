/**
 * JavaScript for index.html
 */

angular.module("lab8", []).controller("lab8Controller", function($scope, $http) {
    $scope.title = "Lab 8";

    $scope.haveTime = false;
    $scope.hour = "0";
    $scope.minute = "00";
    $scope.second = "00";
    $http.get("lab8/timeservice").then(function(response) {
        $scope.hour = response.data.hour;
        $scope.minute = response.data.minute;
        $scope.second = response.data.second;
        $scope.haveTime = true;
    });

    $scope.note = "";
    $scope.haveFrequency = false; // change
    $scope.frequency = "0.00";
    $scope.getFrequency = function() {
        $http.get("lab8/notefrequency/" + $scope.note).then(function(response) {
            $scope.frequency = response.data.frequency;
            $scope.haveFrequency = true;
        });
    }
});
