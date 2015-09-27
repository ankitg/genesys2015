import types from "../constants/ActionTypes";

const initialState = {
	modals: []
};

export default function notifications(state = initialState, action) {
	switch (action.type) {
	case types.MODAL.OPEN:
		return Object.assign(state, {
			modals: [...state.modals, action.modal]
		});
	case types.MODAL.CLOSE:
		state.modals.shift();
		return state;
	case types.USER.SET:
		state.modals.filter(modal =>
      modal !== "LOGIN"
    );
		return state;
	default:
		return state;
	}
}
