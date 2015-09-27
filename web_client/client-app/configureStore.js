import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import rootReducer from "reducers";
import callAPIMiddleware from "middlewares/callAPIMiddleware";

export default function configureStore(initialState) {
	// create a store that has redux-thunk middleware enabled
	const createStoreWithMiddleware = applyMiddleware(
		thunk,
		callAPIMiddleware
	)(createStore);

	const store = createStoreWithMiddleware(rootReducer, initialState);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept("reducers", () => {
			const nextReducer = require("reducers");
			store.replaceReducer(nextReducer);
		});
	}

	return store;
}
