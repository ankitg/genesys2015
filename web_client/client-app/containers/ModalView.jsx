import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import * as actions from "actions";
import LoginModal from "components/modals/LoginModal.jsx";

class ModalView extends Component {
	dispatch = this.props.dispatch;
	handleClose = () => {
		this.dispatch(actions.closeModal());
	};
	render() {
		const {modal} = this.props;
		if (!modal) {
			return <noscript />;
		}
		else if (modal === "LOGIN") {
			var props = {
				dispatch: this.dispatch,
				closeModal: this.handleClose
			};
			return (<div className="modal-background">
					<LoginModal {...props} />
				</div>);
		}
		else {
			return <noscript />;
		}
	}
}

function select(state) {
	return {
		modal: state.notifications.modals[0]
	};
}

export default connect(select)(ModalView);
