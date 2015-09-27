import React from "react";
import {RouteHandler} from "react-router";
import TopBar from "containers/TopBar";
import ModalView from "containers/ModalView.jsx";

export default class Application extends React.Component {
	render() {
		return (<div>
			<ModalView />
			<TopBar />
			<RouteHandler />
		</div>);
	}
}
