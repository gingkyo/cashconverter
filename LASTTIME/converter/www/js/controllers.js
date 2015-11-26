angular.module('convert.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('convertCtrl', function($scope,$http, $ionicModal,Countries) {

  $scope.homeCountry=localStorage.getItem('homeCountryName');
  $scope.convertCountry=localStorage.getItem('convertCountryName');
  $scope.homeCurrency=localStorage.getItem('homeCountryCurrency');
  $scope.convertCurrency=localStorage.getItem('convertCountryCurrency');
  $scope.countries = Countries.all();

  $ionicModal.fromTemplateUrl('templates/country-list.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  //
  // // Called when the form is submitted
  // $scope.createTask = function(task) {
  //   $scope.tasks.push({
  //     title: task.title
  //   });
  //   $scope.taskModal.hide();
  //   task.title = "";
  // };

  // Open our new task modal
  $scope.countryOpen = function($option) {
    //PASS PARAM TO THIS TO ID IF CONVERTCNTRY OR HOMECNTRY
    $scope.storageOption=$option;

    $scope.taskModal.show();
  };
  $scope.countryClose = function() {
    $scope.taskModal.hide();
  };
  $scope.selectCountry =function($country){
    $bindedLabel=$scope.storageOption;
    localStorage.setItem($bindedLabel+'Name',$country.name);
    localStorage.setItem($bindedLabel+'Currency',$country.currency);
    $scope.homeCountry=localStorage.getItem('homeCountryName');
    $scope.convertCountry=localStorage.getItem('convertCountryName');
    $scope.homeCurrency=localStorage.getItem('homeCountryCurrency');
    $scope.convertCurrency=localStorage.getItem('convertCountryCurrency');

    $scope.taskModal.hide();
    //$scope.$bindedLabel=$country.name;
  };
  $scope.getXrate=function(){

      $http.get("https://api.fixer.io/latest?base="
      +$scope.homeCurrency+"&symbols="
      +$scope.convertCurrency).then(function(resp) {
          $scope.currentXrate = //$scope.homeCurrency+"-->"+$scope.convertCurrency+"="+
          resp.data.rates[$scope.convertCurrency];
        }, function(err) {
          console.error('ERR', err);
        })
   };
        $scope.calcConvert=function(convertAmount){
            $scope.amountInput=convertAmount;
            $scope.calcTotal=$scope.currentXrate*convertAmount;
        }
})
.controller('weatherCtrl', function($scope) {

})
.controller('accountCtrl', function($scope) {
   $scope.settings = {
     enableFriends: true
   };
});
