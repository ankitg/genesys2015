import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {Link} from "react-router";

class LoginPage extends Component {
	static propTypes = {
		dispatch: PropTypes.func
	};
	state = {
		canSubmit: false
	};
	dispatch = this.props.dispatch;
	handleChange = () => {
		var username = React.findDOMNode(this.refs.username).value.trim();
		var password = React.findDOMNode(this.refs.password).value.trim();
		if (username.length >= 5 && password.length >= 6) {
			this.setState({canSubmit: true});
		}
		else {
			this.setState({canSubmit: false});
		}
	};
	handleSubmit = (e) => {
		e.preventDefault();
		var username = React.findDOMNode(this.refs.username).value.trim();
		var password = React.findDOMNode(this.refs.password).value.trim();
		if (!username || !password) {
			return;
		}
		console.log(username);
		// this.props.dispatch(login(email, password));
		React.findDOMNode(this.refs.username).value = "";
		React.findDOMNode(this.refs.password).value = "";
	};
	render() {
		return (<div className="center-content fill-screen">
			<div>
				<h2>Know Your Friend</h2>
				<div className="center-content spaced">
					<div className="input-field">
						<input id="username" ref="username" type="text" className="validate" onChange={this.handleChange} />
						<label for="username">Username</label>
					</div>
				</div>
				<div className="center-content spaced">
					<div className="input-field">
						<input id="password" ref="password" type="password" className="validate" onChange={this.handleChange} />
						<label for="password">Password</label>
					</div>
				</div>
				{this.state.canSubmit? (<div className="center-content spaced">
					<Link to="panel"><button className="waves-effect waves-light btn"><i className="material-icons right">cloud</i>Log in</button></Link>
				</div>): <noscript />}
			</div>
		</div>);
	}
}

function select(state) {
	return {
	};
}

export default connect(select)(LoginPage);
