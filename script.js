const url = 'https://quote-garden.herokuapp.com/api/v3/quotes';

window.onload = (event) => {
	renderSingleQuotes()
}

async function fetchQuotes() {
	try {
		const resp = await fetch(url)
		return await resp.json()
	} catch (error) {
		console.log(error);
	}
}

async function renderSingleQuotes() {
	let getQuotes = await fetchQuotes()
	let quotes = getQuotes.data
	let n = randomizer(quotes.length)

	let html = `<div class="quote_text" key="${quotes[n]._id}">${quotes[n].quoteText}</div> 
								<a href="#" class="quote_details" >
										<div class="author">${quotes[n].quoteAuthor}</div>
										<div class="genre">${quotes[n].quoteGenre}</div>
								</a>`
	let quoteWrapper = document.querySelector(".quote")
	quoteWrapper.innerHTML = html
}

function randomizer(max) {
	return Math.floor(Math.random() * max);
}
