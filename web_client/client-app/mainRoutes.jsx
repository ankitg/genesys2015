import React from "react";
import "babel-core/polyfill";
import {Route, RouteHandler, DefaultRoute, NotFoundRoute} from "react-router";
import "./scss/index.scss";

import Panel from "containers/Panel";
import QuestionsPage from "containers/QuestionsPage";
import NotFoundPage from "containers/NotFoundPage";

import WelcomePage from "containers/WelcomePage";
import LoginPage from "containers/LoginPage";
import SignupPage from "containers/SignupPage";
import AccountPage from "containers/AccountPage";
import ResponsePage from "containers/ResponsePage";

// polyfill
if (!Object.assign) Object.assign = React.__spread;

// export routes
export default (
	<Route path="/" handler={RouteHandler}>
		<Route name="welcome" path="welcome" handler={WelcomePage} />
		<Route name="login" path="login" handler={LoginPage} />
		<Route name="signup" path="signup" handler={SignupPage} />
		<Route name="panel" path="panel" handler={Panel}>
			<Route name="questions" path="questions" handler={QuestionsPage} />
			<Route name="response" path="response" handler={ResponsePage} />
			<Route name="account" path="account" handler={AccountPage} />
			<DefaultRoute handler={QuestionsPage} />
		</Route>
		<DefaultRoute handler={WelcomePage} />
		<NotFoundRoute handler={NotFoundPage} />
	</Route>
);
