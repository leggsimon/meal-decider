import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './IngredientItem.css';

const separators = {
	grams: 'g ',
	millilitres: 'ml ',
	individual: ' x ',
};

export default function IngredientItem({ item, defaultCompleted }) {
	const [completed, setCompleted] = useState(false);
	const { type, amount } = item.quantity;
	const content = amount + separators[type] + item.name;
	const classes = [
		'ingredient-item',
		completed ? 'ingredient-item--completed' : '',
	].join(' ');

	useEffect(() => {
		setCompleted(defaultCompleted);
	}, [item, defaultCompleted]);

	return (
		<li
			className={classes}
			onClick={() => {
				setCompleted((c) => !c);
			}}
		>
			{content}
		</li>
	);
}

IngredientItem.propTypes = {
	item: PropTypes.shape({
		name: PropTypes.string,
		quantity: PropTypes.shape({
			amount: PropTypes.number,
			type: PropTypes.oneOf(['grams', 'individual', 'millilitres']),
		}),
	}),
	defaultCompleted: PropTypes.bool,
};
