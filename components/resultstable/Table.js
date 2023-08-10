'use client'

import { columns } from "./Columns";
import { DataTable } from "./DataTable";

import { useState, useEffect } from "react";

import { additionalIndexToDisplay } from "../constants/constants";
import Pusher from "pusher-js";


const pusher = new Pusher(`${process.env.NEXT_PUBLIC_PUSHER_KEY}`, {
    cluster: "us2",
});

export default function ResultsTable({data, setData}) {

    const getValue = (stock, key) => {
        const stockdata = stock.data
        const set = stock.set
        return stockdata[`${set}:${key}`]
    };

    const getSymbol = (stock) => {
        const symbol = stock.set
        return symbol.split(':')[2]
    }

    useEffect(() => {
        const channel = pusher.subscribe('my-channel');

        channel.bind('my-event', (databody) => {
            // console.log(databody)
            const stock = databody.message

            const dataObject = {
                symbol: getSymbol(stock),
                latestPrice: getValue(stock, 'latestPrice')
            }

            additionalIndexToDisplay.forEach(item => {
                dataObject[item.fact] = getValue(stock, item.fact)
            })
            setData([...data, dataObject]);
            console.log(data)

        });

        return () => {
            pusher.unsubscribe('my-channel');
        };
    }, [data]);
   
    return (
      <div className="sm:container sm:mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    )
  }
  