import React from "react";
import {Link} from "react-router";

export default class WelcomePage extends React.Component {
	render() {
		return (<div className="center-content fill-screen">
			<div>
				<h2>Know Your Friend</h2>
				<div className="center-content spaced"><Link to="signup" className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>Sign up</Link></div>
				<div className="center-content spaced"><Link to="login" className="waves-effect waves-light btn"><i className="material-icons right">cloud</i>Log in</Link></div>
			</div>
		</div>);
	}
}
