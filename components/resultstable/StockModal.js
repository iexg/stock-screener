import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useState } from "react"
import { Button } from "../ui/button"
import axios from "axios"

const StockModal = ({ stock }) => {
    const [selectedStock, setSelectedStock] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    // const [showModal, setShowModal] = useState(false)

    const handleStockClick = async () => {
        if (Object.keys(selectedStock).length == 0) {
            setIsLoading(true)
            console.log('send call')

            axios.get(
                `https://api.iex.cloud/v1/data/CORE/QUOTE/${stock}?token=${process.env.NEXT_PUBLIC_IEX_COULD_API_KEY}`,
            ).then((response) => {
                const data = response.data
                console.log(response)
                setSelectedStock(data[0])
                setIsLoading(false)
            }).catch((err) => {
                console.log("Error in request", err);
                setIsLoading(false)
            });
        }
        else {
            console.log('dont send')
        }
    }

    return (
        <Dialog>
            <DialogTrigger onClick={handleStockClick}><div className="text-slate-900 underline-offset-4 hover:underline">{stock}</div>
            </DialogTrigger>
            <DialogContent>
                {(!isLoading && Object.keys(selectedStock).length == 0) ?
                    <DialogHeader>
                        <DialogTitle><div className="flex items-center text-muted-foreground">Unable to get stock data.</div>
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    :
                    (isLoading ?
                        <DialogHeader><DialogTitle><div className="flex items-center text-muted-foreground">Loading...</div></DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader> :
                        <DialogHeader>
                            <DialogTitle><div className="my-3">{selectedStock.companyName}</div>
                                <div className="border-l-2 my-2 pl-1 ">Price : $ {selectedStock.latestPrice}</div>
                            </DialogTitle>
                            <DialogDescription>
                                Summary -

                                    <li>
                                        Open: ${selectedStock.iexOpen}
                                    </li>
                                    <li>
                                        Bid: ${selectedStock.iexBidPrice}
                                    </li>
                                    <li>
                                        Ask: ${selectedStock.iexAskPrice}
                                    </li>
                                    <li>
                                        High: ${selectedStock.high}
                                    </li>
                                    <li>
                                        Low: ${selectedStock.low}
                                    </li>
                                    <li>
                                        PE Ratio: {selectedStock.peRatio}
                                    </li>
                                    <li>
                                        Volume: {selectedStock.volume}
                                    </li>

                            </DialogDescription>
                        </DialogHeader>)
                }
            </DialogContent>
        </Dialog>

    )
}

export default StockModal