import React, { useState } from 'react';
import recipes from '../data/v2/recipes.json';
import Ingredients from '../components/Ingredients';

function getRandomRecipes(numberOfResults, resultsFrom) {
	const set = new Set();
	while (set.size < numberOfResults) {
		let randomItem =
			resultsFrom[Math.floor(Math.random() * resultsFrom.length)];
		set.add(randomItem);
	}
	return Array.from(set);
}

export default function Home() {
	const [decisions, setDecisions] = useState([]);

	return (
		<div>
			<button
				onClick={() => {
					setDecisions(
						getRandomRecipes(
							3,
							recipes.filter((r) => r.ingredients && r.ingredients.length > 0),
						),
					);
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
