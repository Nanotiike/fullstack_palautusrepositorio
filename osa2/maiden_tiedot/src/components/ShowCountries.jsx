import { useEffect } from 'react'
import Country from "./Country"

const ShowCountries = ({ countries, filter, setFilter, setWeatherCity, weather, loading }) => {
    if (!countries) {
        return <div></div>
    }

    const filteredCountries= countries
        .filter(country => country)
        .filter(country => 
        country.name?.common.toLowerCase().includes(filter.toLowerCase()) || filter === ''
    )

    useEffect(() => {
        if (filteredCountries.length === 1) {
            setWeatherCity(filteredCountries[0].capital[0])
        }
    }, [filteredCountries, setWeatherCity])

    if (filteredCountries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    if (filteredCountries.length === 1) {
        return (
        <div>
            <Country country={filteredCountries[0]} weather={weather} loading={loading}/>
        </div>
        )
    }

    return (
        <div>
        {filteredCountries.map(country => (
        <div key={country.alpha3Code}>
          {country.name.common}
          <button onClick={() => setFilter(country.name.common)}>show</button>
        </div>
      ))}
        </div>
    )
}

export default ShowCountries