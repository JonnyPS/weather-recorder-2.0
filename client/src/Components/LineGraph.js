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
		// <p>hello</p>
		<Line
          data={props.data}
          options={{
            title:{
              display:true,
              text:'Daily Temperature',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
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
	)
}