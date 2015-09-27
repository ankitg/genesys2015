import React, {Component, PropTypes} from "react";

export default class TopBarSearch extends Component {
	static propTypes = {

	};
	//dispatch = this.props.dispatch;
	handleSubmit = (e) => {
		e.preventDefault();
		var searchString = React.findDOMNode(this.refs.search).value.trim();
		this.context.router.transitionTo("search");
		// console.log("search for:"+searchString);
		// React.findDOMNode(this.refs.password).value = "";
	};
	render() {
		return (
			<form className="search-bar" onSubmit={this.handleSubmit}>
				<input ref="search" className="search" type="text" placeholder="Search for products" noValidate></input>
				<div className="search-suggestions">
					<div className="search-suggestion">TEST1</div>
					<div className="search-suggestion">TEST2</div>
				</div>
			</form>
		);
	}
}
