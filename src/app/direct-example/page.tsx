"use client"

import { useEffect, useState } from "react";

import Link from "next/link";
import Header from "../components/header";

export default function ApiExample() {

    const [exchangeRate, setExchangeRate] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const checkRateCache = () => {
      const cache = localStorage.getItem("exchangeRates");
      if (cache) {
        const cacheData = JSON.parse(cache);
        const cacheTime = cacheData.time;
        const currentTime = new Date().getTime();
  
        if (currentTime - cacheTime <= 15 * 60 * 1000) {
          setExchangeRate(cacheData.data);
          setLoading(false);
        } else {
          localStorage.removeItem("exchangeRates");
          getExchangeRates();
        }
      } else {
        getExchangeRates();
      }
    };
  
    const getExchangeRates = async () => {
      const response = await fetch("/api/exchangerates");
  
      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates");
      }
  
      const data = await response.json();
  
      const cacheData = {
        time: new Date().getTime(),
        data: data,
      };
      localStorage.setItem("exchangeRates", JSON.stringify(cacheData));
  
      setExchangeRate(data);
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
      checkRateCache();
    }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8">
        
        <Header title="External partner website but using the example API directly" />

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
