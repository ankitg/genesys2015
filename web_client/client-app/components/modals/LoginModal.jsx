import React, {Component, PropTypes} from "react";
import {login} from "actions";

export default class LoginModal extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
		closeModal: PropTypes.func
	};
	handleSubmit = (e) => {
		e.preventDefault();
		var email = React.findDOMNode(this.refs.email).value.trim();
		var password = React.findDOMNode(this.refs.password).value.trim();
		if (!email || !password) {
			return;
		}
		this.props.dispatch(login(email, password));
		React.findDOMNode(this.refs.email).value = "";
		React.findDOMNode(this.refs.password).value = "";
		// this.props.closeModal();
	};
	render() {
		return (
			<div className="modal">
				<form onSubmit={this.handleSubmit}>
					<input name="email" ref="email" type="text" noValidate></input>
					<input name="password" ref="password" type="password" noValidate></input>
					<button className="default" type="submit">Login</button>
				</form>
				<button className="default" onClick={this.props.closeModal}>Close</button>
			</div>
		);
	}
}
