import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import * as actions from "actions";
import Chart from "react-chartist";

class ResponsePage extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
		currentUser: PropTypes.object,
		questions: PropTypes.array
	};
	state = {
		page: 0
	}
	componentDidMount() {
		this.dispatch(actions.fetchUser("Jerry", "secret"));
	}
	dispatch = this.props.dispatch;
	forward = () => {
		if (this.state.page >= this.props.questions.length - 1) return;
		this.changePage(this.state.page + 1);
	}
	back = () => {
		if (this.state.page <= 0) return;
		this.changePage(this.state.page - 1);
	}
	changePage = (index) => {
		this.setState({
			selectedAnswer: null,
			page: index
		});
	}
	selectAnswer = (index) => {
		this.setState({
			selectedAnswer: index
		});
		this.dispatch(actions.selectAnswer(this.state.page, index));
	}
	render() {
		const {currentUser, questions} = this.props;
		var data = {
      labels: [1, 2, 3, 4, 5, 6, 7, 8],
  series: [
    [5, 9, 7, 8, 5, 3, 5, 4]
  ]
    };

    var options = {
      low: 0,
  showArea: true
    };

    var type = 'Line';

		return (<div className="scrollable-body">
			<div className="container">
				
				<div className="card blue-grey darken-1">
					<div className="card-content white-text">
						<span className="card-title">Social Accounts</span>
						<p>I am a very simple card. I am good at containing small bits of information.
						I am convenient because I require little markup to use effectively.</p>
					</div>
					<div className="card-action">
						<a href="#">This is a link</a>
						<a href="#">This is a link</a>
					</div>
				</div>
				<Chart data={data} options={options} type={type} />
			</div>
		</div>);
	}
}

function select(state) {
	return {
		currentUser: state.users.currentUser,
		questions: state.users.currentUser? state.users.currentUser.questions : []
	};
}

export default connect(select)(ResponsePage);
