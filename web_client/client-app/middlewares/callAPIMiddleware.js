function callAPIMiddleware({ dispatch, getState }) {
	return function (next) {
		return function (action) {
			const {
				types,
				callAPI,
				shouldCallAPI = () => true,
				payload = {}
				} = action;

			if (!types) {
				// Normal action: pass it on
				return next(action);
			}

			if (
				!Array.isArray(types) ||
				types.length !== 3 ||
				!types.every(type => typeof type === "string")
			) {
				throw new Error("Expected an array of three string types.");
			}

			if (typeof callAPI !== "function") {
				throw new Error("Expected fetch to be a function.");
			}

			if (!shouldCallAPI(getState())) {
				return;
			}

			const [requestType, successType, failureType] = types;

			dispatch(Object.assign({}, payload, {
				type: requestType
			}));

			return callAPI()
				.then(req => req.json())
				.then(json => {
					if (json.error) {
						dispatch(Object.assign({}, payload,{
							type: failureType,
							error: json.error
						}));
					}
					else {
						dispatch(Object.assign({}, payload, {
							type: successType,
							data: json
						}));
					}
				});
		};
	};
}

export default callAPIMiddleware;
