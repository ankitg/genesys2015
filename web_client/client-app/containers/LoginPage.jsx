import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";

class LoginPage extends Component {
	static propTypes = {
		dispatch: PropTypes.func
	};
	state = {
		canSubmit: false
	};
	dispatch = this.props.dispatch;
	handleChange = () => {
		var email = React.findDOMNode(this.refs.email).value.trim();
		var password = React.findDOMNode(this.refs.password).value.trim();
		if (/^[^@]+@.*\./.test(email) && password.length >= 6) {
			this.setState({canSubmit: true});
		}
		else {
			this.setState({canSubmit: false});
		}
	};
	handleSubmit = (e) => {
		e.preventDefault();
		var email = React.findDOMNode(this.refs.email).value.trim();
		var password = React.findDOMNode(this.refs.password).value.trim();
		if (!email || !password) {
			return;
		}
		console.log(email);
		// this.props.dispatch(login(email, password));
		React.findDOMNode(this.refs.email).value = "";
		React.findDOMNode(this.refs.password).value = "";
		// this.props.closeModal();
	};
	render() {
		return (<div className="center-content fill-screen">
			<div>
				<h2>Know Your Friend</h2>
				<div className="center-content spaced">
					<div className="input-field">
						<input id="email" ref="email" type="email" className="validate" onChange={this.handleChange} />
						<label for="email">Email</label>
					</div>
				</div>
				<div className="center-content spaced">
					<div className="input-field">
						<input id="password" ref="password" type="password" className="validate" onChange={this.handleChange} />
						<label for="password">Password</label>
					</div>
				</div>
				{this.state.canSubmit? (<div className="center-content spaced">
					<button className="waves-effect waves-light btn" onClick={this.handleSubmit}><i className="material-icons right">cloud</i>Log in</button>
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
