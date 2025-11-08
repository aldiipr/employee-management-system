import { useEffect, useState } from "react";
import api from "../api/Axios";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";


export default function Attendance() {
    const [attendance, setAttendance] = useState([]);

    const fetchAttendance = async () => {
        try {
            const res = await api.get("/attendance");
            setAttendance(res.data)
        } catch (err) {
            console.error("Error fetching attendance")
        }
    };

    const deleteAttendance = async (id) => {
        if(!window.confirm("Are you sure you want to delete this data?"));

        try {
            await api.delete(`/attendance/${id}`);
            fetchAttendance();
        } catch (err) {
            console.error("Failed to delete:", err)
        };
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Attendance</h1>
                <Link
                to={"/attendance/add"}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded">
                    + Add Attendance
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2">Name</th>
                            <th className="p-2">Department</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Date</th>
                            <th className="p-2">Check In</th>
                            <th className="p-2">Check Out</th>  
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.map(a => (
                            <tr key={a.id} className="border-b text-center">
                                <td className="p-2">{a.employee_name}</td>
                                <td className="p-2">{a.department_name}</td>
                                <td className="p-2">{a.status}</td>
                                <td className="p-2">{a.date?.split("T")[0] || ""}</td>
                                <td className="p-2">{a.check_in}</td>
                                <td className="p-2">{a.check_out}</td>
                                <td className="p-2 text-center space-x-3 items-center">
                                    <Link
                                    to={`/attendance/edit/${a.id}`} 
                                    className="text-blue-500 hover:underline">
                                        Edit
                                    </Link>
                                    <button
                                    onClick={() => deleteAttendance(a.id)}
                                    className="text-red-500 hover:bg-slate-50">
                                        <Trash2 size={20}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};