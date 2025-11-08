import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import api from "../api/Axios";


export default function LeaveRequests() {
    const [leaves, setLeaves] = useState([]);

    const fetchLeave = async () => {
        try {
            const res = await api.get("/leave_requests");
            setLeaves(res.data);
        } catch (err) {
            console.error("Error fetching attendance")
        }
    };

    useEffect(() => {
        fetchLeave()
    });

    const deleteLeave = async (id) => {
        if(!window.confirm("Are you sure you want to delete this data?"));
        try {
            await api.delete(`/leave_requests/${id}`);
            fetchLeave();
        } catch (err) {
            console.error("Failed to delete:")
        }  
    };

    return (
        <div className="space-x-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Leave Requests</h1>
                <Link
                to={"/leave_requests/add"}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded">
                    + Add Leave Request
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2">Name</th>
                            <th className="p-2">Department</th>
                            <th className="p-2">Start Date</th>
                            <th className="p-2">End Date</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map(l => (
                            <tr key={l.id} className="border-b text-center">
                                <td className="p-2">{l.employee_name}</td>
                                <td className="p-2">{l.department_name}</td>
                                <td className="p-2">{l.start_date?.split("T")[0] || ""}</td>
                                <td className="p-2">{l.end_date?.split("T")[0] || ""}</td>
                                <td className="p-2">{l.status}</td>
                                <td className="p-2 text-center space-x-3 items-center">
                                    <Link
                                    to={`/leave_requests/edit/${l.id}`} 
                                    className="text-blue-500 hover:underline">
                                        Edit
                                    </Link>
                                    <button
                                    onClick={() => deleteLeave(l.id)}
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