exports = module.exports = function (opt) {
	var msg = opt.msg, log = console.log,
		path = require("path"), bn = path.basename;
	return function (req, res, next) {
		log(bn(__dirname) + " : " + req + ", " + res + ", " + next);
	};
};