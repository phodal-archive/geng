var date = function () {};

date.now = function () {
	var date = new Date();
	this.ms = date.getTime();
	this.sec = Math.round(this.ms / 1000);
	this.min = Math.round(this.sec / 60);
	this.hr = Math.round(this.min / 60);
	this.day = Math.round(this.hr / 24);
	return this;
};

date.getMs = function () {
	return this.ms;
};

date.getSec = function () {
	return this.sec;
};

date.getMin = function () {
	return this.min;
};

date.getHr = function () {
	return this.hr;
};

date.getDay = function () {
	return this.day;
};