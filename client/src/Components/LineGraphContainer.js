import React from "react";

// import components
import { LineGraph } from './LineGraph';

export class LineGraphContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			labels: []
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
				let dates = data.rows.map((item, index) => {
					let ts = new Date(item.Timestamp*1000)
					let dateObject = ts.toLocaleString();
					let formattedDate = dateObject.substring(0, dateObject.length-13)
					console.log(formattedDate)
					let day = dateObject.toLocaleString("en-US", {day: "numeric"}) // 9
					let month = dateObject.toLocaleString("en-US", {month: "numeric"}) // 2019 
					let year = dateObject.toLocaleString("en-US", {year: "numeric"}) // 2019 
					return  formattedDate.toLocaleString();
				})

				this.setState({
					data: data.rows,
					datasets: [{data: dayTemps}],
					labels: dates
				})
				console.log('this.state', this.state)				
			})
	}
	render(){ 
		return (
			this.state.data === null ?
			<p>Fetching data</p>
			:
			<LineGraph data={this.state} width={400} height={300} />	
		)
	}
}
