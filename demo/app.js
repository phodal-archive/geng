var _geng, _lexer, _trie;

_geng = new Geng();
_lexer = new Geng.lexer();
_trie = new Geng.trie();

var dict = ['子时', '古代','现在','此时','此刻','等于','是'], results = [], result;
_trie.init(dict);

_lexer.addRule(/是|等于/, function (lexeme) {
	return '==';
});

_lexer.addRule(/现在|Today|此时|此刻/, function (lexeme) {
	return 'Now';
});

words = _trie.splitWords('现在是');
words.forEach(function(word){
	_lexer.setInput(word);
	result = _lexer.lex();
	results.push(result);
});

console.log(results);