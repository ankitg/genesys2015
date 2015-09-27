import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import * as actions from "actions";

class QuestionsPage extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
		currentUser: PropTypes.object
	};
	dispatch = this.props.dispatch;
	_onClick = () => {
		this.dispatch(actions.fetchUser());
	}
	render() {
		const {currentUser} = this.props;

		return (<div className="scrollable-body">
			<div className="container">
				
			</div>
		</div>);
	}
}

function select(state) {
	return {
		currentUser: state.users.currentUser
	};
}

export default connect(select)(QuestionsPage);
