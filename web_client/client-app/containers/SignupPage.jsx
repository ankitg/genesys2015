import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {createUser} from "actions";

class SignupPage extends Component {
	static propTypes = {
		dispatch: PropTypes.func
	};
	static contextTypes = {
		router: PropTypes.func
	}
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
		this.props.dispatch(createUser(username, password, this.context.router.transitionTo));
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
					<button className="waves-effect waves-light btn" onClick={this.handleSubmit}><i className="material-icons right">cloud</i>Sign up</button>
				</div>): <noscript />}
			</div>
		</div>);
	}
}

function select(state) {
	return {
	};
}

export default connect(select)(SignupPage);
