const url = 'https://quote-garden.herokuapp.com/api/v3/quotes';

window.onload = (event) => {
	window.setTimeout(() => {
		quoteEventListener()
	}, 1000)
}

async function fetchQuotes() {
	try {
		const resp = await fetch(url)
		return await resp.json()
	} catch (error) {
		console.log(error);
	}
}

async function renderQuotes() {
	const getQuotes = await fetchQuotes()
	const quotes = getQuotes.data
	const num = randomizer(quotes.length)
	const html = ` <div class="quote_text" key="${quotes[num].id}">${quotes[num].quoteText}</div> 
										<a href="#" class="quote_details">
												<div class="author">${quotes[num].quoteAuthor}</div>
												<div class="genre">${quotes[num].quoteGenre}</div>
										</a>`
	let quoteWrapper = document.querySelector(".quote")
	quoteWrapper.innerHTML = html
}

function randomizer(max) {
	return Math.floor(Math.random() * max);
}

function quoteEventListener() {
	const quoteDetails = document.querySelector('.quote_details')
	quoteDetails.addEventListener('click', quotesByAuthor)
}

function quotesByAuthor() {
	console.log('clicked')
}

// Load functions
renderQuotes()
