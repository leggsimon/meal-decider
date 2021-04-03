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
		set.add(randomItem.id);
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

	&:disabled {
		opacity: 0.7;
	}
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

const Summary = styled.summary`
	align-self: center;
`;
const Details = styled.details`
	align-self: center;
	display: flex;
`;

export default function Home() {
	const [decisions, setDecisions] = useState([]);
	const [numberOfDecicions, setNumberOfDecicions] = useState(3);

	const chosenRecipes = recipes.filter((r) => {
		return decisions.includes(r.id);
	});

	const eligibleRecipes = recipes.filter(
		(r) => r.ingredients && r.ingredients.length > 0,
	);

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
					disabled={numberOfDecicions >= eligibleRecipes.length}
				>
					+
				</CounterButton>
			</CounterWrapper>
			<DecideButton
				onClick={() => {
					setDecisions(getRandomRecipes(numberOfDecicions, eligibleRecipes));
				}}
			>
				Decide!
			</DecideButton>
			<Details>
				<Summary>Pick from recipes</Summary>

				<UnorderedList>
					{recipes.map((recipe) => {
						return (
							<ListItem key={recipe.id}>
								{recipe.name}
								<button
									onClick={(ev) => {
										ev.preventDefault();
										setDecisions((dec) => {
											return [...dec, recipe.id];
										});
									}}
								>
									Pick
								</button>
							</ListItem>
						);
					})}
				</UnorderedList>
			</Details>
			<Content>
				<ListContainer>
					<ListTitle>Meals</ListTitle>

					<UnorderedList>
						{chosenRecipes.map((decision) => {
							return <ListItem key={decision.id}>{decision.name}</ListItem>;
						})}
					</UnorderedList>
				</ListContainer>
				{chosenRecipes.length > 0 && (
					<Ingredients
						ingredients={chosenRecipes
							.map((decision) => decision.ingredients || [])
							.flat()}
					/>
				)}
			</Content>
		</Main>
	);
}
