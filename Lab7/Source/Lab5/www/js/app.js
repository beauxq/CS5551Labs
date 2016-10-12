// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('lab5', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('appCtrl', function($scope, $http, $cordovaDevice, $ionicPlatform) {
  $scope.state = "login";

  $scope.loginUsername = "";
  $scope.loginPassword = "";
  $scope.loginButtonClick = function() {
    $scope.state = "home";
  };
  $scope.loginRegisterButtonClick = function() {
    $scope.state = "register";
  };

  $scope.registerUsername = "";
  $scope.registerPassword = "";
  $scope.registerName = "";
  $scope.registerEmail = "";
  $scope.registerButtonClick = function() {
    $scope.state = "login";
  };

  // load cordova device plugin information into scope
  $ionicPlatform.ready(function() {
    $scope.dPlatform = $cordovaDevice.getPlatform();
    $scope.dVersion = $cordovaDevice.getVersion();
    $scope.dModel = $cordovaDevice.getModel();
    $scope.dManufacturer = $cordovaDevice.getManufacturer();
  });

  $scope.homeInput = "";
  $scope.homeOutputLines = [];
  $scope.submitButtonClick = function() {
    $http.get("https://kgsearch.googleapis.com/v1/entities:search?query=" + $scope.homeInput + "&key=AIzaSyB5iB3hXTLR2JXODYudokbXLVa26tgi-cE&limit=1&indent=True")
      .then(function(response) {
        console.log(response);
        var description = response.data.itemListElement[0].result.description;
        var url = response.data.itemListElement[0].result.detailedDescription.url;
        console.log("url: " + url);
        $http.post("https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyB5iB3hXTLR2JXODYudokbXLVa26tgi-cE",
                   {"longUrl": url })
        .then(function(response2) {
          var shortUrl = response2.data.id;
          $scope.homeOutputLines.push($scope.homeInput + " is a " + description + ".");
          $scope.homeOutputLines.push("You can share this short url for more information:");
          $scope.homeOutputLines.push(shortUrl);
        });
      });
  };
});
