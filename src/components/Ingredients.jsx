import React from 'react';
import PropTypes from 'prop-types';
import IngredientsList from './IngredientsList/IngredientsList';
import ingredientsData from '../data/v2/ingredients.json';

export default function Ingredients({ ingredients }) {
	const combinedIngredients = ingredients.reduce((combined, ingredient) => {
		const match = combined.find(({ id }) => id === ingredient.ingredientId);

		if (match) {
			match.amount = match.amount + ingredient.amount;
			match.amounts.push(ingredient.amount);
		} else {
			const ingredientData = ingredientsData.find(
				({ id }) => id === ingredient.ingredientId,
			);

			combined.push({
				...ingredientData,
				amount: ingredient.amount,
				amounts: [ingredient.amount],
			});
		}

		return combined;
	}, []);

	const pantryItems = combinedIngredients.filter(
		(ingredient) => ingredient.pantry,
	);
	const shoppingItems = combinedIngredients.filter(
		(ingredient) => !ingredient.pantry,
	);

	return (
		<div>
			<h2>Ingredients</h2>
			<h3>Shopping List</h3>
			<IngredientsList items={shoppingItems} />

			<h3>Check if you have</h3>
			<IngredientsList items={pantryItems} defaultCompleted="true" />
		</div>
	);
}

Ingredients.propTypes = {
	ingredients: PropTypes.arrayOf(
		PropTypes.shape({
			ingredientId: PropTypes.number,
			amount: PropTypes.number,
		}),
	),
};
