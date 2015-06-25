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
	return this.time + this.type;
};

Geng.version = Geng.VERSION = '0.0.0';

root.Geng = Geng;