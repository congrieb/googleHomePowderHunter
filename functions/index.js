'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');


exports.PowderHunter = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));


// c. The function that generates the silly name
  function singleResort (app) {
    var snow = require('snow-forecast-sfr');
    var result;
    let resort_name = app.getArgument('resort_name');
    snow.parseResort(resort_name, 'mid', function(result){
        var snowAmount = result.forecast[0].snow;
        app.tell('Looks like ' + result.name + ' got ' + snowAmount + ' inches of snow today');
    });
  }
  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set('single_resort', singleResort);


app.handleRequest(actionMap);
});