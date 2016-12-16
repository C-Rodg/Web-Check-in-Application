import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const portalElements = {};
const portalsContainer = document.querySelect('.portal-element-container');

function getAppendedElements() {
	const elements = [];
	const keys = Object.keys(portalElements);
	const length = keys.length;
	if(length > 0) {
		keys.forEach((key) => {
			elements.push(portalElements[key]);
		});
	}
	return elements;
}

class Portal extends React.Component {
	constructor(props) {
		super(props);
		this.portalsContainer = portalsContainer;
	}

	setPortalElementId(id) {
		this.appendedPortalId = id;
	}

	updateAppendedPortal(content) {
		portalElements[this.appendedPortalId] = content;
		this.updateAppendedPortals();
	}

	updateAppendedPortals() {
		ReactDOM.render(<span>{getAppendedElements()}</span>, portalsContainer);
	}

	removeAppendedPortal() {
		delete portalElements[this.appendedPortalId];
		this.updateAppendedPortals();
	}
}

export default Portal;