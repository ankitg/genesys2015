import React, {Component, PropTypes} from "react";

export default class HolyGrailLayout extends Component {
	static propTypes = {
		children: PropTypes.arrayOf(PropTypes.element)
	};
	render() {
		return (<div className="row">
			<div className="col-md-2"></div>
			<div className="col-md-8">{this.props.children}</div>
			<div className="col-md-2"></div>
		</div>);
	}
}
