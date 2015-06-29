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