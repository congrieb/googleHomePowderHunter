function DateHelper() {
    this.mSecondPerDay = 1000 * 60 * 60 * 24;
}

DateHelper.prototype.getDaysFromToday = function(dateIn) {
    var today = new Date();
    // Get rid of the time, since we only care about what day it is
    today.setHours(0, 0, 0, 0);
    var mSecondDiff = dateIn - today;
    return Math.floor(mSecondDiff / this.mSecondPerDay);
};

DateHelper.prototype.convertDateRange = function(rangeIn) {
    var splitDates = rangeIn.split('/');
    var startDate = splitDates[0];
    var endDate = splitDates[1];
    startDate = new Date(startDate);
    startDate = new Date( startDate.getTime() + (startDate.getTimezoneOffset() * 60000));
    endDate = new Date(endDate);
    endDate = new Date( endDate.getTime() + (endDate.getTimezoneOffset() * 60000));
    return {startDate: startDate, endDate: endDate};
};

DateHelper.prototype.convertDateToDateRange = function(dateIn) {
    return dateIn.toString() + '/' + dateIn.toString();
}

module.exports = DateHelper;