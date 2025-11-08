import React from "react";
import {Link, useLocation} from "react-router-dom";
import {Home, Users, Layers, Clock, Calendar, X} from "lucide-react";



export default function Sidebar({isOpen, toggleSidebar} ) {
    const location = useLocation();
    

    const menuItems = [
        {name: "Dashboard", path: "/", icon: <Home size={20}/>},
        {name: "Employees", path: "/employees", icon: <Users size={20}/>},
        {name: "Departments", path: "/departments", icon: <Layers size={20}/>},
        {name: "Attendance", path: "/attendance", icon: <Clock size={20}/>},
        {name: "Leaverequests", path: "/leave_requests", icon: <Calendar size={20}/>},

    ];

    return (
            <div
            className={`fixed flex flex-col justify-between top-0 left-0 h-screen bg-slate-800 text-white w-64 transform transition-transform z-40
                ${isOpen? "translate-x-0":"-translate-x-full"} md:translate-x-0 md:static md:flex flex-col`}
            >
                <div>
                    {isOpen && (
                        <button onClick={toggleSidebar} className="absolute top-4 right-4 md:hidden text-white">
                            <X size={24}/>
                        </button>
                    )}
                    {/* logo */}
                    <div className="text-2xl font-bold px-6 py-4 border-b border-slate-700">
                        EMS
                    </div>

                    {/* menu */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {menuItems.map((item) => (
                            <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700 transition`}
                            >
                                {React.cloneElement(item.icon, {
                                    color: location.pathname === item.path ? "#38bdf8" : "#ffffff"
                                })}
                                <span 
                                className={location.pathname === item.path ? "text-sky-400" : "text-white"}
                                >
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

        
    );
};