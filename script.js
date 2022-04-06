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
	let n = calcRandom(quotes.length)

	let html = `<div class="text" key="${quotes[n]._id}">${quotes[n].quoteText}</div> 
								<a href="#" class="details" onclick="renderAuthorQuotes('${quotes[n].quoteAuthor}')">
									<div class="quote-inner">
										<div class="author">${quotes[n].quoteAuthor}</div>
										<div class="genre">${quotes[n].quoteGenre}</div>
									</div>
									<span class="material-icons">east</span>
								</a>`
	let quoteWrapper = document.querySelector(".quote")
	quoteWrapper.innerHTML = html
}

async function renderAuthorQuotes(author) {
	hideContentAnimation(document.querySelector('.quote'))
	document.querySelector('.quote').style.display = 'none'

	setTimeout(() => {
		showContentAnimation(document.querySelector('.quotes'))
	}, 1000)

	let getQuotes = await fetchQuotes()
	let quotes = getQuotes.data
	let newQuoteArr = []
	let html = ''

	quotes.forEach(q => {
		if (q.quoteAuthor == author)
			newQuoteArr.push(q)
	})

	newQuoteArr.forEach(quote => {
		html += `<div class="quote-inner">
							<div class="author">${quote.quoteAuthor}</div>
							<div class="text" key="${quote._id}">${quote.quoteText}</div> 
						</div>`
	})
	let quoteWrapper = document.querySelector(".quotes")
	quoteWrapper.innerHTML = html
}

function calcRandom(max) {
	return Math.floor(Math.random() * max);
}

const randomizer = () => {
	hideContentAnimation(document.querySelector('.quote'))
	document.querySelector('.quotes').style.display = 'none'

	setTimeout(() => {
		showContentAnimation(document.querySelector('.quote'))
	}, 1000)

	setTimeout(() => {
		renderSingleQuote()
	}, 300)
}

const hideContentAnimation = (quote) => {
	quote.style.cssText = `
		opacity: 0;
		transition: opacity 0.5s ease;
	`
}

const showContentAnimation = (quote) => {
	quote.style.cssText = `
		opacity: 1;
		transition: opacity 0.5s ease;
	`
}

function changeColorScheme() {
	document.querySelector('.body').classList.toggle('light');
}
