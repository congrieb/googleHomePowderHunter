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
    let resort_name = app.getArgument('resort_name');
    let day_specific = app.getArgument('date');
    let date_range = app.getArgument('date-period');
    // If we don't get any date. Assume we are talking about today
    if(!day_specific && !date_range) {
      day_specific = new Date();
    }
    // If we got a specifc date convert it to a date-range format
    if(day_specific) {
      date_range = dateHelper.convertDateToDateRange(day_specific);
    }
    snow.parseResort(resort_name, 'mid', function(result){
      var dateRange = dateHelper.convertDateRange(date_range);
      var indexOfStart = dateHelper.getDaysFromToday(dateRange.startDate);
      indexOfStart = indexOfStart >= 0 ? indexOfStart : 0;
      var indexOfEnd = dateHelper.getDaysFromToday(dateRange.endDate);
      var snowAmount = 0;
      for(var i = indexOfStart; i <= indexOfEnd; i++) {
        snowAmount += result.forecast[i].snow;
      }
      app.tell('Looks like there will be ' + snowAmount + ' inches of snow at ' + result.name + ' ' + (request.body.result.contexts[0].parameters['date-period.original'] || responseHelper.getDayPhrase(indexOfStart)));
    });
  }
  
  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set('single_resort', singleResort);


app.handleRequest(actionMap);
});