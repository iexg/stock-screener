import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const FilterItem = ({label, type, fact}) => {

    const handleChange = (event) => {
        fact.value = event.target.value
    }

    const handleSelect = (event) => {
        fact.condition = event
    }

    return (
        <div className="flex items-center mx-2 w-full">
            <Label className="w-1/3"> {label.split(':')[1]}:</Label>
            <Select onValueChange={handleSelect}>
                 <SelectTrigger className="w-[160px]" >
                     <SelectValue placeholder="condition"/>
                 </SelectTrigger>
                 <SelectContent onChange={handleSelect}>
                    {             
                    type == "number" && (<><SelectItem value=">">greater than</SelectItem>
                        <SelectItem value="<">less than</SelectItem></>)
                        
                    }

                    <SelectItem value="==">is</SelectItem> 
                     
                 </SelectContent>
            </Select>
            {
                type == "boolean" ?  
                <Input type={type} className="border rounded p-1 w-1/3" placeholder="true" disabled />:
                <Input type={type} className="border rounded p-1 w-1/3" onChange={handleChange}/>
            }
            
            
        </div>
    )
}

export default FilterItem;