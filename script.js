const url = 'https://quote-garden.herokuapp.com/api/v3/quotes';

async function fetchQuotes() {
    try {
        const resp = await fetch(url)
        return await resp.json()
    } catch (error) {
        console.log(error);
    }
}

async function renderQuotes(data) {
    const getQuotes = await fetchQuotes()
    const html = ` <div class="quote__text" key="quote"></div> 
                    <div class="quote__details">
                        <div class="author"></div>
                        <div class="genre"></div>
                    </div>`
    let quoteWrapper = document.querySelector(".quote")
    quoteWrapper.innerHTML = html
}
