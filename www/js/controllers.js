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

.controller('AthleteCtrl', function($scope, $stateParams, athleteService, $state) {
  $scope.athlete = athleteService.getSelectedAthlete();
  $scope.pitchin = function(amount) {
    $state.go("app.payments");

    console.log("You just pitched in " + amount);
  };
})

.controller('PaymentCtrl', function($scope, $stateParams, athleteService, $state, $http) {
  
  
  $http.get('http://5fe31957.ngrok.com/api/payments/token').success(function(data, status, headers, config) {
      console.log(typeof(data));

      var token = data; //"eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiIwNjRiMTAzMTUzOWNiN2NhODA3MTUxZGQ1MmFkOWE5Yjc4NTAwYTA5N2FiNmEzZDNlZWM2ZWUyZjIyNmQyZjY0fGNyZWF0ZWRfYXQ9MjAxNS0wNy0xOFQxOTo0MjozNC4zNTYwMjEyMDMrMDAwMFx1MDAyNm1lcmNoYW50X2lkPXc3N3NmcHN6Y2N5NnF2OTJcdTAwMjZwdWJsaWNfa2V5PWNxa2hmbXl6Zzc1enFjeGMiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvdzc3c2Zwc3pjY3k2cXY5Mi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL3c3N3NmcHN6Y2N5NnF2OTIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIn0sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsInRocmVlRFNlY3VyZSI6eyJsb29rdXBVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvdzc3c2Zwc3pjY3k2cXY5Mi90aHJlZV9kX3NlY3VyZS9sb29rdXAifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiUGluZWFwcGxlIEtpbmciLCJjbGllbnRJZCI6bnVsbCwicHJpdmFjeVVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS9wcCIsInVzZXJBZ3JlZW1lbnRVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vdG9zIiwiYmFzZVVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9jaGVja291dC5wYXlwYWwuY29tIiwiZGlyZWN0QmFzZVVybCI6bnVsbCwiYWxsb3dIdHRwIjp0cnVlLCJlbnZpcm9ubWVudE5vTmV0d29yayI6dHJ1ZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsIm1lcmNoYW50QWNjb3VudElkIjoiN3d5cHBuOGs3Z2RqaHB3dyIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJjb2luYmFzZUVuYWJsZWQiOmZhbHNlLCJtZXJjaGFudElkIjoidzc3c2Zwc3pjY3k2cXY5MiIsInZlbm1vIjoib2ZmIn0";
      braintree.setup(
          token, 
          "dropin",
          {
              container: "payment-form",              
            paymentMethodNonceReceived: function (event, nonce) {
              var payment = {
                sponsor: '55aad23932ccc99834bb902f',
                athlete: '55aad23a32ccc99834bb9031',
                status: 'requested',
                merchant_id: 'GIRKE_Nikola',
                payment_method_nonce: nonce,                
                amount: 100
              };
              console.log(payment);
              $http.post('http://5fe31957.ngrok.com/api/payments/', payment);
            }
          }
        );
      });
})
;
