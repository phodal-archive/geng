//(The MIT License)
//
//Copyright (c) by Tolga Tezel tolgatezel11@gmail.com
//
//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

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
		//
		//it('invalid options (truthy and not object) raise TypeError during init', function () {
		//	var invalidOptionsCases = [ null, 0, 'a', [] ];
		//	invalidOptionsCases.forEach(function (invalidOptions) {
		//		expect(Geng.bayes(invalidOptions)).toThrowError("");
		//		expect(Geng.bayes(invalidOptions)).toThrow(TypeError);
		//	})
		//})
	});

	it('should correctly return correspond result', function () {
		_bayes.learn('amazing, awesome movie!! Yeah!! Oh boy.', 'positive');
		_bayes.learn('Sweet, this is incredibly, amazing, perfect, great!!', 'positive');
		_bayes.learn('terrible, shitty thing. Damn. Sucks!!', 'negative');
		var result = _bayes.categorize('awesome, cool, amazing!! Yay.');
		expect(result).toBe('positive');
	});

});

