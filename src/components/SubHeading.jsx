import React from 'react';
import Proptypes from 'prop-types';
import styled from 'styled-components';

export const SubHeadingContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 40px;
	background-color: #19323c;
	color: white;
	/* border-radius: 10px 10px 0 0; */
`;
const StyledHeading = styled.h2`
	font-size: 20px;
	font-weight: 400;
`;

export const SubHeading = ({ children }) => {
	return (
		<SubHeadingContainer>
			<StyledHeading>{children}</StyledHeading>
		</SubHeadingContainer>
	);
};

SubHeading.propTypes = {
	children: Proptypes.node,
};
