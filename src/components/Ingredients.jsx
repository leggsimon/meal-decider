import React from 'react';
import PropTypes from 'prop-types';

function List({ items }) {
	return (
		<ul>
			{items.map((item) => {
				return <li key={item.id}>{item.name}</li>;
			})}
		</ul>
	);
}

List.propTypes = {
	items: PropTypes.array,
};

export default function Ingredients({ ingredients }) {
	const pantryItems = ingredients.filter((ingredient) => ingredient.pantry);
	const shoppingItems = ingredients.filter((ingredient) => !ingredient.pantry);

	return (
		<div>
			<h2>Ingredients</h2>
			<h3>Shopping List</h3>
			<List items={shoppingItems} />

			<h3>Check if you have</h3>
			<List items={pantryItems} />
		</div>
	);
}

Ingredients.propTypes = {
	ingredients: PropTypes.array,
};
