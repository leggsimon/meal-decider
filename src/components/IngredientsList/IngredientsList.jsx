import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IngredientItem from '../IngredientItem/IngredientItem';
import { UnorderedList } from '../List';

export default function IngredientsList({ items, defaultCompleted }) {
	return (
		<UnorderedList>
			{items.map((item) => {
				return (
					<IngredientItem
						key={item.id}
						item={item}
						defaultCompleted={defaultCompleted}
					/>
				);
			})}
		</UnorderedList>
	);
}

IngredientsList.propTypes = {
	items: PropTypes.array,
	defaultCompleted: PropTypes.bool,
};
