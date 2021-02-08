import React, {useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import styled from 'styled-components'

export function LineGraph(props) {

	useEffect(() => {
		console.log('LineGraph useEffect');
		console.log('props', props)
		console.log('num', props.data.datasets[0].data)
		drawChart();
	}, []);

	let drawChart = () => {
	}

	const GraphContainer = styled.div`
		position: relative;
		left: 5%;
		width: 90%;
		height: auto;
		@media only screen and (min-width: 1200px) {
			position: relative;
			left: 25%;
			width: 50%;
			height: auto;
		}
	`;

	return (
		<GraphContainer>
		<Line
			data={props.data}
			options={{
				dataset: {
					bezierCurve: false,
					lineTension: 0,
					tension: 0	
				},
				title:{
					display:true,
					text:'Daily Temperature',
					fontSize:20
				},
				legend:{
					display:true,
					position:'bottom',
					text: 'Bristol'
				},
				scales: {
					yAxes: [{
						ticks: {
							max: 30,
							min: -4,
							stepSize: 2,
						},
						scaleLabel: {
							display: true,
							labelString: 'Celius'
						}
					}],
					xAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'Date'
						}
					}]
				}
			}}
		/>
		</GraphContainer>
	)
}