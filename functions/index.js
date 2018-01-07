'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');
const DateHelper = require('./lib/dateHelper');
const ResponseHelper = require('./lib/responseHelper');


exports.PowderHunter = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));


// c. The function that generates the silly name
  function singleResort (app) {
    var snow = require('snow-forecast-sfr');
    var dateHelper = new DateHelper();
    var responseHelper = new ResponseHelper();
    var result;
    let resort_name = app.getArgument('resort_name');
    let day_specified = app.getArgument('date') || new Date();
    day_specified = new Date(day_specified);
    snow.parseResort(resort_name, 'mid', function(result){
        var indexOfDate = dateHelper.getDaysFromToday(day_specified);
        var snowAmount = result.forecast[indexOfDate].snow;
        app.tell('Looks like there will be ' + snowAmount + ' inches of snow at ' + result.name + ' ' + responseHelper.getDayPhrase(indexOfDate));
    });
  }

  function singleResortCumulative(app) {
    var snow = require('snow-forecast-sfr');
    var dateHelper = new DateHelper();
    var responseHelper = new ResponseHelper();
    let resort_name = app.getArgument('resort_name');
    let date_range = app.getArgument('date-period');
    let original_date_range = app.getArgument('date-period.original');
    snow.parseResort(resort_name, 'mid', function(result){
      var dateRange = dateHelper.convertDateRange(date_range);
      var indexOfStart = dateHelper.getDaysFromToday(dateRange.startDate);
      indexOfStart = indexOfStart >= 0 ? indexOfStart : 0;
      var indexOfEnd = dateHelper.getDaysFromToday(dateRange.endDate);
      var snowAmount = 0;
      for(var i = indexOfStart; i <= indexOfEnd; i++) {
        snowAmount += result.forecast[i].snow;
      }
      app.tell('Looks like there will be ' + snowAmount + ' inches of snow at ' + result.name + ' ' + request.body.result.contexts[0].parameters['date-period.original']);
    });
  }
  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set('single_resort', singleResort);
  actionMap.set('single_resort_cumulative', singleResortCumulative);


app.handleRequest(actionMap);
});