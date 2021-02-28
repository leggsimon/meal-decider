import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Create from './pages/Create';

function App() {
	return (
		<Router>
			<div className="App">
				<Header />
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
