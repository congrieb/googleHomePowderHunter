describe('DateHelper', function dateHelperTests(){
    var DateHelper = require('../lib/DateHelper');
    beforeEach(function() {
        dateHelper = new DateHelper();
    });

    describe('getDaysFromTodayFunction', function test(){
        
        it('should return 0 if the given date is today', function test(){
            var today = new Date();
            var differenceFromToday = dateHelper.getDaysFromToday(today);
            expect(differenceFromToday).toEqual(0);
        });

        it('should return 1 if the given date is tomorrow', function test(){
            var today = new Date();
            var tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1)
            var differenceFromToday = dateHelper.getDaysFromToday(tomorrow);
            expect(differenceFromToday).toEqual(1);
        });

        it('should return 9 if the given date is nine days from now', function test(){
            var today = new Date();
            var nineDays = new Date();
            nineDays.setDate(today.getDate() + 9)
            var differenceFromToday = dateHelper.getDaysFromToday(nineDays);
            expect(differenceFromToday).toEqual(9);
        });
    });
});