async function getCity(city) {
    try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`, {
            method: "GET"
        })
        const data = res.json()
        return data
    } catch (err) {
        console.error(err)
    }

}

async function getWeatherData(lat, lon) {
    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,rain,showers&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`)
        const data = await res.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

function cityInfo(data) {
    document.querySelector(".city").textContent = data.results[0].name
    document.querySelector(".country").textContent = data.results[0].country
    document.querySelector(".population").textContent = data.results[0].population
}

function weatherResults(data) {
    document.querySelector(".temperature").textContent = `${data.current.temperature_2m} ${data.current_units.temperature_2m}`
    document.querySelector(".city-temp-img").style.backgroundImage = data.current.is_day === 1 ? "url('./images/day.jpg')" : "url('./images/night.jpg')"
    data.current.is_day === 1 ? document.querySelector(".page").classList.remove("night") : document.querySelector(".page").classList.add("night")
    document.querySelector(".timezone").textContent = data.timezone
    document.querySelector(".forecast-min").textContent = `Low: ${data.daily.temperature_2m_min} ${data.daily_units.temperature_2m_min}`
    document.querySelector(".forecast-max").textContent = `Max: ${data.daily.temperature_2m_max} ${data.daily_units.temperature_2m_max}`
}


document.querySelector(".search").addEventListener("submit", async function (e) {
    e.preventDefault()
    const city = document.querySelector(".search-input").value
    const data = await getCity(city)
    console.log(data)
    const latitude = data.results[0].latitude
    const longitude = data.results[0].longitude
    const weatherOutput = await getWeatherData(latitude, longitude)
    cityInfo(data)
    weatherResults(weatherOutput)
    document.querySelector(".results").style.display = "grid"
})

