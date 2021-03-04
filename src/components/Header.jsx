import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 80px;
`;

const StyledH1 = styled.h1`
	font-family: 'Pacifico', cursive;
	margin: 0;
	font-size: 2em;
	font-weight: normal;
	height: 80px;
	text-align: center;
	vertical-align: middle;
	line-height: 80px;
`;

export default function Header() {
	return (
		<StyledHeader>
			<StyledH1>Meal Decider</StyledH1>
		</StyledHeader>
	);
}
