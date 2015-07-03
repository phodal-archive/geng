describe('Time', function () {
	var time, day;
	beforeEach(function () {
		jasmine.clock().install();
	});

	afterEach(function() {
		jasmine.clock().uninstall();
	});

	it('should return correctly time in constructor', function () {
		var baseTime = new Date(2013, 9, 23);
		jasmine.clock().mockDate(baseTime);
		jasmine.clock().tick(50);
		time =  Geng.date.now().ms;
		expect(time).toEqual(1382457600050);
		day =  Geng.date.now().day;
		expect(day).toEqual(16001);

		day =  Geng.date.now().getHr();
		expect(day).toEqual(384016);
		day =  Geng.date.now().getDay();
		expect(day).toEqual(16001);
	});

	it('should return correctly time in function', function () {
		var baseTime = new Date(2013, 9, 23);
		jasmine.clock().mockDate(baseTime);
		jasmine.clock().tick(50);
		expect(Geng.date.now().getMs()).toEqual(1382457600050);
		expect(Geng.date.now().getSec()).toEqual(1382457600);
		expect(Geng.date.now().getMin()).toEqual(23040960);
		expect(Geng.date.now().getHr()).toEqual(384016);
		expect(Geng.date.now().getDay()).toEqual(16001);
	});
});