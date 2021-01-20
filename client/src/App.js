import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// import components
import { HomePageMessage } from './Components/HomePage';
import { LineGraphContainer } from './Components/LineGraphContainer';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null
		}

	}

	componentDidMount() {
		console.log('componentDidMount')
		// fetch("http://localhost:5000")
		// 	.then(response => response.json())
		// 	.then(data => {
		// 		this.setState({
		// 			data: data.res
		// 		})
		// 		console.log('this.state', this.state)
		// 	})
		
	}
	render(){ 
		return (
			<Router>
				<>
					<header>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/line-graph">Line Graph</Link>
							</li>
						</ul>
					</header>
					<div>
						<Switch>
						<Route path="/" exact component={HomePageMessage} />
						<Route path="/line-graph" component={LineGraphContainer} />
						</Switch>
					</div>
				</>
			</Router>
		)
	}
}

export default App;
