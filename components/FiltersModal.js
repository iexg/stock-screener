
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"

import { facts_symbol } from "./constants/constants"

const FiltersModal = ({ filters, selectedFilters, setFilters, setSelectedFilters }) => {
    const handleAddFilter = (filter) => {
        setFilters([...filters, {
            "fact": filter.value,
            "condition": "",
            "value": ""
        }])
        setSelectedFilters([...selectedFilters, filter])
    }

    const groupedFacts = facts_symbol
        .filter((filter => !selectedFilters.includes(filter)))
        .reduce((acc, fact) => {
            if (!acc[fact.weightKey]) {
                acc[fact.weightKey] = []
            }
            acc[fact.weightKey].push(fact)
            return acc
        }, {})


    const sortedCategories = Object.keys(groupedFacts).sort(
        (a,b) => facts_symbol.findIndex((fact) => fact.weightKey === a) - facts_symbol.findIndex((fact) => fact.weightKey === b)
    )

    return (

        <Dialog>
            <DialogTrigger>
                <div className="text-slate-900 underline-offset-4 hover:underline px-4 py-2">
                    Show More Filters (+)
                </div>

            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Available Filters:</DialogTitle>
                    <DialogDescription>
                        Choose the filters to screen stocks.
                    </DialogDescription>
                </DialogHeader>
                {<div className="border-t py-3 max-h-[32rem] overflow-y-scroll">
                        {
                            sortedCategories.map((category) => (
                                <div key={category} className="my-3">
                                    <h2 >{category}</h2>
                                    <ul className="flex flex-wrap">
                                        {groupedFacts[category].map((filter) => (
                                            <li key={filter.label}>
                                                <Button size="sm" variant="link" onClick={() => handleAddFilter(filter)}> <span className="italic"> (+){filter.label.split(':')[1]}</span></Button>
                                            </li>))}
                                    </ul>
                                </div>
                            ))
                        }
                </div>}
            </DialogContent>
        </Dialog>

    )
}

export default FiltersModal