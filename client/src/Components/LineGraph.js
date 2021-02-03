import React, {useEffect} from 'react';
import {Line} from 'react-chartjs-2';

export function LineGraph(props) {

	useEffect(() => {
		console.log('LineGraph useEffect');
		console.log('props', props)
		console.log('num', props.data.datasets[0].data)
		drawChart();
	}, []);

	let drawChart = () => {

	}

	return (
		<div style={{width: 50 + '%', height: 'auto', left: 25 + '%', position: 'relative'}}>
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
					position:'right',
					text: 'Bristol'
				},
				scales: {
					yAxes: [{
						ticks: {
							max: 30,
							min: 0,
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
		</div>
	)
}