(function(root, undefined) {

  "use strict";

var words = {
	new: {
		currently: ['现在', '此时', '此刻', '今', '此时此刻' ],
		clockwords: ['几点', '什么时间'],
		equal: ['等于', '是'],
		numbers: {
			"零": "0",
			"壹": "1",
			"贰": "2",
			"叁": "3",
			"肆": "4",
			"伍": "5",
			"陆": "6",
			"柒": "7",
			"捌": "8",
			"玖": "9"
		}
	}
};

// code base on http://my.oschina.net/goal/blog/201674

// 停止词
var stop = {
	"的": 1
};

// 节点
function Node() {
	this.childs = {}; // 子节点集合
	this._isWord = false; // 边界保存，表示是否可以组成一个词
	this._count = 0;
}

Node.prototype = {
	isWord: function () {
		return (this._isWord && (this._count === 0));
	},
	asWord: function () {
		this._isWord = true;
	},
	addCount: function () {
		this._count++;
	}
};

// Trie树
function Trie() {
	this.root = new Node();
}
Trie.prototype = {
	/**
	 * 将Unicode转成UTF8的三字节
	 */
	toBytes: function (word) {
		var result = [];
		for (var i = 0; i < word.length; i++) {
			var code = word.charCodeAt(i);
			// 单字节
			if (code < 0x80) {
				result.push(code);
			} else {
				// 三字节
				result = result.concat(this.toUTF8(code));
			}
		}

		return result;
	},
	toUTF8: function (c) {
		// 1110xxxx 10xxxxxx 10xxxxxx
		// 1110xxxx
		var byte1, byte2, byte3;
		byte1 = 0xE0 | ((c >> 12) & 0x0F);
		// 10xxxxxx
		byte2 = 0x80 | ((c >> 6) & 0x3F);
		// 10xxxxxx
		byte3 = 0x80 | (c & 0x3F);

		return [byte1, byte2, byte3];
	},
	toUTF16: function (b1, b2, b3) {
		// 1110xxxx 10xxxxxx 10xxxxxx
		var byte1, byte2, utf16;
		byte1 = (b1 << 4) | ((b2 >> 2) & 0x0F);
		byte2 = ((b2 & 0x03) << 6) | (b3 & 0x3F);
		utf16 = ((byte1 & 0x00FF) << 8) | byte2;
		return utf16;
	},
	/**
	 * 添加每个词到Trie树
	 */
	add: function (word) {
		var node = this.root, bytes = this.toBytes(word), len = bytes.length;
		for (var i = 0; i < len; i++) {
			var c = bytes[i];
			// 如果不存在则添加，否则不需要再保存了，因为共用前缀
			if (!(c in node.childs)) {
				node.childs[c] = new Node(c);
			}
			node = node.childs[c];
		}
		node.asWord(); // 成词边界
	},
	/**
	 * 按字节在Trie树中搜索
	 */
	search: function (bytes) {
		var node = this.root, len = bytes.length, result = [];
		var word = [], j = 0;
		for (var i = 0; i < len; i++) {
			var c = bytes[i], childs = node.childs;
			if (!(c in childs)) {
				return result;
			}

			if (c < 0x80) {
				word.push(String.fromCharCode(c));
			} else {
				j++;
				if (j % 3 === 0) {
					var b1 = bytes[i - 2];
					var b2 = bytes[i - 1];
					var b3 = c;
					word.push(String.fromCharCode(this.toUTF16(b1, b2, b3)));
				}
			}
			// 如果是停止词，则退出
			if (word.join('') in stop) {
				return result;
			}

			// 成词
			var cnode = childs[c];
			if (cnode.isWord()) {
				cnode.addCount(); // 用于计数判断
				result.push(word.join(''));
			}

			node = cnode;
		}

		return result;
	},
	/**
	 * 分词
	 */
	splitWords: function (words) {
		// 转换成单字节进行搜索
		var bytes = this.toBytes(words);
		var start = 0, end = bytes.length - 1, result = [];

		while (start != end) {
			var word = [];
			for (var i = start; i <= end; i++) {
				var b = bytes[i]; // 逐个取出字节
				word.push(b);

				var finds = this.search(word);
				if (finds !== false && finds.length > 0) {
					// 如果在字典中，则添加到分词结果集
					result = result.concat(finds);
				}
			}

			start++;
		}

		return result;
	},
	/**
	 * 词始化整棵Trie树
	 */
	init: function (dict) {
		for (var i = 0; i < dict.length; i++) {
			this.add(dict[i]);
		}
	}
};


//The MIT License (MIT)
//
//Copyright (c) 2013 Aadit M Shah
//
//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
//Github: https://github.com/aaditmshah/lexer

//Lexer.defunct = function (char) {
//	throw new Error("Unexpected character at index " + (this.index - 1) + ": " + char);
//};

/*jshint curly: false */

function Lexer(defunct) {
	if (typeof defunct !== "function"){
		defunct = this.defunct;
	}

	var tokens = [];
	var rules = [];
	var remove = 0;
	this.state = 0;
	this.index = 0;
	this.input = "";

	this.defunct = function (char) {
		throw new Error("Unexpected character at index " + (this.index - 1) + ": " + char);
	};

	this.addRule = function (pattern, action, start) {
		var global = pattern.global;

		if (!global) {
			var flags = "g";
			if (pattern.multiline) flags += "m";
			if (pattern.ignoreCase) flags += "i";
			pattern = new RegExp(pattern.source, flags);
		}

		if (Object.prototype.toString.call(start) !== "[object Array]") start = [0];

		rules.push({
			pattern: pattern,
			global: global,
			action: action,
			start: start
		});

		return this;
	};

	this.setInput = function (input) {
		remove = 0;
		this.state = 0;
		this.index = 0;
		tokens.length = 0;
		this.input = input;
		return this;
	};

	this.lex = function () {
		if (tokens.length) return tokens.shift();

		this.reject = true;

		while (this.index <= this.input.length) {
			var matches = scan.call(this).splice(remove);
			var index = this.index;

			while (matches.length) {
				if (this.reject) {
					var match = matches.shift();
					var result = match.result;
					var length = match.length;
					this.index += length;
					this.reject = false;
					remove++;

					var token = match.action.apply(this, result);
					if (this.reject) this.index = result.index;
					else if (typeof token !== "undefined") {
						switch (Object.prototype.toString.call(token)) {
							case "[object Array]":
								tokens = token.slice(1);
								token = token[0];
								break;
							default:
								if (length) remove = 0;
								return token;
						}
					}
				} else break;
			}

			var input = this.input;

			if (index < input.length) {
				if (this.reject) {
					remove = 0;
					var token2 = defunct.call(this, input.charAt(this.index++));
					if (typeof token2 !== "undefined") {
						if (Object.prototype.toString.call(token2) === "[object Array]") {
							tokens = token2.slice(1);
							return token2[0];
						} else return token2;
					}
				} else {
					if (this.index !== index) remove = 0;
					this.reject = true;
				}
			} else if (matches.length)
				this.reject = true;
			else break;
		}
	};

	function scan() {
		var matches = [];
		var index = 0;

		/*jshint validthis: true */
		var state = this.state;
		var lastIndex = this.index;
		var input = this.input;

		for (var i = 0, length = rules.length; i < length; i++) {
			var rule = rules[i];
			var start = rule.start;
			var states = start.length;

			if ((!states || start.indexOf(state) >= 0) ||
				(state % 2 && states === 1 && !start[0])) {
				var pattern = rule.pattern;
				pattern.lastIndex = lastIndex;
				var result = pattern.exec(input);

				if (result && result.index === lastIndex) {
					var j = matches.push({
						result: result,
						action: rule.action,
						length: result[0].length
					});

					if (rule.global) index = j;

					while (--j > index) {
						var k = j - 1;

						if (matches[j].length > matches[k].length) {
							var temple = matches[j];
							matches[j] = matches[k];
							matches[k] = temple;
						}
					}
				}
			}
		}

		return matches;
	}
}

var Geng = function () {
	this.rule = [];
	this.error = [];
};
//
//var handler = {
//	get: function(target, name) {
//		return target.hasOwnProperty(name) ? target[name] : 42;
//	}
//};
//
//var g = new Proxy({}, handler);

Geng.parser = function (time) {
	this.time = time;
	return this;
};

Geng.to = function (type) {
	this.type = type;
	return this;
};

Geng.convert = function () {
	return this.time + this.type;
};

Geng.version = Geng.VERSION = '0.0.0';

Geng.trie = Trie;
Geng.lexer = Lexer;
Geng.dict = words;
root.Geng = Geng;

}(this));
