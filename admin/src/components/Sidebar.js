import React from "react";
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

import { sidebarLinks } from "../data";
function Sidebar() {
    const location = useLocation();

    return (
        <div className="bg-[#1a1c23] fixed top-0 left-0 h-[100vh] w-[100%] max-w-[15em] flex flex-col">
            <div className="px-6 py-6 flex items-center gap-[10px]">
                <img src={"https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonarchive.com%2Ftag%2Fimage&psig=AOvVaw3MHewklTCDIN9z7TujrHgM&ust=1669449330372000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCJjsssTtyPsCFQAAAAAdAAAAABAN"} alt="" className="w-[27px] min-w-[27px]" />
                <h1 className="font-bold text-xl">
                Quotation
                </h1>
            </div>
            <div className="flex-1">
                <ul>
                    {sidebarLinks?.map((link, index) => {
                        return (
                            <li key={index}>
                                <Link
                                    to={link.to}
                                    className={
                                        "relative flex items-center gap-[15px] px-6 py-[14px] text-[15px] transition-all  cursor-pointer " +
                                        (location.pathname === link.to
                                            ? "text-[#fff]"
                                            : "text-[#9e9e9e] hover:text-white")
                                    }
                                >
                                    {link.icon}
                                    {link.name}

                                    {location.pathname === link.to && (
                                        <span className="absolute top-0 left-0 h-full bg-primaryColor w-[4px] rounded-r"></span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="px-6 py-5">
                <button className="flex items-center justify-center gap-[10px] w-[100%]">
                    <FiLogOut /> Log Out
                </button>
            </div>
        </div>
    );
}

export default Sidebar;