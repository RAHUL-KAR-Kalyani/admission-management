import { Outlet } from "react-router-dom";
import Navbar from "./components/extra/Navbar";
import Sidebar from "./components/extra/Sidebar";
import { useState } from "react";

const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar toggleSidebar={toggleSidebar} />

            <div className="flex">
                {/* ✅ Overlay (mobile only) */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

                <main className="pt-16 w-full transition-all md:ml-64">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
