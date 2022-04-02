const url = 'https://quote-garden.herokuapp.com/api/v3/quotes';

async function fetchQuotes() {
    try {
        const resp = await fetch(url)
        return await resp.json()

    } catch (error) {
        console.log(error);
    }
}
