import React, { useState } from 'react';
import recipes from '../data/v2/recipes.json';
import Ingredients from '../components/Ingredients';
import styled from 'styled-components';

function getRandomRecipes(numberOfResults, resultsFrom) {
	const set = new Set();
	while (set.size < numberOfResults) {
		let randomItem =
			resultsFrom[Math.floor(Math.random() * resultsFrom.length)];
		set.add(randomItem);
	}
	return Array.from(set);
}

const Main = styled.main`
	padding-top: 20px;
	margin: 0 30px;
	display: flex;
	flex-direction: column;
`;

const Button = styled.button`
	height: 40px;
	border: none;
	border-radius: 3px;
	background-color: #67dfe2;
	margin: 0 10px;

	font-size: 1.3em;
	font-weight: bold;
	letter-spacing: -1px;
	font-variant-caps: all-petite-caps;
`;

export default function Home() {
	const [decisions, setDecisions] = useState([]);

	return (
		<Main>
			<Button
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
			</Button>
			<h2>Decisions</h2>
			<output>
				<ul>
					{decisions.map((decision) => {
						return <li key={decision.id}>{decision.name}</li>;
					})}
				</ul>
			</output>
			{decisions.length > 0 && (
				<Ingredients
					ingredients={decisions
						.map((decision) => decision.ingredients || [])
						.flat()}
				/>
			)}
		</Main>
	);
}
