var dict = ['子时', '古代', '现在', '此时', '此刻', '等于', '是', '今天', '点'];

//子丑寅卯辰巳午未申酉戌亥
var old_time = [
	{time: '子时', from: '23', to: '1'},
	{time: '丑时', from: '1', to: '3'},
	{time: '寅时', from: '3', to: '5'},
	{time: '卯时', from: '5', to: '7'},
	{time: '辰时', from: '7', to: '9'},
	{time: '巳时', from: '9', to: '11'},
	{time: '午时', from: '11', to: '13'},
	{time: '未时', from: '13', to: '15'},
	{time: '申时', from: '15', to: '17'},
	{time: '酉时', from: '17', to: '19'},
	{time: '戌时', from: '19', to: '21'},
	{time: '亥时', from: '21', to: '23'}
];

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
			return {
				from: 23,
				to: 1
			};
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