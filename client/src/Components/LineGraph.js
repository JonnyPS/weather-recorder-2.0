import React, {useEffect} from 'react';
import * as d3 from 'd3';

export function LineGraph(props) {
	const { data, width, height } = props;


	useEffect(() => {
		console.log('LineGraph useEffect');
		console.log('props', props)
		console.log('data', data)
		drawChart();
	}, []);

	let drawChart = () => {
		console.log('drawChart');

		// clear canvas before repainting
		d3.select('#line-graph')
      .select('svg')
			.remove();
			
		// set the dimensions and margins of the graph
		let margin = {top: 10, right: 30, bottom: 30, left: 60},
		width = 460 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;

		// append the svg object to the body of the page
		let svg = d3.select("#line-graph")
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// Add X axis
		var x = d3.scaleLinear()
			.domain([ 0, data.length-1])
			.range([ 0, width ]);
			svg.append("g")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([8, d3.max(data, function(d) { return +d + 2; })])
      .range([ height, 0 ]);
			svg.append("g")
				.call(d3.axisLeft(y));

		// Add the line
		svg.append("path")
			.datum(data)
			.attr("fill", "#000")
			.attr("stroke", "steelblue")
			.attr("stroke-width", 1.5)
			.attr("d", d3.line()
			.x(function(d, i) { return x(i); })
				.y(function(d) { 
					console.log('yd', d);
					return y(d) })
				)

	}

	return (
		<div id="line-graph"></div>
	)
}