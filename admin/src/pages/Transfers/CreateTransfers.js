import React, { useEffect, useState } from "react";
import axios from "axios";

function TransfersList() {
  const [places, setPlaces] = useState([]);
  const [airports, setAirports] = useState([])
  console.log(places);
console.log(airports);

  const [data, setData] = useState({
    transferfrom: '',
    transferTo: '',
    private: '',
    shared: '',
  });
  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:4000/api/transfer"
      );
      setPlaces(response.data.place);
      setAirports(response.data.airport);
    } catch (error) {
      console.log(error);
    }
  };

  const onDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(data);
      const { response } = await axios.post(
        "http://127.0.0.1:4000/api/transfer/admin/create", data );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-screen-sm">
      <form onSubmit={submitHandler}>
        <div className="Name mb-5">
          <label
            htmlFor="input-name"
            className="text-lg font-bold text-gray-400"
          >
            Transfer From
          </label>
          <select
            className="block p-2 w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Name"
            id="input-name"
            name="transferfrom"
            value={data.transferfrom}
            onChange={onDataChange}
          >
            <option hidden>Select Airport </option>
            {airports?.map((airport) => (
              <option key={airport?.iata} value={airport?.id}>
                {airport?.name}{" "}
              </option>
            ))}
          </select>
        </div>
        <div className="email mb-5">
          <label
            htmlFor="input-email"
            className="text-lg font-bold text-gray-400"
          >
            Transfer To
          </label>
          <select
            type="text"
            className="block p-2 w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter email"
            id="input-email"
            name="transferTo"
            value={data.transferTo}
            onChange={onDataChange}
          >
            <option hidden>Select Location </option>
            {places?.map((place) => (
              <option key={place?.id} value={place?.id}>
                {place?.place}{" "}
              </option>
            ))}
          </select>
        </div>
        <div className="password mb-5">
          <label
            htmlFor="input-password"
            className="text-lg font-bold text-gray-400"
          >
            private price
          </label>
          <input
            type="number"
            className="block p-2  w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter descriptions"
            id="input-password"
            name="private"
            value={data.private}
            onChange={onDataChange}
          />
        </div>

        <div className="password mb-5">
          <label
            htmlFor="input-password"
            className="text-lg font-bold text-gray-400"
          >
            shared price
          </label>
          <input
            type="number"
            className="block p-2  w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter phone"
            id="input-password"
            name="shared"
            value={data.shared}
            onChange={onDataChange}
          />
        </div>

        <button
          type="submit"
          value="Submit"
          className="text-2xl font-bold bg-gray-600 hover:bg-blue-600 duration-300 text-gray-300 py-2 rounded-lg w-full mb-4"
          // disabled={loading ? true : false}
        >
          add
        </button>
      </form>
    </div>
  );
}

export default TransfersList;
