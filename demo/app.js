window.onload = function () {
	var _geng, _lexer, _trie, dict, results = [], result;

	_geng = new Geng();
	_lexer = new Geng.lexer();
	_trie = new Geng.trie();
	_bayes = new Geng.bayes();

	dict = ['子时', '古代', '现在', '此时', '此刻', '等于', '是', '时间', '北京', '过去', '的'];
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
	var test_words2 = '过去的子时';
	var test_words3 = '过去的';

	document.getElementById('test_words').innerText = test_words;

	var words = _trie.splitWords(test_words);
	var words2 = _trie.splitWords(test_words2);
	var words3 = _trie.splitWords(test_words3);

	document.getElementById('split').innerText = words;

	var toBayesWords = words.toString().replace(/,/g, " ");
	var toBayesWords2 = words2.toString().replace(/,/g, " ");
	var toBayesWords3 = words3.toString().replace(/,/g, " ");

	console.log(toBayesWords, toBayesWords2, toBayesWords3);

	_bayes.learn(toBayesWords, 'Now');
	_bayes.learn(toBayesWords2, 'Old');
	_bayes.learn(toBayesWords3, 'Old');

	var bayesResult = _bayes.categorize('现在');
	var bayesResult2 = _bayes.categorize('过去的');

	document.getElementById('bayes_result').innerText = bayesResult + bayesResult2;

	words.forEach(function (word) {
		_lexer.setInput(word);
		result = _lexer.lex();
		results.push(result);
	});

	document.getElementById('result').innerText = results;
};