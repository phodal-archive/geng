describe('Lexer', function () {
	var _lexer;
	beforeEach(function () {
		_lexer = new Geng.lexer();
	});

	it('should correctly lexer words', function () {
		spyOn(console, 'log');
		_lexer.addRule(/^ */gm, function (lexeme) {
			//console.log(lexeme.length);
		});

		_lexer.addRule(/[0-9]+/, function (lexeme) {
			console.log(lexeme);
		});

		_lexer.setInput("37");
		_lexer.lex();
		expect(console.log).toHaveBeenCalledWith('37');
	});
});