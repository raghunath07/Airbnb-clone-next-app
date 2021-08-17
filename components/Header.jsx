import Image from "next/image";
import { SearchIcon } from "@heroicons/react/solid"
import {
    GlobeAltIcon,
    MenuIcon,
    UserCircleIcon,
    UsersIcon
} from "@heroicons/react/solid"
import { useState } from "react";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useRouter } from 'next/router'

function Header({placeHolder}) {
    const [searchInput, setSearchInput] = useState('')
    const [guests, setGuests] = useState(1)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const router = useRouter()

    const handleChange = (ranges) => {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    const search = () => {
        router.push({
            pathname: "/search",
            query:{
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                guests: guests
            }
        });
    }

    const resetInput = () => {
        setSearchInput('')
        setStartDate(new Date())
        setEndDate(new Date())
        setGuests(1)
    }

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    }
    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
            <div onClick={() => router.push("/")} className="relative flex items-center h-10 cursor-pointer my-auto">
                <Image src="https://links.papareact.com/qd3"
                layout="fill"
                objectFit="contain"
                objectPosition="left"
                />
            </div>
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input className="pl-5 outline-none bg-transparent flex-grow text-gray-600 placeholder-gray-400" type="text" placeholder={placeHolder || "start your search"} value={searchInput} 
                onChange={(e) => setSearchInput(e.target.value)}
                />
                <SearchIcon className="hidden lg:inline-block h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2"/>
            </div>
            <div className="flex items-center justify-end space-x-4 text-gray-500">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer"/>
                <div className="flex space-x-2 border-2 p-2 rounded-full">
                    <MenuIcon className="h-6"/>
                    <UserCircleIcon className="h-6"/>
                </div>
            </div>
            {searchInput && 
            <div className="flex flex-col col-span-3 mx-auto">
                <DateRangePicker
                    ranges={[selectionRange]}
                    minDate={new Date()}
                    rangeColors={["#FD5B61"]}
                    onChange={handleChange}
                />
                <div className="flex items-center border-b mb-4">
                    <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
                    <UsersIcon className="h-5"/>
                    <input className="w-12 pl-2 text-lg outline-none text-red-400" type="number" value={guests} 
                    onChange={(e) => setGuests(e.target.value)} min={1}/>
                </div>
                <div className="flex">
                    <button onClick={resetInput} className="flex-grow">Cancel</button>
                    <button onClick={search} className="flex-grow text-red-400">Search</button>
                </div>
            </div>
            }
        </header>
    )
}

export default Header
