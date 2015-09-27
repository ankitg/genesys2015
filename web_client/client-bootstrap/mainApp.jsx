import React from "react";
import Router from "react-router";
import StoresWrapper from "./StoresWrapper";
import routes from "../client-app/mainRoutes";

Router.run(routes, Router.HistoryLocation, function (Application) {
	React.render(<StoresWrapper Component={Application} data={{}} />, document.getElementById("content"));
});
