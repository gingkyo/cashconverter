angular.module('convert.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('convertCtrl', function($scope,$http, $ionicModal,Countries,DateFactory) {

  $scope.setCountryLabels=function(){
    $scope.homeCountry=localStorage.getItem('home');
    $scope.homeFlag="img/flags/"+$scope.homeCountry+".jpg";
    $scope.convertCountry=localStorage.getItem('convertTo');
    $scope.convertFlag="img/flags/"+$scope.convertCountry+".jpg";
    $scope.homeCurrency=localStorage.getItem('homeCurrency');
    $scope.convertCurrency=localStorage.getItem('convertToCurrency');
  };
  /*Modal controller for country selection pop-up*/
  $scope.countries = Countries.all();

  $ionicModal.fromTemplateUrl('templates/country-list.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  $scope.countryOpen = function($option) {
    //$option param to show if convertCountry or homeCountry
    $scope.storageOption=$option;
    $scope.taskModal.show();
  };
  $scope.countryClose = function() {

    $scope.taskModal.hide();
    $scope.getXrate();
  };
  /*modal controller ends here*/
  $scope.selectCountry =function(country){
    var bindedLabel=$scope.storageOption;
    //id to check if selecting home or convertTo country
    localStorage.setItem(bindedLabel,country.name);
    localStorage.setItem(bindedLabel+'Currency',country.currency);
    $scope.setCountryLabels();
    $scope.countryClose();
  };
  $scope.getXrate=function(){
    if(Countries.checkCountriesSet()){
      //initial check to avoid undefined search
      if(Date.now()-localStorage.getItem('timestamp')>86400000|!localStorage.getItem('timestamp')|
      localStorage.getItem('homeCurrency')!=localStorage.getItem('base')){
        //this checks last update is >24 hrs ago as API is updated at 1500 daily

        $http.get("https://api.fixer.io/latest?base="
        +localStorage.getItem('homeCurrency')).then(function(resp) {
          localStorage.setItem('base',resp.data.base);
          //stores home currency
          localStorage.setItem('XRates',JSON.stringify(resp.data.rates));
          //all current rates stored for the home currency xRate
          var currentRates=JSON.parse(localStorage.getItem('XRates'));
          $scope.currentXrate=currentRates[$scope.convertCurrency];
          //updates Exchange rate to reflect correctly in realtime
          var date=new Date();
          //get current date and time
          var monthString=DateFactory.getMonthAsString(date.getMonth());
          var minutes=DateFactory.clockFormatter(date.getMinutes());
          var hours=DateFactory.clockFormatter(date.getHours());
          /*date formatted to readable format*/

          $scope.lastUpdate="lastUpdate:"+date.getDate()+" "+monthString+
          " "+hours+":"+minutes;
          //date labelled for user to show price is current
          localStorage.setItem('timestamp',Date.now());
          //date recorded as timestamp to avoid excess data calls to API
        }, function(err) {
          console.error('ERR', err);
        })
      } else{
         var currentRates=JSON.parse(localStorage.getItem('XRates'));
         $scope.currentXrate=currentRates[$scope.convertCurrency];
         /*called when homeCountry not changed - wrapped in "else" to avoid it
           outputting incorrect rate when home not changed*/
      }
    }//endif
  };
  $scope.calcConvert=function(convertAmount){
    if(!Countries.checkCountriesSet()){
      navigator.notification.alert("Need to set a home country and a country to convert to"
      , null, 'Error', 'Done');
    } else{
      $convertTotal=$scope.currentXrate*convertAmount;
      if(isNaN($convertTotal)){
        /*warning fired if xrate not set correctly or a letter is
        entered in error*/
        navigator.notification.alert("please enter a valid number", null, 'Error', 'Done');
      } else {
        $scope.calcTotal=convertAmount+$scope.homeCurrency+"="+
        $convertTotal+$scope.convertCurrency;
        //conversion calculation and output to user
      }
    }
  };
  /* runs at initial load - added at bottom to allow functions to load
  before they are called*/
  $scope.setCountryLabels();
  if(Countries.checkCountriesSet()){
    $scope.getXrate();
  }
})//end controller
.controller('accountCtrl', function($scope) {

});
