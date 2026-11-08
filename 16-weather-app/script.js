const modeButton = document.querySelector('.settings-button')
const humidity = document.querySelector('.amount')
const input = document.querySelector('.search-container input')
const searchButton = document.querySelector('.search-button')
const searchMessage = document.querySelector('.search-message')
const temperature = document.querySelector('.temp')
const weatherEmoji = document.querySelector('.emoji')
const locationName = document.querySelector('.location-name')
const condition = document.querySelector('.condition')
const welcomeScreen = document.querySelector('.welcome-screen')
const weatherResults = document.querySelector('.weather-results')
const loadingState = document.querySelector('.loading-state')

function getWeatherDetails(code) {
    const wmoCodes = {
        0: { text: "Clear sky", emoji: "☀️" },
        1: { text: "Mainly clear", emoji: "🌤️" },
        2: { text: "Partly cloudy", emoji: "⛅" },
        3: { text: "Overcast", emoji: "☁️" },
        45: { text: "Fog", emoji: "🌫️" },
        48: { text: "Depositing rime fog", emoji: "🌫️" },
        51: { text: "Light drizzle", emoji: "🌦️" },
        53: { text: "Moderate drizzle", emoji: "🌦️" },
        55: { text: "Dense drizzle", emoji: "🌦️" },
        56: { text: "Light freezing drizzle", emoji: "🌨️" },
        57: { text: "Dense freezing drizzle", emoji: "🌨️" },
        61: { text: "Slight rain", emoji: "🌧️" },
        63: { text: "Moderate rain", emoji: "🌧️" },
        65: { text: "Heavy rain", emoji: "🌧️" },
        66: { text: "Light freezing rain", emoji: "🌨️" },
        67: { text: "Heavy freezing rain", emoji: "🌨️" },
        71: { text: "Slight snowfall", emoji: "❄️" },
        73: { text: "Moderate snowfall", emoji: "❄️" },  
        75: { text: "Heavy snowfall", emoji: "❄️" },
        77: { text: "Snow grains", emoji: "❄️" },
        80: { text: "Slight rain showers", emoji: "🌦️" },
        81: { text: "Moderate rain showers", emoji: "🌦️" },
        82: { text: "Violent rain showers", emoji: "🌧️" },
        85: { text: "Slight snow showers", emoji: "🌨️" },
        86: { text: "Heavy snow showers", emoji: "🌨️" },
        95: { text: "Thunderstorm", emoji: "⛈️" },
        96: { text: "Thunderstorm with slight hail", emoji: "🌩️" },
        99: { text: "Thunderstorm with heavy hail", emoji: "🌩️" }
    };
    return wmoCodes[code] || { text: "Unknown", emoji: "❓" };
}

modeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode')
})

searchButton.addEventListener('click', () => display(getUserInput))

async function display(getUserInput) {
    searchMessage.hidden = true
    searchMessage.textContent = ''

    const inputCity = getUserInput().trim().toUpperCase()
    if (inputCity === '') {
        return
    }

    const showWelcomeAfterFailure = !welcomeScreen.hidden
    welcomeScreen.hidden = true
    loadingState.hidden = false

    let weatherLoaded = false

    try {
        const dataObj = await getCoords(inputCity)
        if (!dataObj) return

        const currentWeatherData = await getWeather(dataObj.latitude, dataObj.longitude)
        if (!currentWeatherData) return

        const tempData = currentWeatherData.temperature_2m
        const humidityData = currentWeatherData.relative_humidity_2m
        const windData = currentWeatherData.wind_speed_10m

        const weatherDetails = getWeatherDetails(currentWeatherData.weather_code)

        temperature.textContent = `${tempData}°C`
        humidity.textContent = `${humidityData}%`
        condition.textContent = weatherDetails.text
        weatherEmoji.textContent = weatherDetails.emoji
        locationName.textContent = `${dataObj.name}, ${dataObj.country}`
        document.querySelector('.humidity-text').textContent = 'Humidity'
        document.querySelector('.wind-text').textContent = 'Wind Speed'
        document.querySelector('.wind').textContent = `${windData} km/h`
        weatherResults.hidden = false
        weatherLoaded = true
    } finally {
        loadingState.hidden = true
        if (!weatherLoaded && showWelcomeAfterFailure) {
            welcomeScreen.hidden = false
        }
    }
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
        
        if (!data.results || data.results.length === 0) {
            throw new Error('City not found')
        }

        const dataObj = {
            name: data.results[0].name,
            latitude: data.results[0].latitude,
            longitude: data.results[0].longitude,
            country: data.results[0].country
        }

        return dataObj
    } catch (error) {
        if (error.message === 'City not found') {
            searchMessage.textContent = 'City not found. Check the spelling and try again.'
            searchMessage.hidden = false
        }
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
