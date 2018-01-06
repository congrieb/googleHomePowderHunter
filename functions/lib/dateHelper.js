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

module.exports = DateHelper;