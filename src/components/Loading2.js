import React, { Component, PropTypes } from 'react';

const loadingSvgs = {
	blank : '<svg class="icon-blank" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"></svg>',
	bubbles : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
			  <circle transform="translate(8 0)" cx="0" cy="16" r="0"> 
			    <animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0"
			      keytimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline" />
			  </circle>
			  <circle transform="translate(16 0)" cx="0" cy="16" r="0"> 
			    <animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0.3"
			      keytimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline" />
			  </circle>
			  <circle transform="translate(24 0)" cx="0" cy="16" r="0"> 
			    <animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0.6"
			      keytimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline" />
			  </circle>
			</svg>`
};

export default class LoadingTwo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			delayed : false
		};
	}

	componentWillMount() {
		const delayed = this.props.delay > 0;
		if (delayed) {
			this.setState({delayed : true});
			this._timeout = setTimeout(()=> {
				this.setState({delayed : false});
			}, this.props.delay);
		}
	}

	componentWillUnmount() {
		this._timeout && clearTimeout(this._timeout);
	}

	render() {
		const type = this.state.delayed ? 'blank' : this.props.type;
		const svg = loadingSvgs[this.props.type];
		const style = {
			fill : this.props.color,
			height : this.props.height,
			width : this.props.width,
			margin : '0 auto'
		};
		return (
			<div style={style} className="svg-loading-icon"
				dangerouslySetInnerHTML={{__html:svg}}
			/>
		);
	}
}

LoadingTwo.defaultProps = {
	color: "#00897b",
	height : 64,
	type : 'bubbles',
	width : 64,
	delay : 1000
};
