(function(root, undefined) {

  "use strict";

var Geng = function () {
	this.rule = [];
	this.error = [];
};

Geng.learn = function (rule){
	if(rule.constructor === RegExp) {
		this.rule.append(rule);
	} else {
		this.error.append('not a regex');
	}
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
	return this.time + this.type;
};

Geng.version = Geng.VERSION = '0.0.0';

root.Geng = Geng;

}(this));
