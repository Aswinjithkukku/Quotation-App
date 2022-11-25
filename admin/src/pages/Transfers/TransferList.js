import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

function TransferList() {
  const [transfers, setTransfers] = useState([]);
  // const [place, setPlace] = useState([]);

  useEffect(() => {
    datafetch();
  }, []);

  const datafetch = async () => {
    try {
      const { data } = await axios.get(
        "http://127.0.0.1:4000/api/transfer/admin/all"
      );

      setTransfers(data.transfers);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-span-9">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
      <div>
          <Link to='/transfer/create'>
          <button className="px-4"> Create</button>
          </Link>
        </div>
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              {/* <th scope="col" className="py-3 px-6">
                ID
              </th> */}
              <th scope="col" className="py-3 px-6">
                Airport
              </th>
              <th scope="col" className="py-3 px-6">
                place
              </th>
              <th scope="col" className="py-3 px-6">
                Private
              </th>
              <th scope="col" className="py-3 px-6">
                Shared
              </th>
            </tr>
          </thead>
          <tbody>
            {transfers &&
              transfers.map((trans) => (
                <tr className="bg-white border-b ">
                  {/* <td className="py-4 px-6">{trans.id} </td> */}
                  <td className="py-4 px-6">{trans.airport} </td>
                  <td className="py-4 px-6">{trans.place} </td>
                  <td className="py-4 px-6">{trans.private} </td>
                  <td className="py-4 px-6">{trans.shared} </td>

                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransferList;
