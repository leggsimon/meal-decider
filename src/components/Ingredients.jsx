import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IngredientsList from './IngredientsList/IngredientsList';
import { ListContainer, ListTitle } from './List';
import ingredientsData from '../data/v2/ingredients.json';
import SHOPPING_ORDER from '../data/v2/shopping-order.json';

function orderList(list) {
	return [...list].sort((a, b) => {
		return (
			(SHOPPING_ORDER.indexOf(a.type) || 99) -
			(SHOPPING_ORDER.indexOf(b.type) || 99)
		);
	});
}

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
			<ListContainer>
				<ListTitle>Ingredients</ListTitle>
				<IngredientsList items={orderList(shoppingItems)} />

				<ListTitle type="separator">Check if you have</ListTitle>
				<IngredientsList items={pantryItems} defaultCompleted={true} />
			</ListContainer>
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
