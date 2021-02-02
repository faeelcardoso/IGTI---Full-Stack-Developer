import React, { useEffect, useState } from 'react';

import Countries from './components/countries/Countries';
import Header from './components/header/Header';

import css from './app.module.css';

export default function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredPopulation, setFilteredPopulation] = useState(0);
  const [userFilter, setUserFilter] = useState(''); // Always you work with Input, never put null or undefined

  // Robin Wieruch, JS reference

  useEffect(() => {
    const getCountries = async () => {
      const res = await fetch('https://restcountries.eu/rest/v2/all');
      let allCountries = await res.json();

      allCountries = allCountries.map(({ name, numericCode, flag, population }) => {
        return {
          id: numericCode,
          name,
          filterName: name.toLowerCase(),
          flag,
          population,
        }
      });

      setAllCountries(allCountries);
      setFilteredCountries(Object.assign([], allCountries));
    }

    getCountries();
  }, []);

  const calculateTotalPopulationFrom = (countries) => {
    const totalPopulation = countries.reduce((acc, curr) => {
      return acc + curr.population;
    }, 0);

    return totalPopulation;
  }

  const handleChangeFilter = (newText) => {
    setUserFilter(newText);

    const filterLowerCase = newText.toLowerCase();

    const filteredCountries = allCountries.filter((country) => {
      return country.filterName.includes(filterLowerCase);
    });

    const filteredPopulation = calculateTotalPopulationFrom(filteredCountries); // Calc from just filtered countries

    setFilteredCountries(filteredCountries);
    setFilteredPopulation(filteredPopulation);
  }

    return (
      <div className="container">
        <h1 className={css.centralized}>React Countries</h1>
        <Header filter={userFilter} countryCount={filteredCountries.length} totalPopulation={filteredPopulation} onChangeFilter={handleChangeFilter} />

        <Countries countries={ filteredCountries } />
      </div>
    );
}
