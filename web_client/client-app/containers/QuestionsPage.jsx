import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import * as actions from "actions";

class QuestionsPage extends Component {
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
		return (<div className="scrollable-body">
			<div className="container">
				{()=>{
					if (questions[this.state.page]) {
						return (
					<div className="question-container">
						<div className="question z-depth-2">
							<img src={questions[this.state.page].questionImage} />
						</div>
						<div className="answers">
							{questions[this.state.page].responses.map((answer, i)=>{
								return (<div key={i} className="answer z-depth-2">
									<div onClick={this.selectAnswer.bind(this, i)} className="image center-content">
										<img src={questions[this.state.page].responseImages[i]} />
										{answer}
									</div>
									<p>
										<input checked={this.state.selectedAnswer === i} type="checkbox" id="x" />
										<label for="x">&nbsp;</label>
									</p>
								</div>);
							})}
						</div>
						<div className="center-content">
							<ul className="pagination">
								<li className="waves-effect" onClick={this.back}><i className="material-icons">chevron_left</i></li>
								{questions.map((question, i)=>{
									return <li key={i} className={this.state.page===i? "active" : "waves-effect"} onClick={this.changePage.bind(this, i)}>{i+1}</li>;
								})}
								<li className="waves-effect" onClick={this.forward}><i className="material-icons">chevron_right</i></li>
							</ul>
						</div>
					</div>);
					}
					else {
						return <div />;
					}
				}()}
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

export default connect(select)(QuestionsPage);
