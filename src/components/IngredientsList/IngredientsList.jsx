import React from 'react';
import PropTypes from 'prop-types';
import IngredientItem from '../IngredientItem/IngredientItem';

export default function IngredientsList({ items, defaultCompleted }) {
	return (
		<ul>
			{items.map((item) => {
				return (
					<IngredientItem
						key={item.id}
						item={item}
						defaultCompleted={defaultCompleted}
					/>
				);
			})}
		</ul>
	);
}

IngredientsList.propTypes = {
	items: PropTypes.array,
	defaultCompleted: PropTypes.bool,
};
