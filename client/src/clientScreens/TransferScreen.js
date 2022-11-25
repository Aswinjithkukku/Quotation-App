import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  fetchTransfer,
  loadTransferPlace,
} from "../store/actions/TransferActions.js";
import TransferResultScreen from "./TransferResultScreen.js";

function TransferScreen() {
  const dispatch = useDispatch();

  const [people, setPeople] = useState(0);
  const [airportIata, setAirportIata] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [transferStatus, setTransferStatus] = useState("");
  const [returnStatus, setReturnStatus] = useState(false);

  const { place, airport, loading, error } = useSelector(
    (state) => state.transferPlace
  );
  // const { transfer } = useSelector((state) => state.transfer);

  useEffect(() => {
    dispatch(loadTransferPlace());
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);
  // console.log(transfer);

  // console.log(people, airportIata, placeName, transferStatus, returnStatus);
  const transferData = {
    people: Number(people),
    airportIata: airportIata,
    placeName: placeName,
    transferStatus: transferStatus,
    returnStatus:returnStatus
  }

  const searchHandler = () => {
    dispatch(fetchTransfer(transferData))
  }

  return (
    <Fragment>
      {loading ? (
        "loading...."
      ) : (
        <div className="max-w-screen-2xl mx-auto">
            <div className="mt-20 grid grid-cols-5 gap-10 border-2 border-purple-800 py-10 px-5">
              <div className="mb-4">
                <label
                  htmlFor="airportField"
                  className="text-lg font-bold text-gray-400"
                >
                  Peoples
                </label>
                <input
                  id="airportField"
                  type="number"
                  className="block p-2 w-full text-white bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 placeholder-white"
                  placeholder="Enter Number of People"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                />
              </div>
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
                  placeholder="Enter airport"
                  value={airportIata}
                  onChange={(e) => setAirportIata(e.target.value)}
                >
                  <option value="">Choose airport</option>
                  {airport &&
                    airport.map((port) => (
                      <option key={port.id} value={port.iata}>
                        {port.iata}
                        {port.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="placeField"
                  className="text-lg font-bold text-gray-400"
                >
                  Place
                </label>
                <select
                  id="placeField"
                  className="block p-2 w-full  text-white bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter place"
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                >
                  <option value="">Choose Place</option>
                  {place &&
                    place.map((pl) => (
                      <option key={pl.id} value={pl.place}>
                        {pl.place}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="typeField"
                  className="text-lg font-bold text-gray-400"
                >
                  Type of Travel
                </label>
                <select
                  id="typeField"
                  className="block p-2 w-full  text-white bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter type"
                  value={transferStatus}
                  onChange={(e) => setTransferStatus(e.target.value)}
                >
                  <option value="">Choose Type of Travel</option>
                  <option value="private">private</option>
                  <option value="shared">shared</option>
                </select>
              </div>
              <div className="last flex items-center">
                <div className="mb-4">
                  <label
                    htmlFor="retuenField"
                    className="text-lg font-bold text-gray-400"
                  >
                    Return
                  </label>
                  <input
                    id="retuenField"
                    type="checkbox"
                    className="block mt-3 bg-gray-400  border border-gray-300 scale-150 "
                    checked={returnStatus}
                    onChange={(e) => setReturnStatus(!returnStatus)}
                  />
                </div>
                <button
                  className="ml-14 bg-purple-600 text-white font-medium px-3 py-2 rounded-lg"
                    onClick={searchHandler}
                >
                  Search
                </button>
              </div>
            </div>
          <div>
            <TransferResultScreen
              people={people}
              airportIata={airportIata}
              placeName={placeName}
              transferStatus={transferStatus}
              returnStatus={returnStatus}
              // transfer={transfer}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default TransferScreen;
