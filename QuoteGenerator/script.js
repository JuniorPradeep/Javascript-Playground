//Get Quotes from API 
// let apiQuotes = [];
let timer = null;

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

loader.hidden = false;
function loading() {
    loader.style.display = 'block';
    quoteContainer.style.display = 'none';
}

function complete() {
    loader.style.display = 'none';
    quoteContainer.style.display = 'block';
}

function newQuote() {
    //Pick a random Quote
    loading();

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
        const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
        //Check if author field is blank and change it with unknown
        authorText.innerText = quote.author ? quote.author : 'Unknown';
        if (quote.text.length > 100) {
            quoteText.classList.add('long-text')
        } else {
            quoteText.classList.remove('long-text')
        }
        quoteText.innerText = quote.text;
        complete();
    }, 1000);


}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}


newQuoteBtn.addEventListener('click', newQuote);

twitterBtn.addEventListener('click', tweetQuote);

//Quote API
// async function getQuotes() {
//     const apiurl = 'http://127.0.0.1:8000/quotes/';
//     try {
//         const response = await fetch(apiurl);
//         console.log(response);
//         apiQuotes = await response.json();
//         newQuote();
//     }
//     catch (err) {
//         //Catch the error
//         console.log(err);
//     }
// }
//Load the quotes
setTimeout(function () {
    newQuote();
}, 1000);
