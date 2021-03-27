import React, { useState } from 'react';
import recipes from '../data/v2/recipes.json';
import Ingredients from '../components/Ingredients';
import styled from 'styled-components';
import {
	UnorderedList,
	ListItem,
	ListContainer,
	ListTitle,
} from '../components/List';

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

const DecideButton = styled.button`
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

const CounterButton = styled.button`
	flex-grow: 1;
	height: 35px;
	background: #19323c;
	border-radius: 50px;
	border: none;
	margin: 0 20px;
	color: white;
`;

const Content = styled.section`
	margin-top: 20px;
	background-color: #e9f1f7;
	border-radius: 50px 50px 0 0;
	padding: 30px 20px;
	flex-grow: 1;
`;

const CounterWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 10px 0;
`;

const Counter = styled.span``;

export default function Home() {
	const [decisions, setDecisions] = useState([]);
	const [numberOfDecicions, setNumberOfDecicions] = useState(3);

	return (
		<Main>
			<CounterWrapper>
				<CounterButton
					onClick={() => {
						setNumberOfDecicions(numberOfDecicions - 1);
					}}
					disabled={numberOfDecicions < 2}
				>
					-
				</CounterButton>
				<Counter>
					{`${numberOfDecicions} ${numberOfDecicions > 1 ? 'meals' : 'meal'}`}
				</Counter>
				<CounterButton
					onClick={() => {
						setNumberOfDecicions(numberOfDecicions + 1);
					}}
				>
					+
				</CounterButton>
			</CounterWrapper>
			<DecideButton
				onClick={() => {
					setDecisions(
						getRandomRecipes(
							numberOfDecicions,
							recipes.filter((r) => r.ingredients && r.ingredients.length > 0),
						),
					);
				}}
			>
				Decide!
			</DecideButton>
			<Content>
				<ListContainer>
					<ListTitle>Meals</ListTitle>

					<UnorderedList>
						{decisions.map((decision) => {
							return <ListItem key={decision.id}>{decision.name}</ListItem>;
						})}
					</UnorderedList>
				</ListContainer>
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
