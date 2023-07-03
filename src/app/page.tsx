import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { Metadata } from "next";

import { apiKey, apiHost } from '../constants';

import { CurrencyWidget } from "shared-components-mezzarino";

import { Lato } from 'next/font/google'
import Link from "next/link";

const lato = Lato({
  weight: '700',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "External partner website with installed shared component",
  description: "External partner website with installed shared component"
};

export default function Home() {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8">
        <h1 className={`mx-auto text-center text-6xl font-bold tracking-tight text-black sm:text-7xl lg:text-8xl xl:text-8xl ${lato.className}`}>
          External partner website with installed shared component
        </h1>
        <p className="mt-12 mx-auto text-center"><FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4" /> Example Font Awesome free solid icon</p> 
        <p className="mt-12 mx-auto text-center">
            <Link href="/direct-example" className="p-4 border border-white bg-white text-gray-600">Direct call to the API example</Link>
        </p>    
      </main>
      <div className="mt-4 mx-auto text-black border border-black p-4">
        <CurrencyWidget apiKey={apiKey} apiHost={apiHost} />
      </div>
    </div>
  );
}
