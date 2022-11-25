import {
    BsShop,
    BsGrid,
    BsListUl,
    BsPeople,
    BsCompass,
    BsGear,
    BsArrowLeft,
} from "react-icons/bs";

const sidebarLinks = [
    {
        name: "Dashboard",
        to: "/",
        icon: <BsGrid />,
    },
    {
        name: "Hotels",
        to: "/hotels",
        icon: <BsShop />,
    },
    {
        name: "Transfers",
        to: "/transfers",
        icon: <BsListUl />,
    },
];

export default sidebarLinks;