'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');
const DateHelper = require('./lib/dateHelper');
const ResponseHelper = require('./lib/responseHelper');
const ReportParseHelper = require('./lib/reportParseHelper');


exports.PowderHunter = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));


// c. The function that generates the silly name
  function singleResort (app) {
    var snow = require('snow-forecast-sfr');
    var dateHelper = new DateHelper();
    var responseHelper = new ResponseHelper();
    var reportParseHelper = new ReportParseHelper();
    let resort_name = app.getArgument('resort_name');
    let day_specific = app.getArgument('date');
    let date_range = app.getArgument('date-period');
    // If we don't get any date or date range. Assume we are talking about today
    if(!day_specific && !date_range) {
      day_specific = new Date();
    }
    // If we got a specifc date convert it to a date-range format
    if(day_specific) {
      date_range = dateHelper.convertDateToDateRange(day_specific);
    }
    snow.parseResort(resort_name, 'top', function(result){
      var dateRange = dateHelper.convertDateRange(date_range);
      var indexOfStart = dateHelper.getDaysFromToday(dateRange.startDate);
      indexOfStart = indexOfStart >= 0 ? indexOfStart : 0;
      var indexOfEnd = dateHelper.getDaysFromToday(dateRange.endDate);
      var snowAmount = 0;
      var dailyForecast = reportParseHelper.makeReportDaily(result.forecast);
      for(var i = indexOfStart; i <= indexOfEnd; i++) {
        snowAmount += dailyForecast[i].snow;
      }
      app.tell('Looks like there will be ' + snowAmount + ' inches of snow at ' + result.name + ' ' + (request.body.result.contexts[0].parameters['date-period.original'] || responseHelper.getDayPhrase(indexOfStart)));
    });
  }

  function nextBigSnow (app) {
    var snow = require('snow-forecast-sfr');
    let resort_name = app.getArgument('resort_name');
    var reportParseHelper = new ReportParseHelper();
    var responseHelper = new ResponseHelper();
    snow.parseResort(resort_name, 'top', function(result) {
      var dailyForecast = reportParseHelper.makeReportDaily(result.forecast);
      var snowiestDay = reportParseHelper.findIndexOfMaxValue(dailyForecast, 'snow');
      var snowAmount = dailyForecast[snowiestDay].snow;

      app.tell(resort_name + 'will be getting ' + snowAmount + ' inches of snow ' + responseHelper.getDayPhrase(snowiestDay) + '. That looks like the best day to shred this week.');
    });
  }

  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set('single_resort', singleResort);
  actionMap.set('next_big_snow', nextBigSnow);


app.handleRequest(actionMap);
});