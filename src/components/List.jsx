import styled from 'styled-components';

export const UnorderedList = styled.ul`
	margin: 0;
	padding: 0;
	background-color: white;
	color: black;
	list-style: none;
`;
export const ListItem = styled.li`
	font-weight: 300;
	padding: 8px 0 8px 40px;

	:not(:first-child) {
		border-top: 1px solid #e9f1f7;
	}
`;
