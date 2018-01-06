function ResponseHelper() {
    this.daysOfWeek = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
}

ResponseHelper.prototype.getDayPhrase = function (daysFromToday) {
    if(daysFromToday === 0) {
        return 'today';
    } else if( daysFromToday === 1) {
        return 'tomorrow';
    } else if( daysFromToday > 1 && daysFromToday < 7) {
        var date = new Date();
        date.setDate(date.getDate() + daysFromToday);
        return 'on ' + this.daysOfWeek[date.getDay()];
    } else {
        return daysFromToday + ' days from now'
    }
};

module.exports = ResponseHelper;