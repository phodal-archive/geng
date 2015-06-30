describe('Bayes', function () {
	var _geng, _bayes;

	beforeEach(function () {
		_geng = new Geng();
		_bayes = new Geng.bayes();
	});

	describe('bayes() init', function () {
		it('valid options (falsey or with an object) do not raise Errors', function () {
			var validOptionsCases = [ undefined, {} ];

			validOptionsCases.forEach(function (validOptions) {
				var classifier = new Geng.bayes(validOptions);
				expect(classifier.options).toEqual({});
			})
		});

		it('invalid options (truthy and not object) raise TypeError during init', function () {
				expect(function(){Geng.bayes(0)}).toThrow(new TypeError("Bayes got invalid `options`: `0`. Pass in an object."));
				expect(function(){Geng.bayes(null)}).toThrow(new TypeError("Bayes got invalid `options`: `null`. Pass in an object."));
				expect(function(){Geng.bayes('a')}).toThrow(new TypeError("Bayes got invalid `options`: `a`. Pass in an object."));
				expect(function(){Geng.bayes([])}).toThrow(new TypeError("Bayes got invalid `options`: ``. Pass in an object."));
		})
	});

	it('should correctly return correspond result', function () {
		_bayes.learn('amazing, awesome movie!! Yeah!! Oh boy.', 'positive');
		_bayes.learn('Sweet, this is incredibly, amazing, perfect, great!!', 'positive');
		_bayes.learn('terrible, shitty thing. Damn. Sucks!!', 'negative');
		var result = _bayes.categorize('awesome, cool, amazing!! Yay.');
		expect(result).toBe('positive');
	});

});

