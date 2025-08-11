'use client'
import React, { useState, useEffect } from 'react'

type Countries = {
    flags: { png: string }
    name: { common: string }
    capital: string
    region: string
    population: number
}

const Cards = () => {
    const [countries, setCountries] = useState<Countries[]>([])
    const [filteredCountries, setFilteredCountries] = useState<Countries[]>([])
    const [searcher, setSearcher] = useState('');
    const [filterRegion, setFilterRegion] = useState('');
    const [filterPop, setFilterPop] = useState('');

    

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch(
                    'https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population',

                )
                const data = await res.json()
                setCountries(data.sort((a: Countries, b: Countries) => a.name.common.localeCompare(b.name.common)))
                //setLoading(false)
            } catch (err) {
                console.error(err)
            }
        }

        fetchDetails()
    }, [])
    useEffect(() => {
        let result = [...countries]

        result = result.filter((country) =>
            country.name.common.toLowerCase().includes(searcher.toLowerCase())
        )

        if (filterRegion) {
            result = result.filter((country) => country.region === filterRegion)
        }

        if (filterPop) {
            const value = parseInt(filterPop)
            result = result.filter((country) => country.population > value)
        }

        setFilteredCountries(result)
    }, [searcher, filterRegion, filterPop, countries])

    return (
        <main className='w-full relative select-none overflow-x-hidden'>
            <section className="fixed top-0 left-0 w-full z-50 bg-[#C7DBEC] shadow-xl">
                <div className="max-w-7xl mx-auto gap-5 flex justify-between py-3 px-4 h-full items-center">
                    <p className='md:text-3xl text-lg text-[#071108] font-bold '>Countries</p>
                    <input
                        value={searcher}
                        onChange={(e) => setSearcher(e.target.value)}
                        placeholder="Search..."
                        className=" border border-black rounded-md p-3 w-full max-w-md shadow-md active:shadow-none text-black"
                    />
                    <section className='md:flex gap-4 hidden'>
                        <div>
                            <select
                                onChange={(e) => setFilterRegion(e.target.value)}
                                className="border p-2 rounded-md text-[#BFB1C1] bg-[#071108]"
                            >
                                <option value="">Filter by Region</option>
                                <option value="Africa" >Africa</option>
                                <option value="Americas">Americas</option>
                                <option value="Europe">Europe</option>
                                <option value="Oceania">Oceania</option>
                                <option value="Asia">Asia</option>
                                <option value="Antarctic">Antarctic</option>
                                <option value="Polar">Polar</option>
                            </select>
                        </div>
                        <div>
                            <select
                                onChange={(e) => setFilterPop(e.target.value)}
                                className="border p-2 rounded-md text-[#BFB1C1] bg-[#071108]">
                                    <option value="">Filter by Population</option>
                                    <option value="1000">More than 1,000</option>
                                    <option value="10000">More than 10,000</option>
                                    <option value="50000">More than 50,000</option>
                                    <option value="100000">More than 100,000</option>
                                    <option value="1000000">More than 1 million</option>
                                    <option value="10000000">More than 10 million</option>
                                    <option value="100000000">More than 100 million</option>
                            </select>
                        </div>
                    </section>
                </div>
            </section>


            <div className='p-5 grid md:grid-cols-3 grid-cols-1 gap-5 w-full mt-[80px]'>
                {filteredCountries.length > 0 ? (filteredCountries.map((country, index) => (
                    <div key={index} className='text-black md:block flex justify-between bg-[#BFB1C1] p-5 md:p-10 rounded-md col-span-1'>
                        <div>
                        <p className='text-2xl font-bold text-[#071108]'>{country.name.common}</p>
                        <p>Capital: {country.capital}</p>
                        <p>Region: {country.region}</p>
                        <p>Population: {country.population}</p>
                        </div>
                        <div className='min-h-[75px] min-w-[150px] md:min-w-[100px] md:w-[300px] md:h-[150px] bg-cover mt-3 bg-gray-300 bg-center' style={{ backgroundImage: `url(${country.flags.png})` }}></div>
                    </div>
                ))) : (<div className=''><p>No country matches your search</p></div>)}
            </div>
        </main>
    )
}

export default Cards