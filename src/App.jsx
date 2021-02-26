import React, { useState } from 'react';
import './App.css';
import recipes from './data/recipes.json';

function getRandomRecipes(numberOfResults, resultsFrom) {
	const set = new Set();
	while (set.size < numberOfResults) {
		let randomItem =
			resultsFrom[Math.floor(Math.random() * resultsFrom.length)];
		set.add(randomItem);
	}
	return Array.from(set);
}

function App() {
	const [decisions, setDecisions] = useState([]);

	return (
		<div className="App">
			<h1>Meal Decider</h1>

			<button
				onClick={() => {
					setDecisions(getRandomRecipes(3, recipes));
				}}
			>
				Decide!
			</button>
			<h2>Decisions</h2>
			<output>
				<ul>
					{decisions.map((decision) => {
						return <li>{decision.name}</li>;
					})}
				</ul>
			</output>
			<h2>Ingredients</h2>
			<h3>Shopping List</h3>

			<h3>Check if you have</h3>
		</div>
	);
}

export default App;
