import React, { useState } from "react";
import axios from "axios"

function CreateHotel() {
  const [data, setData] = useState({
    place: "",
    name: "",
    description: "",
    phone: "",
    email: "",
    address: "",
  });
  const [details, setDetails] = useState({
    fromDate: "",
    toDate: "",
    priceOneBr: 0,
    priceTwoBr: 0,
    priceThreeBr: 0,
    priceSixBr: 0,
    priceEightBr: 0,
  });

  const submitHandler = async(e) => {
    e.preventDefault();
    try {

      const { response } = await axios.post("http://127.0.0.1:4000/api/hotels/admin/create",{hotel: data, details})

    } catch (error) {
      console.log(error);
    }
    
  };


  const onDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onDetailsChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  return (
    <div className="mx-auto max-w-screen-sm">
      <form onSubmit={submitHandler}>
        <div className="Name mb-5">
          <label
            htmlFor="input-name"
            className="text-lg font-bold text-gray-400"
          >
            place
          </label>
          <input
            type="text"
            className="block p-2 w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Name"
            id="input-name"
            name="place"
            value={data.place}
            onChange={onDataChange}
          />
        </div>
        <div className="email mb-5">
          <label
            htmlFor="input-email"
            className="text-lg font-bold text-gray-400"
          >
            name
          </label>
          <input
            type="text"
            className="block p-2 w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter email"
            id="input-email"
            name="name"
            value={data.name}
            onChange={onDataChange}
          />
        </div>
        <div className="password mb-5">
          <label
            htmlFor="input-password"
            className="text-lg font-bold text-gray-400"
          >
            description
          </label>
          <textarea
            className="block p-2  w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter descriptions"
            id="input-password"
            name="description"
            value={data.description}
            onChange={onDataChange}
          />
        </div>

        <div className="password mb-5">
          <label
            htmlFor="input-password"
            className="text-lg font-bold text-gray-400"
          >
            phone
          </label>
          <input
            type="number"
            className="block p-2  w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter phone"
            id="input-password"
            name="phone"
            value={data.phone}
            onChange={onDataChange}
          />
        </div>

        <div className="password mb-5">
          <label
            htmlFor="input-password"
            className="text-lg font-bold text-gray-400"
          >
            email
          </label>
          <input
            type="email"
            className="block p-2  w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter phone"
            id="input-password"
            name="email"
            value={data.email}
            onChange={onDataChange}
          />
        </div>

        <div className="password mb-5">
          <label
            htmlFor="input-password"
            className="text-lg font-bold text-gray-400"
          >
            Address
          </label>
          <input
            type="text"
            className="block p-2  w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter phone"
            id="input-password"
            name="address"
            value={data.address}
            onChange={onDataChange}
          />
        </div>

        <div className="password mb-5">
          <label
            htmlFor="input-password"
            className="text-lg font-bold text-gray-400"
          >
            fromDate
          </label>
          <input
            type="date"
            className="block p-2  w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter phone"
            id="input-password"
            name="fromDate"
            value={details.fromDate}
            onChange={onDetailsChange}
          />
        </div>

        <div className="password mb-5">
          <label
            htmlFor="input-password"
            className="text-lg font-bold text-gray-400"
          >
            toDate
          </label>
          <input
            type="date"
            className="block p-2  w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter phone"
            id="input-password"
            name="toDate"
            value={details.toDate}
            onChange={onDetailsChange}
          />
        </div>
        <div className="password mb-5">
          <label
            htmlFor="input-password"
            className="text-lg font-bold text-gray-400"
          >
            Single Bedroom Price
          </label>
          <input
            type="number"
            className="block p-2  w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter phone"
            id="input-password"
            name="priceOneBr"
            value={details.priceOneBr}
            onChange={onDetailsChange}
          />
        </div>
        <div className="password mb-5">
          <label
            htmlFor="input-password"
            className="text-lg font-bold text-gray-400"
          >
            Double Bedroom Price
          </label>
          <input
            type="number"
            className="block p-2  w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter phone"
            id="input-password"
            name="priceTwoBr"
            value={details.priceTwoBr}
            onChange={onDetailsChange}
          />
        </div>
        <div className="password mb-5">
          <label
            htmlFor="input-password"
            className="text-lg font-bold text-gray-400"
          >
            Trio Bedroom Price
          </label>
          <input
            type="number"
            className="block p-2  w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter phone"
            id="input-password"
            name="priceThreeBr"
            value={details.priceThreeBr}
            onChange={onDetailsChange}
          />
        </div>
        <div className="password mb-5">
          <label
            htmlFor="input-password"
            className="text-lg font-bold text-gray-400"
          >
            Six Bedroom Price
          </label>
          <input
            type="number"
            className="block p-2  w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter phone"
            id="input-password"
            name="priceSixBr"
            value={details.priceSixBr}
            onChange={onDetailsChange}
          />
        </div>
        <div className="password mb-5">
          <label
            htmlFor="input-password"
            className="text-lg font-bold text-gray-400"
          >
            Eight Bedroom Price
          </label>
          <input
            type="number"
            className="block p-2  w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter phone"
            id="input-password"
            name="priceEightBr"
            value={details.priceEightBr}
            onChange={onDetailsChange}
          />
        </div>

        <button
          type="submit"
          value="Submit"
          className="text-2xl font-bold bg-gray-600 hover:bg-blue-600 duration-300 text-gray-300 py-2 rounded-lg w-full mb-4"
          // disabled={loading ? true : false}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default CreateHotel;
