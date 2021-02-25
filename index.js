const outputElement = document.querySelector('output')
const decideButton = document.getElementById('decide')
const recipes = ['curry', 'fish', 'stew', 'pizza', 'burger'];

function getRandomRecipes(numberOfResults, resultsFrom) {
	const set = new Set();
	while (set.size < numberOfResults) {
		let randomItem = resultsFrom[Math.floor(Math.random() * resultsFrom.length)]
		set.add(randomItem)
	}
	return Array.from(set)
}

decideButton.addEventListener('click', () => {
	outputElement.innerHTML = ''
	const results = getRandomRecipes(3, recipes);
	const listElement = document.createElement('ul');
	results.map(result => {
		const listItemElement = document.createElement('li');
		const textElement = document.createTextNode(result)
		listItemElement.appendChild(textElement);
		return listItemElement
	}).forEach(listItem => listElement.appendChild(listItem))
	outputElement.appendChild(listElement)
})

console.log('yo');
