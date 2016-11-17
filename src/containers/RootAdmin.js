import React, { Component } from 'react';

export default class RootAdmin extends Component {
	render(){
		return (
			<div className="root-admin">
				<div>Header</div>
				<div className="admin-body">
					{this.props.children}
				</div>
				<div>Footer</div>
			</div>
		);
	}
}