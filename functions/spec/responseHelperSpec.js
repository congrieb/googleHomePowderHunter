describe('ResponseHelper', function dateHelperTests(){
    var ResonseHelper = require('../lib/ResponseHelper');
    beforeEach(function() {
        responseHelper = new ResonseHelper();
    });

    describe('getDayPhrase', function test(){
        beforeAll( function before(){
            jasmine.clock().install();
            var baseDate = new Date(2018, 0, 1);
            jasmine.clock().mockDate(baseDate);
        });
        it('should return today if day we are reporting on is today', function test(){
            var respone = responseHelper.getDayPhrase(0);

            expect(respone).toEqual('today');
        });

        it('should return tomorrow if day we are reporting on is the day after today', function test(){
            var respone = responseHelper.getDayPhrase(1);

            expect(respone).toEqual('tomorrow');
        });

        it('should return on + a day of the week if day we are reporting on is between 2 days and 6 days from now', function test(){
            var respone = responseHelper.getDayPhrase(2);

            expect(respone).toEqual('on Wednesday');
        });

        it('should return number of days followed by the phrase from now if its 7 days or more', function test(){
            var respone = responseHelper.getDayPhrase(7);

            expect(respone).toEqual('7 days from now');
        })
        afterAll(function after() {
            jasmine.clock().uninstall();
        });
    });
});