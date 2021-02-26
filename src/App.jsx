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
	const [createIngredients, setCreateIngredients] = useState(false);
	const [newIngredients, setNewIngredients] = useState([]);

	return (
		<div className="App">
			<h1>Meal Decider</h1>
			<button
				onClick={() => {
					setCreateIngredients((create) => !create);
				}}
			>
				Create!
			</button>
			{!createIngredients && (
				<div>
					<button
						onClick={() => {
							setDecisions(
								getRandomRecipes(
									3,
									recipes.filter((r) => r.ingredients),
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
			)}
			{createIngredients && (
				<div>
					<form
						onSubmit={(event) => {
							event.preventDefault();
							const form = event.target;
							const formData = new FormData(form);
							const data = {};
							for (const [name, value] of formData) {
								data[name] = value;
							}
							setNewIngredients((curr) => {
								return [
									...curr,
									{
										name: data.name,
										quantity: {
											type: data.quantity,
											amount: parseInt(data.amount),
										},
										...(data.pantry === 'on' ? { pantry: true } : {}),
									},
								];
							});
							document.querySelector('[name="name"]').value = '';
							document.querySelector('[name="name"]').focus();
						}}
					>
						<label>
							Name
							<input type="text" name="name" id="" />
						</label>
						<label>
							Quantity Type
							<select name="quantity">
								<option value="individual">Individual</option>
								<option value="grams">Grams</option>
								<option value="millilitres">millilitres</option>
							</select>
						</label>
						<label>
							Amount
							<input type="number" name="amount" id="" />
						</label>
						<label>
							Pantry Item?
							<input type="checkbox" name="pantry" id="" />
						</label>
						<input type="submit" value="Add" />
					</form>
					<pre
						onClick={() => {
							copy(JSON.stringify(newIngredients, null, 2));
						}}
					>
						{JSON.stringify(newIngredients, null, 2)}
					</pre>
					<button
						onClick={() => {
							navigator.clipboard.writeText(
								`,"ingredients": ${JSON.stringify(newIngredients)}`,
							);
						}}
					>
						Copy
					</button>
					<button
						onClick={() => {
							if (window.confirm('Clear?')) {
								setNewIngredients([]);
							}
						}}
					>
						Clear
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
