/**
 * JavaScript for index.html
 */

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
        /*

         console.log($scope.formData.lname);
         console.log($scope.formData.fname);
         console.log($scope.formData.email);
         console.log($scope.formData.password);
         console.log($scope.formData.cpassword);
         var dataParams = {
         'fname' : $scope.fname,
         'lname' : $scope.lname,
         'email' : $scope.email,
         'pw' : $scope.pw
         };
         var config = {
         headers : {
         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
         }
         }
         var req = $http.post('http://127.0.0.1:8081/register',$scope.formData);
         req.success(function(data, status, headers, config) {
         $scope.message = data;
         console.log(data);
         });
         req.error(function(data, status, headers, config) {
         alert( "failure message: " + JSON.stringify({data: data}));
         });
         */

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
