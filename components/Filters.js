'use client'


import axios from "axios"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Loader2 } from "lucide-react"
  

import { useState } from "react"
import { Button } from "./ui/button"
import FilterItem from "./FilterItem"

import { facts_symbol, additionalIndexToDisplay } from "./constants/constants"
import FiltersModal from "./FiltersModal"


const Filters = ({clearSearchResults}) => {
    const DEFAULT_NUMBER_OF_FILTERS = 2
    const [selectedFilters, setSelectedFilters] = useState(facts_symbol.slice(0, DEFAULT_NUMBER_OF_FILTERS))
    const [isScreening, setisScreening] = useState(false)
    const [ruleId, setRuleId] = useState('')

    const getdefaultfilters = () => {
        const facts = facts_symbol.slice(0, DEFAULT_NUMBER_OF_FILTERS)
        let arr = []
        for (const fact of facts) {
            const key = fact.value
            let obj = {
                "fact": key,
                "condition": "",
                "value": ""
            }

            arr.push(obj)
        }
        return arr
    }
    const [filters, setFilters] = useState(getdefaultfilters(DEFAULT_NUMBER_OF_FILTERS))


    

    const handleRemoveFilter = (filter) => {
        setFilters(filters.filter((f) => f.fact !== filter.value))

        setSelectedFilters(selectedFilters.filter((f) => f !== filter))
    }

    const handleStop = async () => {
        const url = "https://api.iex.cloud/v1/rules/" + ruleId + "?token=" + `${process.env.NEXT_PUBLIC_IEX_COULD_API_KEY}`

        axios.delete(url).then(
            (response) => {
                console.log(response)

                if(response) {
                    setRuleId('')
                    setisScreening(false)
                }
            }
        )

    }

    const handleDisable = async() => {
        const url = "https://api.iex.cloud/v1/rules/pause/" + ruleId

        axios.post(url,
            {
                token: `${process.env.NEXT_PUBLIC_IEX_COULD_API_KEY}`,
            }).then(
            (response) => {
                console.log(response)

                if(response) {
                    setRuleId('')
                    setisScreening(false)
                }
            }
        )
    }

    const handleSearch = async () => {
        clearSearchResults()
        let index_arr = []
        let conditions_arr = []
        const workspace = "CORE"
        const namespace = "STOCK"
        const entity = "*"
        for (const f of filters) {
            if (f.condition !== "" && f.value !== "") {
                const len = index_arr.push(workspace + ":" + namespace + ":" + entity + ":" + f.fact)
                const index = len - 1
                const val = parseInt(f.value)
                conditions_arr.push(["$index[" + index + "]", f.condition, val])
            }
        }

        let additionalIndexes = additionalIndexToDisplay.map((obj) => workspace + ":" + namespace + ":" + entity + ":" + obj.fact)
        additionalIndexes.push(workspace + ":" + namespace + ":" + entity + ":" + "latestPrice")

        console.log(index_arr)
        console.log(conditions_arr)
        console.log(additionalIndexes)
        axios.post(
            'https://api.iex.cloud/v1/rules/create',
            {
                token: `${process.env.NEXT_PUBLIC_IEX_COULD_API_KEY}`,
                ruleName: "Simple Rule",
                index: index_arr,
                conditions: conditions_arr,
                type: "all",
                outputs: [
                    {
                        frequency: 3600,
                        method: "webhook",
                        url: `${process.env.NEXT_PUBLIC_WEBHOOK_URL}`,
                    }
                ],
                additionalIndex: additionalIndexes
            }
        ).then((response) => {
            const data = response.data

            if (response.status == 200){
                setisScreening(true)
                setRuleId(data.id)
            }
            
        }).catch((err) => {
            console.log("Error in request", err);
        });

    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Stock Screener</CardTitle>
                <CardDescription>Enter filters to screen stocks </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col justify-center'>

                {selectedFilters.map((filter, index) => (
                    <div key={index} className="flex items-center mb-2 w-full">
                        <FilterItem label={filter.label} type={filter.type} fact={filters.find((fact_) => fact_.fact == filter.value)}/>
                        <Button variant="outline" className="text-red-500" onClick={() => handleRemoveFilter(filter)}>x</Button>
                    </div>
                ))}

            <FiltersModal filters={filters} selectedFilters={selectedFilters} setFilters={setFilters} setSelectedFilters={setSelectedFilters} />
                  

            </CardContent>
            <CardFooter className='flex justify-center'>
                {
                    isScreening ?  
                    <Button onClick={handleDisable} variant="destructive">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Stop Screening...
                </Button> : <Button onClick={handleSearch}>
                    Search
                </Button>
                }
               
            </CardFooter>
        </Card>
    )
}

export default Filters