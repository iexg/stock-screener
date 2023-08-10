'use client'

import Filters from "./Filters"
import ResultsTable from "./resultstable/Table"

import { useState } from "react"


const StockScreener = () => {

    const [data, setData] = useState([]);

    const clearSearchResults = () => {
        setData([])
    }

    return (
        <>
        <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl my-4'>Stock Screener App</h1>
        <Filters clearSearchResults={clearSearchResults}/>
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors mt-3">Matching Results</h2>
        <ResultsTable data={data} setData={setData}/>
        </>
    )
}


export default StockScreener;