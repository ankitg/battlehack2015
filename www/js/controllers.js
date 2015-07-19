angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, API) {
})


.controller('LoginCtrl', function($scope, API, $state, $pusher) {

  // Form data for login
  $scope.loginData = {};

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
//    console.log('Doing login', $scope.loginData);

    API.authenticate($scope.loginData).then( function(auth) {
      $state.go('app.athletes');
    });
  };
})

.controller('HomeCtrl', function($scope, API) {
  $scope.me = API.me();

  var sum = 0;
  for(var i=0; i<$scope.me.campaigns.length; i++) {
    sum += parseInt($scope.me.campaigns[i].amount);
    console.log($scope.me.campaigns[i].amount);
  }

  $scope.totalSponsored = sum;
})

.controller('AthletesCtrl', function(athletes, $scope, athleteService, $pusher, API, ionicToast) {
  $scope.athletes = athletes;

    var client = new Pusher('2b63159ac74d5e9407db');
    var pusher = $pusher(client);
    if($scope.messages === undefined) {
      $scope.messages = [];
    }

    if(API.me().merchant_id !== undefined) {
    var channel = pusher.subscribe(API.me().merchant_id);
      channel.bind('sponsor_event', function(data) {
        console.log(data.message);
        // $scope.messages.push(data.message);
        ionicToast.show(data.message, 'bottom', false, 2500);
      });
    }

  $scope.selectAthlete = function(athlete) {
    athleteService.selectAthlete(athlete);
  };
})
.controller('AthleteCtrl', function($scope, $stateParams, athleteService, $state, $pusher, API) {
  // populate selected athlete is missing
  if( Object.keys(athleteService.getSelectedAthlete()).length === 0)
  {
    var athlete = {"name":"GIRKE Nikola","description":"Competed in RS:X at Guadalajara 2011 Pan Am Games. Competed in RS:X at Athens 2004 Olympic Games. Competed in windsurfing at Beijing 2008 and London 2012 Olympic Games. Competed in RS:X at 2012 world sailing championship. Named Female Sailor of the Year by Canadian Yachting Associations in 2001, 2004, 2009 and 2012","provider":"local","email":"test5@test.com","hashedPassword":"UUL+0FLnO7hQ+NkjVOp8dJZ9r3Ar55M2d1hd0P4Vnky5iW7YkxpTP7aw4rBtMQieq2EQCek1aiQ1SkEF8suiIA==","salt":"P1gNojG3FORdlJqFR2wYYw==","user_type":"Athlete","profile_pic":"img/GIRKE_Nikola.jpg","sport_type":"Sailing","merchant_id":"GIRKE_Nikola","feature_score":"100","_id":"55ab69190c788db02a694d57","__v":0,"campaigns":[],"media":[{"type":"youtube","url":"https://youtu.be/g3iPy9MgrVQ"},{"type":"image","url":"https://hitthewave.files.wordpress.com/2014/12/nikola-girke-posing.jpg?w=500&h=355"}],"events":[],"role":"user"};
    athleteService.selectAthlete(athlete);
  }

  $scope.athlete = athleteService.getSelectedAthlete();
  $scope.sponsors = [];

  var client = new Pusher('2b63159ac74d5e9407db');
  var pusher = $pusher(client);
  if($scope.messages === undefined) {
    $scope.messages = [];
  }

  API.getMerchantData($scope.athlete.merchant_id).then(function(transactions) {
    transactions.forEach(function(transaction) {
      if(transaction.sponsor.logo){
        $scope.sponsors.push(transaction.sponsor);
      }
    });
  });

  $scope.pitchin = function(amount) {
    console.log("You just pitched in " + amount);
    $state.go("app.payments", {amount:amount});
  };
})

.controller('PaymentCtrl', function($scope, $stateParams, API, athleteService, $state, $ionicHistory, $http) {
  var athlete = athleteService.getSelectedAthlete(); console.log(athlete);
  var me = API.me(); console.log(me);
  var amount = $stateParams.amount; console.log(amount);

  $scope.athlete = athlete;
  $scope.amount = amount;

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
                sponsor: me,
                athlete: athlete._id,
                status: 'requested',
                merchant_id: athlete.merchant_id,
                payment_method_nonce: nonce,
                amount: amount
              };
              console.log(payment);
              $http.post('http://5fe31957.ngrok.com/api/payments/', payment).success(function(data){
                console.log(data);
                if(data.status === 'processed') {
                  $ionicHistory.goBack();
                }
              });
            }
          }
        );
      });
});
