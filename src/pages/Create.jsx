import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import styled from 'styled-components';
import ingredientsData from '../data/v2/ingredients.json';

const ingredientTypes = [...new Set(ingredientsData.map((i) => i.type))].sort();

const Results = styled.ul`
	list-style: none;
`;
const Result = styled.li``;
const ResultLink = styled.button`
	appearance: none;
	background: white;
	border: none;
	padding: 8px;
	margin: 2px 0;
`;

const Copyable = ({ data }) => {
	return (
		<>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<button
				onClick={() => {
					navigator.clipboard.writeText(JSON.stringify(data));
				}}
			>
				Copy
			</button>
		</>
	);
};

export default function Create() {
	const [newIngredients, setNewIngredients] = useState([]);
	const [recipeIngredients, setRecipeIngredients] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [selection, setSelection] = useState(null);
	const fuse = new Fuse(ingredientsData, {
		keys: ['name'],
		includeScore: true,
		threshold: 0.3,
	});

	useEffect(() => {
		const results = fuse.search(searchTerm);
		setSearchResults(results);
	}, [searchTerm]);

	const addToRecipeIngredients = (ingredient, amount) => {
		setRecipeIngredients((curr) => [
			...curr,
			{
				ingredientId: ingredient.id,
				amount: parseInt(amount),
			},
		]);
	};

	const createIngredientEntry = (data) => {
		const allIngredients = [...ingredientsData, ...newIngredients];
		const id =
			allIngredients.map((i) => i.id).sort((a, b) => a - b)[
				allIngredients.length - 1
			] + 1;
		const newIngredient = {
			id,
			name: data.name,
			quantityType: data.quantity,
			type: data.type,
			pantry: data.pantry === 'on',
		};
		setNewIngredients((curr) => [...curr, newIngredient]);
		return newIngredient;
	};

	return (
		<div>
			<form
				onKeyPress={(e) => {
					if (e.key === 'Escape') {
						setSearchTerm('');
						setSearchResults([]);
					}
				}}
				onSubmit={(event) => {
					event.preventDefault();
					const form = event.target;
					const formData = new FormData(form);
					const data = {};
					for (const [name, value] of formData) {
						data[name] = value;
					}

					const ingredient = selection || createIngredientEntry(data);
					addToRecipeIngredients(ingredient, data.amount);

					setSearchTerm('');
					setSelection(null);

					document.querySelector('[name="name"]').value = '';
					document.querySelector('[name="name"]').focus();
				}}
			>
				<label>
					Name
					<input
						type="text"
						name="name"
						id=""
						value={selection && selection.name}
						onKeyUp={(event) => {
							event.preventDefault();
							if (event.key === 'Escape') {
								setSearchTerm('');
								setSearchResults([]);
							}
							setSearchTerm(event.target.value);
							setSelection(null);
						}}
					/>
					{!selection && searchResults.length > 0 && (
						<Results>
							{searchResults.map(({ item }) => {
								return (
									<Result key={item.id}>
										<ResultLink
											onClick={(event) => {
												event.preventDefault();
												event.stopPropagation();
												setSelection(item);
											}}
										>
											{item.name}
										</ResultLink>
									</Result>
								);
							})}
						</Results>
					)}
				</label>
				{selection ? (
					<label>
						Amount
						<input type="number" name="amount" id="" />
						{selection.quantityType}
					</label>
				) : (
					<>
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
						<label>
							Ingredient Type
							<select name="type">
								{ingredientTypes.map((type, i) => {
									return (
										<option key={i} value={type}>
											{type}
										</option>
									);
								})}
							</select>
						</label>
					</>
				)}
				<input type="submit" value="Add" />
			</form>
			<Copyable data={newIngredients} />
			<Copyable data={recipeIngredients} />
			<button
				onClick={() => {
					if (window.confirm('Clear?')) {
						setNewIngredients([]);
						setRecipeIngredients([]);
						setSearchTerm('');
						setSearchResults([]);
						setSelection(null);
					}
				}}
			>
				Clear
			</button>
		</div>
	);
}
