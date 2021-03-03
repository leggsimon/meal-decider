import React, { useState } from 'react';
import recipes from '../data/v2/recipes.json';
import Ingredients from '../components/Ingredients';
import styled from 'styled-components';
import { SubHeading } from '../components/SubHeading';
import { UnorderedList, ListItem } from '../components/List';

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
	margin: 0;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`;

const Button = styled.button`
	height: 35px;
	background: #f5b841;
	border-radius: 50px;
	border: none;
	margin: 0 20px;
	color: white;
	font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI',
		'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
		'Helvetica Neue', sans-serif;
	font-weight: 600;
`;

const Content = styled.section`
	margin-top: 20px;
	background-color: #e9f1f7;
	border-radius: 50px 50px 0 0;
	padding: 30px 20px;
	flex-grow: 1;
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
			<Content>
				<SubHeading>Meals</SubHeading>
				<output>
					<UnorderedList>
						{decisions.map((decision) => {
							return <ListItem key={decision.id}>{decision.name}</ListItem>;
						})}
					</UnorderedList>
				</output>
				{decisions.length > 0 && (
					<Ingredients
						ingredients={decisions
							.map((decision) => decision.ingredients || [])
							.flat()}
					/>
				)}
			</Content>
		</Main>
	);
}
