import React, { useState, useEffect } from 'react'


export default function Home() {
    const [city, setCity] = useState(null);
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: "", lng: "" }
    });
    const [search, setSearch] = useState("New Delhi");

    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            }
        })
    }

    const onError = error => {
        setLocation({
            loaded: true,
            error
        })
    }

    useEffect(() => {

        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported in your device"
            })
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        const reverseGeolocationCoords = (position) => {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=25.0960742,85.31311939999999&sensor=false&key=AIzaSyC10ztoZlGub9MAxYCM3IrQ8NeIKlHXyCs`)
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => alert(error))
        }
        const fetchWeatherApi = async () => {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=7dbce6d14a96b162a8d4e4c57523ca0c`
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setCity(data.main);
        }
        reverseGeolocationCoords();
        fetchWeatherApi();
    }, [search])

    return (
        <div className="bg-green-100 min-h-screen p-10 flex items-center justify-center ">
            <div className="rounded-md min-h-screen bg-gray-50 max-w-md w-full space-y-8 ">
                <div className="p-8">
                    <div className="bg-white flex items-center rounded-md shadow-xl">
                        <input
                            className="rounded-md w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
                            id="search"
                            type="text"
                            onChange={e => { setSearch(e.target.value) }}
                            placeholder="Search"
                        />
                        <div>
                            <button className="text-black hover:bg-blue-200 mx-2 w-8 h-8 flex items-centerfocus:outline-none justify-center">
                                <img src="https://www.flaticon.com/svg/vstatic/svg/126/126474.svg?token=exp=1611863623~hmac=d6214cabd36debd614f58fb2815ab9a3"></img>
                            </button>
                        </div>
                    </div>
                </div>
                {!city ? <p>Loading...</p> :
                    <div>
                        <div className="rounded-md mt-6 mx-6 bg-gray-100 shadow-xl ">
                            <div className="cursor-pointer border b-gray-400 rounded flex flex-col justify-center items-center text-center p-6 bg-white">
                                <div className="text-md font-bold flex flex-col text-gray-900"><span class="uppercase">Today</span> </div>
                                <h1 className="text-4xl font-bold text-gray-900 mt-3 ">{search}</h1>
                                <h1 className="text-4xl font-bold text-gray-900 mt-3 ">{city.temp}°C</h1>
                                <div class="text-2xl font-bold text-gray-900 mb-7">feels like:{city.feels_like}°C</div>
                                <h3 className="text-2xl font-bold text-gray-900 mt-3">
                                    min:{city.temp_min}
                                </h3 >
                                <h3 className="text-2xl font-bold text-gray-900 mt-2">
                                    max:{city.temp_max}
                                </h3>

                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>




    )
}
