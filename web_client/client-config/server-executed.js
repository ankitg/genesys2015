var parameters = {};

for (var i=0; i<process.argv.length; i++) {
	if (/--([a-z])+=/g.test(process.argv[i])) {
		var arguement = process.argv[i].split(/(=)/);
		var variable = arguement[0].slice(2, arguement[0].length);
		parameters[variable] = arguement[2];
	}
}

// require the page rendering logic
var Renderer = require("../public/prerender/main.js");

var renderer = new Renderer();

if (parameters.path) {
	renderer.render(parameters.path, parameters.data || "{}", function (err, html) {
		console.log(html);
	});
}
