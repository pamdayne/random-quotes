const url = 'https://quote-garden.herokuapp.com/api/v3/quotes';

window.onload = (event) => {
	renderSingleQuote()
}

async function fetchQuotes() {
	try {
		const resp = await fetch(url)
		return await resp.json()
	} catch (error) {
		console.log(error);
	}
}

async function renderSingleQuote() {
	let getQuotes = await fetchQuotes()
	let quotes = getQuotes.data
	let n = randomizer(quotes.length)

	let html = `<div class="quote_text" key="${quotes[n]._id}">${quotes[n].quoteText}</div> 
								<a href="#" class="quote_details" onclick="renderMultiQuotes('${quotes[n].quoteAuthor}')">
										<div class="author">${quotes[n].quoteAuthor}</div>
										<div class="genre">${quotes[n].quoteGenre}</div>
								</a>`
	let quoteWrapper = document.querySelector(".quote")
	quoteWrapper.innerHTML = html
}

async function renderMultiQuotes(author) {
	let getQuotes = await fetchQuotes()
	let quotes = getQuotes.data
	let newQuoteArr = []
	let html = ''

	quotes.forEach(q => {
		if (q.quoteAuthor == author)
			newQuoteArr.push(q)
	})

	newQuoteArr.forEach(quote => {
		console.log(quote)
		html += `<div class="quote_text" key="${quote._id}">${quote.quoteText}</div> 
							<div class="quote_details">
									<div class="author">${quote.quoteAuthor}</div>
									<div class="genre">${quote.quoteGenre}</div>
							</a>`
	})
	let quoteWrapper = document.querySelector(".quoteses")
	quoteWrapper.innerHTML = html
}

function randomizer(max) {
	return Math.floor(Math.random() * max);
}
