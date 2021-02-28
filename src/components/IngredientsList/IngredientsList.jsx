import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IngredientItem from '../IngredientItem/IngredientItem';

const List = styled.ul`
	list-style-type: none;
`;
export default function IngredientsList({ items, defaultCompleted }) {
	return (
		<List>
			{items.map((item) => {
				return (
					<IngredientItem
						key={item.id}
						item={item}
						defaultCompleted={defaultCompleted}
					/>
				);
			})}
		</List>
	);
}

IngredientsList.propTypes = {
	items: PropTypes.array,
	defaultCompleted: PropTypes.bool,
};
