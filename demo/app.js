window.onload = function (){
	var _geng, _lexer, _trie, dict, results = [], result;

	_geng = new Geng();
	_lexer = new Geng.lexer();
	_trie = new Geng.trie();

	dict = ['子时', '古代', '现在', '此时', '此刻', '等于', '是','时间', '北京时间'];
	_trie.init(dict);
	document.getElementById('dict').innerText = dict.toString();

	_lexer.addRule(/是|等于/, function (lexeme) {
		return '==';
	});

	_lexer.addRule(/北京/, function (lexeme) {
		return 'Beijing';
	});

	_lexer.addRule(/时间/, function (lexeme) {
		return 'Time';
	});

	_lexer.addRule(/现在|Today|此时|此刻/, function (lexeme) {
		return 'Now';
	});

	var test_words = '现在是北京时间';
	document.getElementById('test_words').innerText = test_words;

	words = _trie.splitWords(test_words);
	words.forEach(function (word) {
		_lexer.setInput(word);
		result = _lexer.lex();
		results.push(result);
	});

	document.getElementById('result').innerText = results;
};