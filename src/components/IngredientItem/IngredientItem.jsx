import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Item = styled.li`
	cursor: pointer;
	user-select: none;

	${(props) =>
		props.completed &&
		css`
			color: grey;
			text-decoration: line-through;
		`}
`;

const separators = {
	grams: 'g ',
	millilitres: 'ml ',
	individual: ' x ',
};

export default function IngredientItem({ item, defaultCompleted }) {
	const [completed, setCompleted] = useState(false);
	const { type, amount } = item.quantity;
	const content = amount + separators[type] + item.name;

	useEffect(() => {
		setCompleted(defaultCompleted);
	}, [item, defaultCompleted]);

	return (
		<Item
			completed={completed}
			onClick={() => {
				setCompleted((c) => !c);
			}}
		>
			{content}
		</Item>
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
