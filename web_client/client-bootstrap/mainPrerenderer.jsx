import routes from "../client-app/mainRoutes";
import React from "react";
import Router from "react-router";
import StoresWrapper from "./StoresWrapper";

export default class MainRenderer {
	html = "<div id='content'>CONTENT</div>";
	render(path, body, callback) {
		var data = JSON.parse(body.toString());
		Router.run(routes, path, (Application) => {
			var application = React.renderToString(<StoresWrapper Component={Application} data={data}/>);
			var page = this.html
				.replace("CONTENT", application);
			callback(null, page);
		});
	}
}
