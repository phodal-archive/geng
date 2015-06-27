describe('Main', function () {
	var _geng;
	beforeEach(function () {
		_geng = new Geng();
	});

	it('should correctly convert time', function () {
		var result = Geng.parser('子时').to('在古代是').convert();
		expect(result).toBe('子时在古代是');
	});

	it('should correctly return missing variable', function () {
		expect(Geng.今天是).toBe(undefined);
		expect(Geng.今天).toBe(undefined);
	});
});

