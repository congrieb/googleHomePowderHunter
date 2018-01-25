function ReportParseHelper() {
    this.mSecondPerDay = 1000 * 60 * 60 * 24;
}

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

module.exports = ReportParseHelper;