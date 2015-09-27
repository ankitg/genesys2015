import * as types from "constants/ActionTypes";
import modalActions from "./modalActions";
import fetch from "isomorphic-fetch";

var actions = {
	loadVendorByLink(link) {
		return {
			types: [types.VENDOR.BYLINK.REQUEST, types.VENDOR.BYLINK.PAYLOAD,types.REQUEST_FAIL],
			//shouldCallAPI: (state) => !state.posts[postId],
			callAPI: () => fetch(`/api/vendor/by-link/${link}`),
			payload: {link}
		};
	},
	fetchUser() {
		var username = "test123";
		var password = "123456";
		return (dispatch, getState) => {
			const user = getState().users.currentUser || {};
			var encoded = btoa((user.username||username)+":"+(user.password||password));
			dispatch({
				types: [types.USER.REQUEST, types.USER.PAYLOAD, types.REQUEST_FAIL],
				callAPI: () => fetch(`http://173.255.194.96/api/me`, {
					method: "post",
					headers: {
						"Accept": "application/json",
						"Authorization": `Basic ${encoded}`
					}
				}),
				payload: {}
			});
		};
	},
	selectAnswer(question, answer) {
		return {
			type: types.ANSWER.SELECT,
			question: question,
			answer: answer
		};
	},
	createUser(username, password, transitionTo) {
		return {
			types: [types.SIGNUP.REQUEST, types.SIGNUP.PAYLOAD, types.REQUEST_FAIL],
			callAPI: () => fetch(`http://173.255.194.96/signup?username=${username}&password=${password}`, {
				headers: {
					"Accept": "application/json"
				}
			}),
			payload: {
				transitionTo,
				username,
				password
			}
		};
	}
	//Async action example
	//fetchVendorByLink(link) {
	//	return dispatch => {
	//		return api.call(`/api/vendor/by-link/${link}`)
	//			.then(json => dispatch(setVendorByLink(link, json)),
	//				error => console.log(error));
	//	};
	//}
};

Object.assign(actions, modalActions);

export default actions;
