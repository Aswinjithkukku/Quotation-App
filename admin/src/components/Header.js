import React, { useState } from "react";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { BsBellFill, BsGear, BsGrid } from "react-icons/bs";
import { Link } from "react-router-dom";


function Header() {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    return (
        <div className="w-[100%] flex items-center justify-between py-[16px] px-[20px] bg-darCardBgColor">
            <i className="text-primaryColor text-[24px] cursor-pointer flex items-center justify-center invisible">
                <FiMenu />
            </i>
            <div className="flex items-center">
                <button className="relative p-0 h-auto mr-[1.5em] text-primaryColor flex items-center justify-center bg-transparent hover:bg-transparent text-[20px]">
                    <BsBellFill />
                    <span className="absolute top-[-2px] right-[-2px] w-[10px] h-[10px] rounded-full bg-[#e03b24] border-2 border-white  "></span>
                </button>
                <div className="relative w-[35px] h-[35px] bg-[#dbdbdb] rounded-full cursor-pointer">
                    <img
                        src={"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fimage_1160358&psig=AOvVaw3MHewklTCDIN9z7TujrHgM&ust=1669449330372000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCJjsssTtyPsCFQAAAAAdAAAAABAE"}
                        alt=""
                        onClick={() => {
                            setIsDropDownOpen(!isDropDownOpen);
                        }}
                        className="w-full h-full object-cover rounded-full"
                    />
                    {isDropDownOpen && (
                        <div className="absolute bg-[#1a1c23] right-0 top-[50px] rounded w-[200px] z-10 shadow-sm">
                            <ul>
                                <li>
                                    <Link
                                        to="/admin"
                                        className="flex items-center gap-[12px] text-sm px-4 py-[12px] transition-all text-[#9e9e9e] hover:text-[#fff]"
                                    >
                                        <BsGrid />
                                        <span>Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/settings"
                                        className="flex items-center gap-[12px] text-sm px-4 py-[12px] transition-all text-[#9e9e9e] hover:text-[#fff]"
                                    >
                                        <BsGear />
                                        <span>Edit Profile</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="#"
                                        onClick={() => {
                                            // dispatch(logout());
                                        }}
                                        className="flex items-center gap-[12px] text-sm px-4 py-[12px] transition-all text-[#9e9e9e] hover:text-[#fff]"
                                    >
                                        <FiLogOut />
                                        <span>Logout</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;