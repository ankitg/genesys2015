import keyMirror from "key-mirror-nested";

export default keyMirror({
	USER: {
		SET: null,
		REQUEST: null,
		PAYLOAD: null
	},
	ANSWER: {
		SELECT: null
	},
	MODAL: {
		OPEN: null,
		CLOSE: null
	},
	ACCOUNT: {
		TRANSACTIONHISTORY: {
			REQUEST: null,
			PAYLOAD: null,
			FAIL: null,
			INSERT: null
		}
	},
	QUESTIONS: {
		REQUEST: null,
		PAYLOAD: null
	},
	REQUEST_FAIL: null
});
