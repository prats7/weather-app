import React, { useState, useEffect } from 'react'

export default function Home() {

    const [location, setLocation] = useState(null);
    const [search, setSearch] = useState("New Delhi");

    useEffect(() => {
        const fetchApi = async () => {
            const url = `api.openweathermap.org/data/2.5/weather?q=${search}&appid=7dbce6d14a96b162a8d4e4c57523ca0c`
            const response = await fetch(url);
            console.log(response);
        }
        fetchApi();
    }, [input])

    return (
        <div class="bg-green-100 min-h-screen p-12 flex items-center justify-center ">
            <div class="rounded-md min-h-screen bg-gray-50 max-w-md w-full space-y-8 ">
                <div class="p-8">
                    <div class="bg-white flex items-center rounded-md shadow-xl">
                        <input
                            class="rounded-md w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
                            id="search"
                            type="text"
                            placeholder="Search"
                        />
                        <div>
                            <button class="text-black hover:bg-blue-200 mx-2 w-8 h-8 flex items-centerfocus:outline-none justify-center">
                                <img src="https://www.flaticon.com/svg/vstatic/svg/126/126474.svg?token=exp=1611863623~hmac=d6214cabd36debd614f58fb2815ab9a3"></img>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="rounded-md mt-6 mx-6 bg-gray-100 shadow-xl ">
                    <h2>{location}</h2>
                    <h1>
                        26 c
                    </h1>
                    <h3> min hbcwhd max kmked</h3>
                </div>
            </div>
        </div>


    )
}
