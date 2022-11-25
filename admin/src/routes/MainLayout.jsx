import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../components";

export default function MainLayout() {
    return (
        <div>
            <Sidebar />
            <main className="ml-[15em]">
                <Header />
                <Outlet />
            </main>
        </div>
    );
}