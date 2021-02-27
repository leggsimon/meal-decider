import React from 'react';
import PropTypes from 'prop-types';
import IngredientsList from './IngredientsList/IngredientsList';

export default function Ingredients({ ingredients }) {
	const pantryItems = ingredients.filter((ingredient) => ingredient.pantry);
	const shoppingItems = ingredients.filter((ingredient) => !ingredient.pantry);

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
	ingredients: PropTypes.array,
};
