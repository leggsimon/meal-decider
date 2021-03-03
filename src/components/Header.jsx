import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

// https://www.schemecolor.com/light-and-pale.php

const StyledHeader = styled.header`
	width: 100%;
	/* background-color: #67dfe2; */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 80px;
	/* padding: 15px 0; */
	/* box-shadow: 0px 5px 10px #999; */
`;
const List = styled.ul`
	list-style: none;
	padding: 0;
`;

const Nav = styled.nav`
	background-color: #f9d8d6;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 0;
	transition: height 0.2s ease-in-out 0s;
	box-shadow: 0px 5px 10px #999;

	${(props) =>
		props.expanded &&
		css`
			height: 60px;
			opacity: 1;
			transition: height 0.3s ease-in-out;
		`}

	${List} {
		opacity: 0;
		transition: opacity 0.1s ease-in-out 0s;

		${(props) =>
			props.expanded &&
			css`
				opacity: 1;
				transition: opacity 0.2s ease-in-out 0.2s;
			`}
	}
`;
const ListItem = styled.li`
	font-variant: all-petite-caps;
	font-weight: 200;
`;
const Heading = styled.h1`
	font-family: 'Pacifico', cursive;
	margin: 0;
	font-size: 2em;
	font-weight: normal;
`;

const StyledLink = styled(Link)`
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}

	&:visited {
		color: unset;
	}
`;

export default function Header() {
	const [expanded, setExpanded] = useState(false);
	return (
		<>
			<StyledHeader onClick={() => setExpanded((e) => !e)}>
				<StyledLink
					onClick={(event) => {
						event.stopPropagation();
						setExpanded(false);
					}}
					to="/"
				>
					<Heading>Meal Decider</Heading>
				</StyledLink>
			</StyledHeader>

			<Nav expanded={expanded}>
				<List>
					<ListItem>
						<StyledLink onClick={() => setExpanded(false)} to="/create">
							Create
						</StyledLink>
					</ListItem>
				</List>
			</Nav>
		</>
	);
}
