const Country = ({ country, weather, loading }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={country.name.common} />
            <h2>Weather in {country.capital}</h2>
            {loading ? (
                <div>Loading weather data...</div>
            ) : weather ? (
                <>
                <div>temperature {new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(weather.main.temp-273.15)} Celsius</div>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].main}/>
                <div>wind {weather.wind.speed} m/s</div>
                </>
            ) : (
                <div>No weather data available</div>
            )}
        </div>
    )
}
export default Country