import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, loadAirport, fetchHotels } from '../store/actions/HotelActions'

function HotelScreen() {

  const dispatch = useDispatch()
  const { loading, airport, error } = useSelector( (state) => state.airport)
  const { loading: hotelLoading, error: hotelError, hotels } = useSelector( (state) => state.hotels)

  // const [ data, setdata ] = useState([])
  const [ airports, setAirports ] = useState('')
  
  useEffect(() => {
    dispatch(loadAirport())
    if (error) {
      dispatch(clearErrors())
    }
    dispatch(fetchHotels(airports))
  },[dispatch, error, airports])

    // const getHotels = async(airportIata) => {
    //   const config = {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   };
  
    //   const { data } = await axios.post("/api/hotels/enquiry",{airportIata}, config)

    //   setdata(data)
    // }


  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="mt-20  border-2 border-purple-800 py-10 px-5">
        <div className="grid grid-cols-5 gap-10">
          <div className="mb-4">
            <label
              htmlFor="airportField"
              className="text-lg font-bold text-gray-400"
            >
              Airport
            </label>
            <select
              id="airportField"
              className="block p-2 w-full  text-white bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
              value={airports}
              onChange={(e) => {
                setAirports(e.target.value)
              }}
            >
              <option value="">Choose airport</option>
          
              {airport && airport.map((data) => (
                <option key={data.id} value={data.iata}>{ data.iata} </option>
              ))}

            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="hotelsField"
              className="text-lg font-bold text-gray-400"
            >
              Hotels
            </label>
            <select
              id="hotelsField"
              className="block p-2 w-full  text-white bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose hotels</option>
              {hotelLoading ? (
                  <option>Loading.. </option>
              ) : (
                hotels && hotels.map((data) => (
                  <option>{data.name} </option>
                ))
              )}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="bedroomsField"
              className="text-lg font-bold text-gray-400"
            >
              Single Bedrooms
            </label>
            <input
              id="bedroomsField"
              type="number"
              className="block p-2 w-full text-white bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 placeholder-white"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="bedroomsField"
              className="text-lg font-bold text-gray-400"
            >
              Double Bedrooms
            </label>
            <input
              id="bedroomsField"
              type="number"
              className="block p-2 w-full text-white bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 placeholder-white"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="bedroomsField"
              className="text-lg font-bold text-gray-400"
            >
              Trio Bedrooms
            </label>
            <input
              id="bedroomsField"
              type="number"
              className="block p-2 w-full text-white bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 placeholder-white"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="bedroomsField"
              className="text-lg font-bold text-gray-400"
            >
              Six Person Bedrooms
            </label>
            <input
              id="bedroomsField"
              type="number"
              className="block p-2 w-full text-white bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 placeholder-white"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="bedroomsField"
              className="text-lg font-bold text-gray-400"
            >
              Eight person Bedrooms
            </label>
            <input
              id="bedroomsField"
              type="number"
              className="block p-2 w-full text-white bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 placeholder-white"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="placeField"
              className="text-lg font-bold text-gray-400"
            >
              Date of checkIn
            </label>
            <input
              id="placeField"
              type="date"
              className="block p-2 w-full  text-white bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter place"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="typeField"
              className="text-lg font-bold text-gray-400"
            >
              Date of CheckOut
            </label>
            <input
              id="typeField"
              type="date"
              className="block p-2 w-full  text-white bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter type"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="retuenField"
              className="text-lg font-bold text-gray-400"
            >
              Number o person
            </label>
            <input
              id="retuenField"
              type="number"
              className="block p-2 w-full  text-white bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
          <div className="text-center mt-4">
            <button className="ml-14 bg-purple-600 text-white font-medium px-36 py-2 rounded-lg">
              Search
            </button>
          </div>
      </div>
      <div>second part</div>
    </div>
  );
}

export default HotelScreen;
