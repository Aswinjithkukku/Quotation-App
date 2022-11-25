import { useRoutes } from "react-router-dom";
import ThemeRoutes from "./routes/Router";

export default function App() {
    const routing = useRoutes(ThemeRoutes);

    return routing;
}