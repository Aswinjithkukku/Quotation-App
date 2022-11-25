import React, { Fragment } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { clearErrors, fetchTransfer } from "../store/actions/TransferActions";
import { SlPeople, SlPaperPlane, SlLocationPin } from "react-icons/sl";
import { RiCarWashingLine } from "react-icons/ri";
import { TbTruckReturn } from "react-icons/tb";
import { BsCashCoin } from "react-icons/bs";

function TransferResultScreen({people, airportIata, placeName, transferStatus, returnStatus}) {
  // const dispatch = useDispatch()

  // const { loading, error, transfer } = useSelector( state => state.transfer)

  // const transferData = {
  //   people, airportIata, placeName, transferStatus, returnStatus
  // }

  // useEffect(() => {
  //   dispatch(fetchTransfer(transferData))
  //   if(error){
  //     dispatch(clearErrors())
  //   }
  // }, [dispatch, error])

  // console.log(people, airportIata, placeName, transferStatus, returnStatus);
  // console.log(transfer);
  return (
    <Fragment>
      <div className="mt-10 p-5 bg-slate-300 text-purple-900">
        <div className="grid grid-cols-3 gap-10">
          <div className="first">
            <div className="flex items-center mt-5">
              <span className="text-xl font-bold">
                <SlPeople />
              </span>
              <span className="text-lg font-bold ml-2">
                Number of Peoples :{" "}
              </span>
              <span className="text-lg font-bold ml-2"> 3</span>
            </div>
            <div className="flex items-center mt-5">
              <span className="text-xl font-bold">
                <SlPaperPlane />
              </span>
              <span className="text-lg font-bold ml-2">Airport : </span>
              <span className="text-lg font-bold ml-2"> 3</span>
            </div>
            <div className="flex items-center mt-5">
              <span className="text-xl font-bold">
                <SlLocationPin />
              </span>
              <span className="text-lg font-bold ml-2">Destination : </span>
              <span className="text-lg font-bold ml-2"> 3</span>
            </div>
          </div>
          <div className="second">
            <div className="flex items-center mt-5">
              <span className="text-xl font-bold">
                <RiCarWashingLine />
              </span>
              <span className="text-lg font-bold ml-2">Type of travel : </span>
              <span className="text-lg font-bold ml-2"> 3</span>
            </div>
            <div className="flex items-center mt-5">
              <span className="text-xl font-bold">
                <TbTruckReturn />
              </span>
              <span className="text-lg font-bold ml-2">Return Needed : </span>
              <span className="text-lg font-bold ml-2"> 3</span>
            </div>
            <div className="flex items-center mt-5">
              <span className="text-xl font-bold">
                <BsCashCoin />
              </span>
              <span className="text-lg font-bold ml-2">Price : </span>
              <span className="text-lg font-bold ml-2"> 3</span>
            </div>
          </div>
          <div className="thrid"></div>
        </div>
      </div>
    </Fragment>
  );
}

export default TransferResultScreen;
