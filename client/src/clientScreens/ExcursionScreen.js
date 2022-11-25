import React from 'react'

function ExcursionScreen() {
  return (
    <div className="max-w-screen-2xl mx-auto">
    <div className="mt-20  border-2 border-purple-800 py-10 px-5">
      <div className="grid grid-cols-5 gap-10">
        <div className="mb-4">
          <label
            htmlFor="airportField"
            className="text-lg font-bold text-gray-400"
          >
            Place Name
          </label>
          <select
            id="airportField"
            className="block p-2 w-full  text-white bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter airport"
          >
            <option value="">Choose place</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="bedroomsField"
            className="text-lg font-bold text-gray-400"
          >
            Time
          </label>
          <input
            id="bedroomsField"
            type="time"
            className="block p-2 w-full text-white bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 placeholder-white"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="hotelsField"
            className="text-lg font-bold text-gray-400"
          >
            Excursions
          </label>
          <select
            id="hotelsField"
            className="block p-2 w-full  text-white bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Choose excursion</option>
          </select>
        </div>

       
        <div className="mb-4">
          <label
            htmlFor="retuenField"
            className="text-lg font-bold text-gray-400"
          >
            Number of person
          </label>
          <input
            id="retuenField"
            type="number"
            className="block p-2 w-full  text-white bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center">
          <button className=" bg-purple-600 text-white font-medium px-20 py-2 rounded-lg">
            Search
          </button>
        </div>

      </div>

    </div>
    <div>second part</div>
  </div>
  )
}

export default ExcursionScreen