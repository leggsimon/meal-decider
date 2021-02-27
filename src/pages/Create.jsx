import React, { useState } from 'react';

export default function Create() {
	const [newIngredients, setNewIngredients] = useState([]);

	return (
		<div>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					const form = event.target;
					const formData = new FormData(form);
					const data = {};
					for (const [name, value] of formData) {
						data[name] = value;
					}
					setNewIngredients((curr) => {
						return [
							...curr,
							{
								name: data.name,
								quantity: {
									type: data.quantity,
									amount: parseInt(data.amount),
								},
								...(data.pantry === 'on' ? { pantry: true } : {}),
							},
						];
					});
					document.querySelector('[name="name"]').value = '';
					document.querySelector('[name="name"]').focus();
				}}
			>
				<label>
					Name
					<input type="text" name="name" id="" />
				</label>
				<label>
					Quantity Type
					<select name="quantity">
						<option value="individual">Individual</option>
						<option value="grams">Grams</option>
						<option value="millilitres">millilitres</option>
					</select>
				</label>
				<label>
					Amount
					<input type="number" name="amount" id="" />
				</label>
				<label>
					Pantry Item?
					<input type="checkbox" name="pantry" id="" />
				</label>
				<input type="submit" value="Add" />
			</form>
			<pre>{JSON.stringify(newIngredients, null, 2)}</pre>
			<button
				onClick={() => {
					navigator.clipboard.writeText(
						`,"ingredients": ${JSON.stringify(newIngredients)}`,
					);
				}}
			>
				Copy
			</button>
			<button
				onClick={() => {
					if (window.confirm('Clear?')) {
						setNewIngredients([]);
					}
				}}
			>
				Clear
			</button>
		</div>
	);
}
