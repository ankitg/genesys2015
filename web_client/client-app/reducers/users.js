import types from "../constants/ActionTypes";

const initialState = {
	currentUser: null
};

export default function users(state = initialState, action) {
	switch (action.type) {
	case types.USER.PAYLOAD:
		return Object.assign(state, {currentUser: action.data});
	case types.ANSWER.SELECT:
		state.currentUser.questions[action.question].answer = action.answer;
		return state;
	default:
		return state;
	}
}
