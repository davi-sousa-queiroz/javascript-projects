const modeButton = document.querySelector('.settings-button')
const humidity = document.querySelector('.amount')
const input = document.querySelector('.search-container input')
const searchButton = document.querySelector('.search-button')
const temperature = document.querySelector('.temp')
const weatherEmoji = document.querySelector('.emoji')
const locationInfo = document.querySelector('.location')
const condition = document.querySelector('.condition')

modeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode')
})

searchButton.addEventListener('click', () => display(getUserInput))

async function display(getUserInput) {
    const inputCity = getUserInput().trim().toUpperCase()
    if (inputCity === '') {
        return
    }

    const dataObj = await getCoords(inputCity)

    const latitude = dataObj.latitude
    const longitude = dataObj.longitude

    const currentWeatherData = await getWeather(latitude, longitude)
    
    console.log(currentWeatherData) 
    
}

function getUserInput() {
    const inputValue = input.value
    return inputValue
}

async function getCoords(inputCity) {
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${inputCity}&count=1&language=en&format=json`)
        
        if (!response.ok) {
            throw new Error('Post not found!')
        }
        const data = await response.json()
        const dataObj = {
            name: data.results[0].name,
            latitude: data.results[0].latitude,
            longitude: data.results[0].longitude,
            country: data.results[0].country
        }

        return dataObj
    } catch (error) {
        console.log(error.message)
    }
}

async function getWeather(latitude, longitude) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`)
        if (!response.ok) {
            throw new Error('Post not Found!')
        }
        const data = await response.json()
        
        return data.current
        
    } catch (error) {
        console.error(error)
    }
}
