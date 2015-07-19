angular.module('services', [])

.factory('API', function($http, $q) {
	var baseurl = "http://5fe31957.ngrok.com";
	return {
		authenticate: function(loginData) {
			return $http.post(baseurl + '/auth/local', { "email":loginData.email, "password":loginData.password })
			.then( function (response) {
				if(response.status === 200) {
					var authHeader = {headers:  {
					        'Authorization': 'Bearer ' + response.data.token
					    }
					};
					window.localStorage.setItem("authHeader", JSON.stringify(authHeader));

					return $http.get(baseurl + '/api/users/me',authHeader)
					.then(function (response) {
						if(response.status === 200) {
							window.localStorage.setItem("userMe", JSON.stringify(response.data));
							return response.data;
						}
					});
				}
				// else {
				// 	console.log(JSON.stringify(response));
				// }
			});
		},

		getAthletes: function() {
			var deferred = $q.defer();
			$http({
		        method: 'GET',
		        url: baseurl + '/api/users/athletes',
		        cache: false
		    }).success(function (data) {
		        deferred.resolve(data);
		    }).error(function (msg) {
		        deferred.reject(msg);
		    });

			return deferred.promise;
		},

		getMerchantData: function(merchantId) {
			var deferred = $q.defer();
			$http({
		        method: 'GET',
		        url: baseurl + '/api/payments/athleteMerchantId/' + merchantId,
		        cache: false
		    }).success(function (data) {
		        deferred.resolve(data);
		    }).error(function (msg) {
		        deferred.reject(msg);
		    });

			return deferred.promise;
		},

		me: function() {
			if(window.localStorage.getItem("userMe")) {
				return JSON.parse(window.localStorage.getItem("userMe"));
			}
		},

		authHeader: function() {
			if(window.localStorage.getItem("authHeader")) {
				return JSON.parse(window.localStorage.getItem("authHeader"));
			}
		}
	};
})

.service('athleteService', function() {
  var athlete = {};

  var selectAthlete = function(selectedAthlete) {
      athlete = selectedAthlete;
  };

  var getSelectedAthlete = function(){
      return athlete;
  };

  return {
    selectAthlete: selectAthlete,
    getSelectedAthlete: getSelectedAthlete
  };

});