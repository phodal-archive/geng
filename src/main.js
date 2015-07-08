var dict = ['古代', '现在', '此时', '此刻', '等于', '是', '今天', '点'];
var combinedDict = [];

//子丑寅卯辰巳午未申酉戌亥
var oldTime = [
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

var nowWords = ['现在','Today','此时','此刻','今天'];

var Utils = {};

Utils.combinedString = function (dict, str) {
	str.forEach(function (time) {
		dict.push(time.time);
	});

	return dict;
};

Utils.objectToStringRegex = function (str) {
	var result = "";
	str.forEach(function (time) {
		result = result + time.time + "|";
	});

	return result.substring(0, result.length - 1);
};

Utils.arrayToStringRegex = function (str) {
	var result = "";
	str.forEach(function (data) {
		result = result + data + "|";
	});

	return result.substring(0, result.length - 1);
};

Utils.stringToRegex = function (str) {
	return new RegExp(str);
};

Utils.extend = function (object) {
	var source, prop;
	for (var i = 1, length = arguments.length; i < length; i++) {
		source = arguments[i];
		for (prop in source) {
			if (hasOwnProperty.call(source, prop)) {
				object[prop] = source[prop];
			}
		}
	}
	return object;
};

combinedDict = Utils.combinedString(dict, oldTime);

var Geng = function () {
};

Geng.parser = function (time) {
	this.time = time;
	return this;
};

Geng.convert = function () {
	var results = {},
		result,
		trieTree = new Geng.trie(),
		lexer = new Geng.lexer();

	trieTree.init(combinedDict);

	var oldTimeRegex = Utils.stringToRegex(Utils.objectToStringRegex(oldTime));
	lexer.addRule(oldTimeRegex, function (lexme) {
		var result = {};
		oldTime.forEach(function (time) {
			if (time.time === lexme) {
				result = time;
				delete result.time;
			}
		});

		return {time: result};
	});

	var newWordsRegex = Utils.stringToRegex(Utils.arrayToStringRegex(nowWords));
	lexer.addRule(newWordsRegex, function () {
		return {now: true};
	});

	lexer.addRule(/是|等于/, function () {
		return {condition: "equal"};
	});

	lexer.addRule(/点/, function () {
		return {clock: "hour"};
	});

	var words = trieTree.splitWords(this.time);
	words.forEach(function (word) {
		lexer.setInput(word);
		result = lexer.lex();
		Utils.extend(results, result);
	});

	return results.time;
};

Geng.version = Geng.VERSION = '0.0.1';