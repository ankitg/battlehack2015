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

.controller('AthletesCtrl', function($scope, athleteService) {
  $scope.athletes = [
    { name: 'HONDERICH Rachel', id: 1, description: "Competed at 2014 Commonwealth Games. 2014 Pan Am badminton championships: first in teams, second in singles. Started playing badminton at age seven. Hopes to work as a chiropractor in the future", provider: "local", email:"",
     userType:"Athlete", profile_pic: "/img/HONDERICH_Rachel.jpg", events:{}, sport_type:"Badminton",
     media:[{type:"youtube", url:"https://www.youtube.com/embed/udTCUNDqKWI"}]},

    { name: 'VON MARTELS Christopher', id: 2, description: "Second at 2014 FEI Nations Cup in Wellington, United States. Von Martels and his family own Von Martels Dressage Inc. a provider of dressage horses for competitive riders", provider: "local", email:"" ,
     userType:"Athlete", profile_pic: "/img/VON_MARTELS_Christopher.jpg", events:{}, sport_type:"Equestrian",
     media:[{type:"youtube", url:"https://www.youtube.com/embed/dc_CcpVrgkE"}]},

    { name: 'CONNELLY Austin', id: 3, description: "Competed at 2015 AT&T Byron Nelson Championship.First at 2014 Junior Ryder Cup in Scotland. Education: University of Arkansas – Fayetteville, Ark. “My goal is to be the No. 1 player in the world. As a little kid, I didn’t want to be the No. 1 amateur in the world. I don’t have any more goals in amateur golf.” (Halifax Chronicle Herald, May 13, 2015)", provider: "local", email:"",
     userType:"Athlete", profile_pic: "/img/CONNELLY_Austin.jpg", events:{}, sport_type:"Golf",
   media:[{type:"youtube", url:"https://www.youtube.com/embed/GVUoLpX47MA"}]},

    { name: 'BALFOUR Jevon', id: 4, description: "Second in freestyle -65 kg at 2014 Glasgow Commonwealth Games. Competed at 2014 world junior wrestling championships. First in team at 2014 Canadian university wrestling championships. Education: Brock University — St. Catharines, Ont. Started wrestling at age 15", provider: "local", email:"",
     userType:"Athlete", profile_pic: "/img/BALFOUR_Jevon.jpg", events:{}, sport_type:"Wrestling",
   media:[{type:"youtube", url:"https://www.youtube.com/embed/sc97IrowZWw"}]},

    { name: 'GIRKE Nikola', id: 5, description: "Competed in RS:X at Guadalajara 2011 Pan Am Games. Competed in RS:X at Athens 2004 Olympic Games. Competed in windsurfing at Beijing 2008 and London 2012 Olympic Games. Competed in RS:X at 2012 world sailing championship. Named Female Sailor of the Year by Canadian Yachting Association's in 2001, 2004, 2009 and 2012", provider: "local", email:"",
     userType:"Athlete", profile_pic: "/img/GIRKE_Nikola.jpg", events:{}, sport_type:"Sailing",
   media:[{type:"youtube", url:"https://www.youtube.com/embed/g3iPy9MgrVQ"}]},

    { name: 'HAYWARD Ben', id: 6, description: "Edmonton, Alberta", provider: "local", email:"",
     userType:"Athlete", profile_pic: "/img/HAYWARD_Ben.jpg", events:{}, sport_type:"Canoeing Slalom",
   media:[{type:"youtube", url:"https://www.youtube.com/embed/uHf953ZlQ7w"}]}
  ];

  $scope.selectAthlete = function(athlete) {
    athleteService.selectAthlete(athlete);
  };
})

.controller('AthleteCtrl', function($scope, $stateParams, athleteService) {
  $scope.athlete = athleteService.getSelectedAthlete();
});
