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

const Caption = styled.p`
	font-size: 0.8em;
	margin: 0;
	padding-left: 30px;
`;

const separators = {
	grams: 'g ',
	millilitres: 'ml ',
	individual: ' x ',
};

export default function IngredientItem({ item, defaultCompleted }) {
	const [completed, setCompleted] = useState(false);
	const content = item.amount + separators[item.quantityType] + item.name;

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
			{item.amounts.length > 1 && (
				<Caption>{`For ${item.amounts.length} meals: (${item.amounts
					.map((amount) => {
						return amount + separators[item.quantityType].trimStart();
					})
					.join(', ')})`}</Caption>
			)}
		</Item>
	);
}

IngredientItem.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		amount: PropTypes.number,
		quantityType: PropTypes.oneOf(['grams', 'individual', 'millilitres']),
		amounts: PropTypes.arrayOf(PropTypes.number),
		pantry: PropTypes.bool,
	}),
	defaultCompleted: PropTypes.bool,
};
