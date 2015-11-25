angular.module('convert.services', [])

.factory('Countries', function() {

  var countries=[
    {id: 0,name:"Australia",currency:"AUD"},
    {id: 1,name:"Bulgaria",currency:"BGN"},
    {id: 2,name:"Brazil",currency:"BRL"},
    {id: 3,name:"Canada",currency:"CAD"},
    {id: 4,name:"Switzerland",currency:"CHF"},
    {id: 5,name:"China",currency:"CNY"},
    {id: 6,name:"Czech Republic",currency:"CZK"},
    {id: 7,name:"Denmark",currency:"DKK"},
    {id: 8,name:"Euro",currency:"EUR"},
    {id: 9,name:"United Kingdom",currency:"GBP"},
    {id: 10,name:"Hong Kong",currency:"HKD"},
    {id: 11,name:"Croatia",currency:"HRK"},
    {id: 12,name:"Hungary",currency:"HUF"},
    {id: 13,name:"Indonesia",currency:"IDR"},
    {id: 14,name:"Israel",currency:"ILS"},
    {id: 15,name:"India",currency:"INR"},
    {id: 16,name:"Japan",currency:"JPY"},
    {id: 17,name:"South Korea",currency:"KRW"},
    {id: 18,name:"Mexico",currency:"MXN"},
    {id: 19,name:"Malaysia",currency:"MYR"},
    {id: 20,name:"Norway",currency:"NOK"},
    {id: 21,name:"New Zealand",currency:"NZD"},
    {id: 22,name:"Philippines",currency:"PHP"},
    {id: 23,name:"Poland",currency:"PLN"},
    {id: 24,name:"Romania",currency:"RON"},
    {id: 25,name:"Russia",currency:"RUB"},
    {id: 26,name:"Sweden",currency:"SEK"},
    {id: 27,name:"Singapore",currency:"SGD"},
    {id: 28,name:"Thailand",currency:"THB"},
    {id: 29,name:"Turkey",currency:"TRY"},
    {id: 30,name:"USA",currency:"USD"},
    {id: 31,name:"South Africa",currency:"ZAR"}
  ];

  return {
    all: function() {
      return countries;
    },
    remove: function(country) {
      countries.splice(countries.indexOf(country), 1);
    },
    get: function(countryId) {
      for (var i = 0; i < countries.length; i++) {
        if (countries[i].id === parseInt(countryId)) {
          return countries[i];
        }
      }
      return null;
    },
    checkCountriesSet: function(){
      if( !localStorage['home'] |
      !localStorage['convertTo']){
        return false;
      }
      return true;
    }
  };
})
.factory ('DateFactory',function(){
  var monthNames =[ "January",  "February",  "March",
  "April",  "May",  "June",  "July",  "August",
  "September",  "October",  "November",  "December"  ];
  return {
    getMonthAsString: function(index) {
      return monthNames[index];
    },
    clockFormatter: function(minute){
       if(minute<10){
         return "0"+minute;
       }
       return minute;
    }
  };
});
