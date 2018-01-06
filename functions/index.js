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
        app.tell('Looks like ' + result.name + ' got ' + snowAmount + ' inches of snow ' + responseHelper.getDayPhrase(indexOfDate));
    });
  }
  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set('single_resort', singleResort);


app.handleRequest(actionMap);
});