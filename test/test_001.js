var app = {}, log = console.log, list = [], i, len;
app.use = function (path, middleware) {
	list.push(function () {
		log(path + " :");
		middleware("req ok", "res ok", "next ok");
	});
	log("app used : " + list.length);
};

var drouter = require("../lib/drouter.js");

drouter(__dirname + "/mw1", app, { msg: "user data" });

for(i=0,len=list.length;i<len;i+=1){
	list[i]();
}