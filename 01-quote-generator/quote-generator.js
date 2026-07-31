function quotePicker () {

    const quotes = {
    quote1: 'Waking up in the morning is worth more than a billion bucks.\nBe gratefull.',
    quote2: 'Your future is built today.',
    quote3: 'Progress beats perfection.',
    quote4: 'Keep building.',
    quote5: 'Stay Curious.',
    quote6: 'Belive in yourself.',
    
    }

    let selector = Math.random();

    if (selector > 0.888) {
        selector =  quotes.quote1
        return selector
    } else if (selector > 0.6899) {
        selector = quotes.quote2
        return selector
    } else if (selector > 0.5) {
        selector = quotes.quote3
        return selector
    } else if (selector > 0.38) {
        selector = quotes.quote4
        return selector
    } else if (selector > 0.189) {
        selector = quotes.quote5
        return selector
    } else {
        selector = quotes.quote6
        return selector
    } 
}

function displayQuote (quote) {
    const display = document.querySelector('.quote')
    display.textContent = quote
}