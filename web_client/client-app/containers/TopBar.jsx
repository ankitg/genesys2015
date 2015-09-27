import React, {Component, PropTypes} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import * as actions from "actions";

class TopBar extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
		isLoggedIn: PropTypes.bool,
		email: PropTypes.string
	};
	static contextTypes = {
		router: PropTypes.func
	};
	componentDidMount() {
		// this.dispatch(actions.fetchUser());
	}
	componentWillUnmount() {
	}
	dispatch = this.props.dispatch;
	handleLoginClick = () => {
		this.dispatch(actions.queueLoginModal());
	}
	handleSignupClick = () => {
		this.dispatch(actions.queueSignupModal());
	}
	render() {
		const {isLoggedIn, email} = this.props;
		return (
			<nav>
				<div className="nav-wrapper indigo accent-4">
					<Link to="panel"><div className="brand-logo">Know Your Friends</div></Link>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li><Link to="questions">Questions</Link></li>
						<li><Link to="response">Responses</Link></li>
						<li><Link to="account">Account</Link></li>
					</ul>
				</div>
			</nav>
		);
	}
}

function select(state) {
	return {
		isLoggedIn: (state.users.currentUser !== null),
		email: state.users.currentUser? state.users.currentUser.email : null
	};
}

export default connect(select)(TopBar);
