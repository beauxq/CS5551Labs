describe('appCtrl', function(){
  var scope;  // we'll use this in our tests

  //mock Application to allow us to inject our own dependencies
  beforeEach(angular.mock.module('lab5'));
  //mock the controller for the same reason and include $rootScope and $controller
  beforeEach(angular.mock.inject(function($rootScope, $controller){

    //create an empty scope
    scope = $rootScope.$new();
    //declare the controller and inject our empty scope
    $controller('appCtrl', {$scope: scope});
  }));
  // tests start here
  it('should have beginning state "login"', function(){
    expect(scope.state).toBe('login');
  });
  it('should change the state to "register" when register button is clicked on login screen', function(){
    scope.loginRegisterButtonClick();
    expect(scope.state).toBe('register');
  });
  it('should change the state back to "login" when register button is clicked on the register screen', function(){
    scope.registerButtonClick();
    expect(scope.state).toBe('login');
  });
});
