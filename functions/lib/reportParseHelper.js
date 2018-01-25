function ReportParseHelper() {
    this.mSecondPerDay = 1000 * 60 * 60 * 24;
}

// Returns the index of the element in the array for which the element with "key" is the greatest
ReportParseHelper.prototype.findIndexOfMaxValue = function(array, key) {
    var maxValue = -1;
    var maxIndex = -1;
    for(var i = 0; i < array.length; i++) {
        if(i === 0) {
            maxValue = array[i][key];
            maxIndex = i;
        } else if(array[i][key] > maxValue) {
            maxValue = array[i][key];
            maxIndex = i;
        }
    }
    return maxIndex;
};

// Convert the forecast from having an array entry for morning noon and night everyday, to having one entry per day with that days snow total
ReportParseHelper.prototype.makeReportDaily = function(forecast) {
    var dailyForecast = [];
    for(var i = 0; i < forecast.length; i++) {
        if(i === 0 ) {
            dailyForecast.push(forecast[i]);
        } else if( dailyForecast[dailyForecast.length - 1].date === forecast[i].date) {
            dailyForecast[dailyForecast.length - 1].snow += forecast[i].snow;
        } else {
            dailyForecast.push(forecast[i]);
        }
    }
    return dailyForecast;
}

module.exports = ReportParseHelper;