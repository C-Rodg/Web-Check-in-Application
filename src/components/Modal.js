import React, { PropTypes } from 'react';
import Portal from './Portal';

function uuid() {
	let d = new Date().getTime();
	let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		let r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c =='x' ? r : (r&0x3|0x8)).toString(16);
	});
	return uuid;
}

class Modal extends Portal {
	constructor(props) {
		super(props);
		this.uniqueId = uuid();
		this.setPortalElementId(this.uniqueId);
	}

	componentDidMount() {
		this.updateSelf();
	}

	componentDidUpdate() {
		this.updateSelf();
	}

	componentWillUnmount() {
		this.removeAppendedPortal();
	}

	updateSelf() {
		this.updateAppendedPortal(
			<div key={this.uniqueId} className="react-modal">
				<div className="react-modal__container">
					{this.props.children}
				</div>
			</div>
		);
	}
	render() {
		return null;
	}
}

Modal.propTypes = {
	className: React.PropTypes.string
};

Modal.defaultProps = {
	className: null
};

export default Modal;