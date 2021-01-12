import React from "react";
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null
		}

	}

	componentDidMount() {
		console.log('componentDidMount')
		fetch("http://localhost:5000")
			.then(response => response.json())
			.then(data => {
				this.setState({
					data: data.res
				})
				console.log('this.state', this.state)
			})
	}
	render(){ 
		return (
			<div className="App">
				<header className="App-header">
					<p>
						I am here! and so is someone else........... or are they?
					</p>
					<p>
						{this.state.data}
					</p>
				</header>
			</div>
		)
	}
}

export default App;
