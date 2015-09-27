import React, {Component, PropTypes} from "react";

export default class VendorPane extends Component {
	static propTypes = {
		vendor: PropTypes.object
	};
	render() {
		var {vendor} = this.props;
		return (<div className="pane">
				{JSON.stringify(vendor)}
			</div>);
	}
}
