var fs = require("fs"),
	path = require("path"),
	join = path.join,
	basename = path.basename,
	normalize = path.normalize;

function loadable(dir){
	try{
		require.resolve(dir);
		return true;
	}catch(e){
		return false;
	}
}

function walk(dir){
	var bn = null, m = null, res = [], i, len;
	m = require(dir);
	bn = "/" + basename(dir);
	res.push({ pt: "", mw: m });
	fs.readdirSync(dir).forEach(function (fn) {
		var stat = null;
		fn = join(dir, fn);
		stat = fs.statSync(fn);
		if (stat && stat.isDirectory() && loadable(fn)) {
			res = res.concat(walk(fn));
		}
	});
	for (i = 0, len = res.length; i < len;i+=1 ){
		res[i].pt = bn + res[i].pt;
	}
	return res;
}

function useThemAll(app, list, userData){
	var i, len = list.length;
	for(i=0;i<len;i+=1){
		app.use(list[i].pt, list[i].mw(userData));
	}
	return list;
}

exports = module.exports = function (root, app, userData) {
	if (!root || !app) {
		throw new Error("root and app are required.");
	}
	root = normalize(root);
	return useThemAll(app, walk(root) || [], userData);
};