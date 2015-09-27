import types from "../constants/ActionTypes";

const initialState = {
	currentUser: null,
	credentials: {}
};

export default function users(state = initialState, action) {
	switch (action.type) {
	case types.USER.PAYLOAD:
		return Object.assign(state, {currentUser: action.data});
	case types.ANSWER.SELECT:
		state.currentUser.questions[action.question].answer = action.answer;
		return state;
	case types.SIGNUP.PAYLOAD:
		window.setTimeout(function() {action.transitionTo("questions");}, 100);
		return Object.assign(state, {credentials: {
			password: action.password,
			username: action.username,
			userid: action.data.userid
		}});
	default:
		return state;
	}
}
