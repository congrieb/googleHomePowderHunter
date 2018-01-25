describe('reportParseHelper', function test(){
    var ReportParseHelper = require('../lib/ReportParseHelper');
    beforeEach(function() {
        reportParseHelper = new ReportParseHelper();
    });

    describe('findIndexOfMaxValue', function test(){
        it('should return the index of the entry with the greatest value for the given key', function test(){
            var report = [{snow: 1}, {snow: 2}, {snow: 3}];

            var snowiestDay = reportParseHelper.findIndexOfMaxValue(report, 'snow');

            expect(snowiestDay).toEqual(2);
        });

        it('should return the first index of the max if there are 2 entries with the same value', function test(){
            var report = [{snow: 1}, {snow: 2}, {snow: 2}];

            var snowiestDay = reportParseHelper.findIndexOfMaxValue(report, 'snow');

            expect(snowiestDay).toEqual(1);

        });

        it('should return 0 if there is only 1 item in the array', function test(){
            var report = [{snow: 1}];

            var snowiestDay = reportParseHelper.findIndexOfMaxValue(report, 'snow');

            expect(snowiestDay).toEqual(0);
        });

        it('should return -1 if the array is empty', function test(){
            var report = [];

            var snowiestDay = reportParseHelper.findIndexOfMaxValue(report, 'snow');

            expect(snowiestDay).toEqual(-1);
        })
    });

    describe('makeReportDaily', function test() {
        it('should combine any reports from the same date into one array entry', function test(){
            var forecast = [{date: '12/21/1987', snow: 1}, {date: '12/21/1987', snow: 2}, {date: '12/21/1987', snow: 3}, {date: '12/22/1987', snow: 3}];

            var result = reportParseHelper.makeReportDaily(forecast);

            expect(result.length).toEqual(2);
        });

        it('should sum the snow for all entries with the same date', function test(){
            var forecast = [{date: '12/21/1987', snow: 1}, {date: '12/21/1987', snow: 2}, {date: '12/21/1987', snow: 3}];

            var result = reportParseHelper.makeReportDaily(forecast);

            expect(result[0].snow).toEqual(6);
        });
    })
    
});