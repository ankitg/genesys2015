var fs = require("fs");
var path = require("path");
var html = fs.readFileSync(path.resolve(__dirname, "../client-app/simple.html"), "utf-8");

function SimpleRenderer(options) {
	this.html = html.replace("SCRIPT_URL", options.scriptUrl);
}

SimpleRenderer.prototype.render = function(_path, callback) {
	callback(null, this.html);
};

module.exports = SimpleRenderer;
