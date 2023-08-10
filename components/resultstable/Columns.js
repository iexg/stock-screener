"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import StockModal from "./StockModal"
import axios from "axios"

const formatter = Intl.NumberFormat("en", {notation:"compact",
minimumFractionDigits:2, 
maximumFractionDigits:3})
const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

export const columns = [
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => {
      const symbol = row.getValue("symbol")
      return <StockModal stock={symbol} />
    },
  },

  {
    accessorKey: "change",
    header: "Change",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("change"))
      const formatted = amount.toFixed(2)

      return amount >= 0 ? <div className="text-green-600"> ${formatted}</div> :
        <div className="text-red-600">${formatted}</div>

    },
  },
  {
    accessorKey: "day200MovingAvg",
    header: "200 Day Moving Avg",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("day200MovingAvg"))
      const formatted = currencyFormatter.format(amount)

      return <div>{formatted}</div>
    }
  },
  {
    accessorKey: "avgTotalVolume",
    header: "Avg Total Volume",
    cell: ({ row }) => {
      const amount = row.getValue("avgTotalVolume")
      const formatted = formatter.format(amount)

      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "marketCap",
    header: "MarketCap",
    cell: ({ row }) => {
      const amount = row.getValue("marketCap")
      const formatted = formatter.format(amount)

      return <div>${formatted}</div>
    },
  },
  {
    accessorKey: "changePercent",
    header: "Change %",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("changePercent"))
      const formatted = amount.toFixed(2)

      return amount >= 0 ? <div className="text-green-600">&#x25B2; {formatted}</div> :
        <div className="text-red-600">&#x25BC; {formatted}</div>

    },
  },
  {
    accessorKey: "latestPrice",
    header: () => <div className="text-right">$ Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("latestPrice"))
      const formatted = currencyFormatter.format(amount)

      return <div className="text-right font-semibold">{formatted}</div>
    },

  },
]
