describe('Trie', function () {
	var _trie;
	beforeEach(function () {
		_trie = new Geng.trie();
	});

	it('should correctly split words (origin)', function () {
		var dict = [
			'家乡',
			'松花',
			'松花江',
			'那里',
			'四季',
			'四季迷人',
			'迷人',
			'花香',
			'hello',
			'kitty',
			'fine'
		];
		var words = 'hello, kitty!我的家乡在松花江边上，那里有四季迷人的花香。fine~';

		_trie.init(dict);
		var result = [ 'hello', 'kitty', '家乡', '松花', '松花江', '那里', '四季', '四季迷人', '迷人', '花香', 'fine'];
		expect(_trie.splitWords(words)).toEqual(result);
		expect(_trie.splitWords(words)).toEqual(result);
	});

	it('should correctly split time words', function () {
		var dict = [
			'子时',
			'古代',
			'是'
		];
		var words = '子时在古代是';

		_trie.init(dict);
		var result = ['子时','古代', '是'];
		expect(_trie.splitWords(words)).toEqual(result);
	});
});