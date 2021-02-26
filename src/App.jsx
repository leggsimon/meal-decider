import React, { useState } from 'react';
import './App.css';
import recipes from './data/recipes.json';
import Ingredients from './components/Ingredients';

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
						return <li key={decision.id}>{decision.name}</li>;
					})}
				</ul>
			</output>
			<Ingredients
				ingredients={decisions
					.map((decision) => decision.ingredients || [])
					.flat()}
			/>
		</div>
	);
}

export default App;
