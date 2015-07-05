var dict = ['子时', '古代', '现在', '此时', '此刻', '等于', '是', '今天', '点'];

var Geng = function () {
};

Geng.parser = function (time) {
	this.time = time;
	return this;
};

Geng.to = function (type) {
	this.type = type;
	return this;
};

Geng.convert = function () {
	var results = [],
		result,
		_trie = new Geng.trie(),
		_lexer = new Geng.lexer();

	_trie.init(dict);

	_lexer.addRule(/子时/, function (lexme) {
		if(lexme === '子时'){
			return 12;
		}
		return 0;
	});

	_lexer.addRule(/现在|Today|此时|此刻|今天/, function () {
		return 'Now';
	});

	_lexer.addRule(/是|等于/, function () {
		return '==';
	});

	_lexer.addRule(/点/, function () {
		return 'hr';
	});

	var words = _trie.splitWords(this.time);
	words.forEach(function (word) {
		_lexer.setInput(word);
		result = _lexer.lex();
		results.push(result);
	});

	return results[0];
};

Geng.version = Geng.VERSION = '0.0.0';