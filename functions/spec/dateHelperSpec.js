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

        it('should return -1 if the given date is yesterday', function test(){
            var today = new Date();
            var yesterday = new Date();
            yesterday.setDate(today.getDate() - 1)
            var differenceFromToday = dateHelper.getDaysFromToday(yesterday);
            expect(differenceFromToday).toEqual(-1);
        });
    });

    describe('convertDateRange', function test(){
        it('should return an object with a startDate property equal to the first date before the slash from the input', function test(){
            var input = '2017-12-31/2018-01-06';
            var expectedStart = new Date(2017, 11, 31, 0, 0, 0, 0);
            var result = dateHelper.convertDateRange(input);
            expect(result.startDate).toEqual(expectedStart);
        });

        it('should return an object with a endDate property equal to the first date after the slash from the input', function test(){
            var input = '2017-12-31/2018-01-06';
            var expectedEnd = new Date(2018, 0, 6, 0, 0, 0, 0);
            var result = dateHelper.convertDateRange(input);
            expect(result.endDate).toEqual(expectedEnd);
        });
    });
});