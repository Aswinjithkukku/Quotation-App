import Dashboard from "../pages/Dashboard";
import CreateHotel from "../pages/Hotels/CreateHotel";
import HotelList from "../pages/Hotels/HotelList";
import CreateTransfers from "../pages/Transfers/CreateTransfers";
import TransferList from "../pages/Transfers/TransferList";
import MainLayout from "./MainLayout";

const ThemeRoutes = [
    {
        path: "",
        element: (
                <MainLayout />
        ),
        children: [
            { path: "", element: <Dashboard /> },
            { path: "/hotels", element: <HotelList /> },
            { path: "/hotels/create", element: <CreateHotel /> },
            { path: "/transfer/create", element: <CreateTransfers /> },
            { path: "/transfers", element: <TransferList /> },
        ]
    }
]

export default ThemeRoutes;