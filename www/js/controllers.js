angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, API) {

  // // With the new view caching in Ionic, Controllers are only called
  // // when they are recreated or on app start, instead of every page change.
  // // To listen for when this page is active (for example, to refresh data),
  // // listen for the $ionicView.enter event:
  // //$scope.$on('$ionicView.enter', function(e) {
  // //});

  // // Form data for the login modal
  // $scope.loginData = {};

  // // Create the login modal that we will use later
  // $ionicModal.fromTemplateUrl('templates/login.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });

  // // Triggered in the login modal to close it
  // $scope.closeLogin = function() {
  //   $scope.modal.hide();
  // };

  // // Open the login modal
  // $scope.login = function() {
  //   $scope.modal.show();
  // };

  // // Perform the login action when the user submits the login form
  // $scope.doLogin = function() {
  //   console.log('Doing login', $scope.loginData);

  //   API.authenticate($scope.loginData);
  //   $scope.closeLogin();
  // };
})

.controller('LoginCtrl', function($scope, API, $state) {

  // Form data for the login modal
  $scope.loginData = {};

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    API.authenticate($scope.loginData);
    $state.go('app.home');
  };
})

.controller('BrowseCtrl', function($scope) {
  $scope.images = [];

    $scope.loadImages = function() {
        for(var i = 0; i < 100; i++) {
            $scope.images.push({id: i, src: "http://placehold.it/50x50"});
        }
    };
})

.controller('AthletesCtrl', function(athletes, $scope, athleteService) {
  $scope.athletes = athletes;

  $scope.selectAthlete = function(athlete) {
    athleteService.selectAthlete(athlete);
  };
})

.controller('AthleteCtrl', function($scope, $stateParams, athleteService) {
  $scope.athlete = athleteService.getSelectedAthlete();
  $scope.pitchin = function(amount) {
    console.log("You just pitched in " + amount);
  };
});
