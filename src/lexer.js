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