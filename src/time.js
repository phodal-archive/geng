var time = function () {};

time.now = function () {
	this.ms = new Date().getTime();
	this.sec = Math.round(this.ms / 1000);
	this.min = Math.round(this.sec / 60);
	this.hr = Math.round(this.min / 60);
	this.day = Math.round(this.hr / 24);
	return this;
};

time.getMs = function () {
	return this.ms;
};

time.getSec = function () {
	return this.sec;
};

time.getMin = function () {
	return this.min;
};

time.getHr = function () {
	return this.hr;
};

time.getDay = function () {
	return this.day;
};