import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

function HotelList() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    datafetch();
  }, []);

  const datafetch = async () => {
    try {
      const { data } = await axios.get(
        "http://127.0.0.1:4000/api/hotels/admin/all"
      );

      setHotels(data.hotels);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-span-9">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
        <div>
          <Link to='/hotels/create'>
          <button className="px-4"> Create</button>
          </Link>
        </div>
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="py-3 px-6">
                ID
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Stars
              </th>
              <th scope="col" className="py-3 px-6">
                Descriptions
              </th>
              <th scope="col" className="py-3 px-6">
                Phone
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Address
              </th>
              {/* <th scope="col" className="py-3 px-6">
                place
              </th> */}
            </tr>
          </thead>
          <tbody>
            {hotels &&
              hotels.map((hotel) => (
                <tr className="bg-white border-b ">
                  <td className="py-4 px-6">{hotel.id} </td>
                  <td className="py-4 px-6">{hotel.name} </td>
                  <td className="py-4 px-6">{hotel.stars}</td>
                  <td className="py-4 px-6">{hotel.description} </td>
                  <td className="py-4 px-6">{hotel.phone} </td>
                  <td className="py-4 px-6">{hotel.email} </td>
                  <td className="py-4 px-6">{hotel.address} </td>
                  {/* <td className="py-4 px-6">{hotel.place} </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HotelList;
