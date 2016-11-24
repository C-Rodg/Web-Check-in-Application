import React from 'react';

const DonutChart = (props) => {
	const halfSize = (props.size * 0.5);
	const radius = halfSize - (props.strokeWidth * 0.5);
	const circumference = 2 * Math.PI * radius;
	const strokeVal = ((props.value * circumference) / 100);
	const dashVal = (strokeVal + ' ' + circumference);
	const rotateVal = 'rotate(-90 ' + halfSize + ',' + halfSize + ')';
	const trackStyle = { strokeWidth : props.strokeWidth };
	const indicatorStyle = { strokeWidth : props.strokeWidth, strokeDasharray : dashVal, stroke : props.color };

	return (
		<svg width={props.size} height={props.size} className="donut-chart">
			<circle r={radius} cx={halfSize} cy={halfSize} transform={rotateVal} style={trackStyle} className="donut-chart-track" />
			<circle r={radius} cx={halfSize} cy={halfSize} transform={rotateVal} style={indicatorStyle} className="donut-chart-indicator" />
			<text x={halfSize} y={halfSize + 8} style={{textAnchor : 'middle', fill : props.color }} className="donut-chart-text">
				<tspan className="donut-chart-text-val" x={halfSize+2} >{props.value}</tspan>
				<tspan className="donut-chart-text-percent">%</tspan>
				<tspan className="donut-chart-text-label" x={halfSize} y={halfSize+29}>{props.donutLabel}</tspan>
			</text>
		</svg>
	);
};

DonutChart.defaultProps = {
	donutLabel : "",
	value : 0,
	size : 150,
	strokeWidth : 25,
	color : '#00897b'
};

export default DonutChart;