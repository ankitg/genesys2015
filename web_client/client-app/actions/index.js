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
	fetchUser(username, password) {
		var encoded = btoa(username+":"+password);
		return {
			types: [types.USER.REQUEST, types.USER.PAYLOAD, types.REQUEST_FAIL],
			callAPI: () => fetch(`http://macdaddy.local:9003/api/me`, {
				method: "post",
				headers: {
					"Accept": "application/json",
					"Authorization": `Basic ${encoded}`
				}
			}),
			payload: {}
		};
	},
	selectAnswer(question, answer) {
		return {
			type: types.ANSWER.SELECT,
			question: question,
			answer: answer
		};
	},
	createUser(username, password) {
		return {
			types: [types.USER.REQUEST, types.USER.PAYLOAD, types.REQUEST_FAIL],
			callAPI: () => fetch(`http://macdaddy.local:9003/api/me`, {
				method: "post",
				headers: {
					"Accept": "application/json",
					"Authorization": `Basic ${encoded}`
				}
			}),
			payload: {}
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
