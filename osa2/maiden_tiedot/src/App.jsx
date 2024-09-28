import { useState, useEffect } from 'react'
import FilterForm from './components/FilterForm'
import ShowCountries from './components/ShowCountries'
import axios from 'axios'
import { debounce } from 'lodash'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState(null)
  const [weatherCity, setWeatherCity] = useState('')
  const [loading, setLoading] = useState(false)
  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
      console.log('fecthing countries ...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data)
        })
  }, [])

  useEffect(() => {
    const fetchWeather = debounce(() => {
      if (weatherCity !== '') {
        console.log('fetching weather ...')
        setLoading(true)
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${weatherCity}&APPID=${api_key}`)
          .then(response => {
            setWeather(response.data)
            setLoading(false)
          })
          .catch(() => {
            setLoading(false)
          })
      }
    }, 500) // 500ms debounce

    fetchWeather()

    return () => {
      fetchWeather.cancel()
    }
  }, [weatherCity, api_key])

  useEffect(() => {
    console.log(weather)
  }, [weather])

  return (
    <div>
      <FilterForm filter={filter} setFilter={setFilter} />
      <ShowCountries countries={countries} filter={filter} setFilter={setFilter} setWeatherCity={setWeatherCity} weather={weather} loading={loading}/>
    </div>
  )
}

export default App
