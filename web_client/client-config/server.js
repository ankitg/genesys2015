module.exports = function(options) {

	var express = require("express");
	var bodyParser = require("body-parser");
	var path = require("path");

	// require the page rendering logic
	var Renderer = options.prerender ?
		require("../build/prerender/main.js") :
		require("../client-bootstrap/SimpleRenderer.js");

	// load bundle information from stats
	var stats = require("../build/stats.json");

	var publicPath = stats.publicPath;

	var renderer = new Renderer({
		styleUrl: options.separateStylesheet && (publicPath + "main.css?" + stats.hash),
		scriptUrl: publicPath + [].concat(stats.assetsByChunkName.main)[0],
		commonsUrl: publicPath + [].concat(stats.assetsByChunkName.commons)[0]
	});

	var app = express();

	// serve the static assets
	app.use("/_assets", express.static(path.join(__dirname, "..", "build", "public"), {
		maxAge: "200d" // We can cache them as they include hashes
	}));
	app.use("/", express.static(path.join(__dirname, "..", "public"), {
	}));

	app.use(bodyParser.json());

	// load REST API
	// require("./api")(app);

	// application
	app.get("/*", function(req, res) {
		renderer.render(
			req.path,
			function(err, html) {
				if(err) {
					res.statusCode = 500;
					res.contentType = "text; charset=utf8";
					res.end(err.message);
					return;
				}
				res.contentType = "text/html; charset=utf8";
				res.end(html);
			}
		);
	});


	var port = +(process.env.PORT || options.defaultPort || 8080);
	app.listen(port, function() {
		console.log("Server listening on port " + port);
	});
};
