import React from 'react';
import PropTypes from 'prop-types';
import IngredientItem from './IngredientItem/IngredientItem';
import { ListContainer, ListTitle, UnorderedList } from './List';
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
				<UnorderedList>
					{orderList(shoppingItems).map((item) => {
						return <IngredientItem key={item.id} item={item} />;
					})}
				</UnorderedList>

				<ListTitle type="separator">Check if you have</ListTitle>
				<UnorderedList>
					{pantryItems.map((item) => {
						return (
							<IngredientItem
								key={item.id}
								item={item}
								defaultCompleted={true}
							/>
						);
					})}
				</UnorderedList>
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
