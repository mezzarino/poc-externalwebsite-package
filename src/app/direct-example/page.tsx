"use client"

import { useEffect, useState } from "react";

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "External partner website but using the API directly",
  description: "External partner website but using the API directly"
};

export default function ApiExample() {

    const [exchangeRate, setExchangeRate] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const getExchangeRates = async () => {
        const response = await fetch("/api/exchangerates");

        if (!response.ok) {
            throw new Error("Failed to fetch exchange rates");
        }

        setExchangeRate(await response.json());
        setLoading(false);
    };

    const loadingRates = <li>Loading rates...</li>
    const loadedRates = exchangeRate.map((currency) => {
        return (
          <li key={currency.id}>
              {currency.currency} rate is {currency.rate}
           </li>
        );
    });

    const rateContent: JSX.Element = !loading ? loadedRates as unknown as JSX.Element : loadingRates;

    useEffect(() => {
        getExchangeRates();
    }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8">
        <h1 className="mx-auto text-center text-6xl font-bold tracking-tight text-black sm:text-7xl lg:text-8xl xl:text-8xl">
            External partner website but using the example API directly
        </h1>
        <p className="mt-12 mx-auto text-center">
            <Link href="/" className="p-4 border border-white bg-white text-gray-600">Home</Link>
        </p>
      </main>
      <div className="mt-4 mx-auto text-black">
        <ul>
            {rateContent}
        </ul>
      </div>
    </div>
  );
}
