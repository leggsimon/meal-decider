import styled, { css } from 'styled-components';

export const ListContainer = styled.div`
	border-radius: 10px;
	margin: 20px 0;
	background-color: white;
	overflow: hidden;
`;

export const UnorderedList = styled.ul`
	margin: 0;
	padding: 0;
	color: black;
	list-style: none;
`;
export const ListItem = styled.li`
	font-weight: 300;
	padding: 8px 20px 8px 40px;

	:not(:first-child) {
		border-top: 1px solid #e9f1f7;
	}
`;

const ListTitleContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 40px;
	background-color: #19323c;
	color: white;
	border-radius: 10px 10px 0 0;
`;

export const ListTitle = styled.h2`
	height: 40px;
	color: white;
	font-weight: 400;
	margin: 0;
	text-align: center;
	vertical-align: middle;
	line-height: 40px;
	transition: border-radius 5s ease;
	background-color: #f5b841;
	font-size: 16px;

	:first-child {
		background-color: #19323c;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		font-size: 20px;
	}

	:last-child {
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}
`;
