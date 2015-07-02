describe('Time', function () {
	var time, day;
	beforeEach(function () {
		jasmine.clock().install();
	});

	afterEach(function() {
		jasmine.clock().uninstall();
	});

	it('should return input type', function () {
		var baseTime = new Date(2013, 9, 23);
		jasmine.clock().mockDate(baseTime);
		jasmine.clock().tick(50);
		time =  Geng.date.now().ms;
		expect(time).toEqual(1382457600050);
		day =  Geng.date.now().day;
		expect(day).toEqual(16001);
	});
});