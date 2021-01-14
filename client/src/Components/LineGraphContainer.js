import React from "react";

// import components
import { LineGraph } from './LineGraph';

export class LineGraphContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			temp: []
		}

	}

	componentDidMount() {
		console.log('LineGraphContainer componentDidMount')
		fetch("http://ec2-3-140-190-252.us-east-2.compute.amazonaws.com/weather-bristol")
			.then(response => response.json())
			.then(data => {

				let dayTemps = data.rows.map((item, index) => {
					return item.DayTemp;
				})

				this.setState({
					data: data.rows,
					temp: dayTemps
				})
				console.log('this.state', this.state)				
			})
	}
	render(){ 
		return (
			this.state.data === null ?
			<p>Fetching data</p>
			:
			<LineGraph data={this.state.temp} width={400} height={300} />	
		)
	}
}
