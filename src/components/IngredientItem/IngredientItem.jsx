import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { ListItem } from '../List';

const separators = {
	grams: 'g',
	millilitres: 'ml',
	individual: '×',
};

const Item = styled(ListItem)`
	cursor: pointer;
	user-select: none;

	${(props) =>
		props.completed &&
		css`
			color: grey;
		`}
`;

const Caption = styled.p`
	font-size: 0.8em;
	margin: 0;
	padding-left: 60px;
`;

const StrikeThroughable = styled.span`
	@keyframes strikethrough {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
	}

	display: inline-block;
	position: relative;

	::before {
		content: '';
		width: 0%;
		position: absolute;
		display: block;
	}

	${(props) =>
		props.completed &&
		css`
			color: grey;

			::before {
				width: 100%;
				height: 1px;
				box-shadow: 0 1px rgba(255, 255, 255, 0.6);
				margin-top: 0.6em;
				background: grey;
				animation: strikethrough 0.3s 0s cubic-bezier(0.55, 0, 0.1, 1) 1;
				transform-origin: center left;
			}
		`}
`;

const Amount = styled.span`
	display: inline-block;
	width: 50px;

	::after {
		content: '${(props) => separators[props.type]}';
		font-variant-caps: all-petite-caps;
		margin-left: 2px;
	}
`;

export default function IngredientItem({ item, defaultCompleted }) {
	const [completed, setCompleted] = useState(false);

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
			<StrikeThroughable completed={completed}>
				<Amount type={item.quantityType}>{item.amount}</Amount>
				{item.name}
			</StrikeThroughable>
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
