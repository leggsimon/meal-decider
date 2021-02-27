import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Create from './pages/Create';

function App() {
	return (
		<Router>
			<div className="App">
				<Link to="/">
					<h1>Meal Decider</h1>
				</Link>

				<nav>
					<ul>
						<li>
							<Link to="/create">Create</Link>
						</li>
					</ul>
				</nav>

				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/create">
						<Create />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
