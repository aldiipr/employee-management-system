import { useState, useEffect } from "react"
import { Menu, LogOut, User } from "lucide-react"
import { Link } from "react-router-dom";
import Login from "../pages/Login";


export default function Navbar ({toggleSidebar}) {

    const [user, setUser] = useState();
    
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if(storedUser) {
            setUser(JSON.parse(storedUser))
        };
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem("user");
        window.location.href="/Login";
    };

    return (
        <nav className="bg-slate-800 text-white flex items-center justify-between p-4">

            <button onClick={toggleSidebar} className="md:hidden">
                <Menu size={24}/>
            </button>
            <h1 className="font-bold text-lg">
                Dashboard
            </h1>
            <div>
                {user ? (
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <User className="text-gray-600 " size={20}/>
                            <span className="font-medium">{user.name}</span>
                            <span className="text-sm text-gray-500">({user.role})</span>
                        </div>
                        <button
                        onClick={handleLogOut}
                        className="flex items-center gap-1 bg-slate-700 hover:bg-slate-800 text-white px-3 py-1 rounded-lg">
                            <LogOut size={16}/>
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/Login"
                    className="bg-blue-500 hover:bg-blue-600text-white px-3 py-1 rounded-lg">
                        Login
                    </Link>
                )}
            </div>
        </nav>

    );
};