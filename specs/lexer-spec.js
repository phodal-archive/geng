describe('Lexer', function () {
	var _lexer;
	beforeEach(function () {
		_lexer = new Geng.lexer();
	});

	describe('lexer() init', function () {
		it('invalid options (truthy and not object) raise Error during init', function () {
			expect(function(){
				var lexer = new Geng.lexer();
				lexer.addRule(/[0-9]+/, function (lexeme) {
					return "Number";
				});

				lexer.setInput('phodal');
				lexer.lex();
			}).toThrow(new TypeError("Unexpected character at index 0: p"));
		})
	});

	it('should correctly lexer words', function () {
		spyOn(console, 'log');
		_lexer.addRule(/^ */gm, function (lexeme) {
			//console.log(lexeme.length);
		});

		_lexer.addRule(/[0-9]+/, function (lexeme) {
			console.log(lexeme);
		});

		_lexer.setInput('37');
		_lexer.lex();
		expect(console.log).toHaveBeenCalledWith('37');
	});


	it('should return input type', function () {
		_lexer.addRule(/[a-f\d]+/i, function () {
			return 'HEX';
		});

		_lexer.setInput('aa0000');
		var result = _lexer.lex();
		expect(result).toBe('HEX');
	});
});