import React from "react";
import {Provider} from "react-redux";
import configureStore from "configureStore";

const store = configureStore();

export default class StoresWrapper {
	static propTypes = {
		data: React.PropTypes.object,
		Component: React.PropTypes.func
	};
	// static childContextTypes = {
	// 	test: React.PropTypes.string
	// };
	// getChildContext() {
	// 	return {
	// 		test: "lol"
	// 	};
	// }
	render() {
		var Application = this.props.Component;
		return (<Provider store={store}>
			{() => <Application />}
		</Provider>);
	}
}
