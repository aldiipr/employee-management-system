import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import api from "../api/Axios";



export default function Departments() {
    const [department, setDepartment] = useState([]);

    const fetchDepartment = async () => {
        try {
            const res = await api.get("/departments");
            setDepartment(res.data);
        } catch (err) {
            console.error("Error fetching departments:", err)
        }
    };
    
    const deleteDepartment = async (id) => {
        if(!window.confirm("Are you sure you want to delete this data?")) return;

        try {
            await api.delete(`/departments/${id}`);
            fetchDepartment();
        } catch (err) {
            console.error("Failed to delete:", err)
        }
    };

    useEffect(() => {
        fetchDepartment();
    }, []);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Departments</h1>
                <Link
                to="/departments/add"
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">
                    + Add Department
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2">Name</th>
                            <th className="p-2">Manager</th>
                            <th className="p-2">Total Employee</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {department.map(d => (
                            <tr key={d.id} className="border-b text-center">
                                <td className="p-2">{d.name}</td>
                                <td className="p-2">{d.manager_name}</td>
                                <td className="p-2">{d.total_employee}</td>
                                <td className="p-2 text-center space-x-3 items-center">
                                    <Link
                                    to={`/departments/edit/${d.id}`}
                                    className="text-blue-500 hover:underline">
                                        Edit
                                    </Link>
                                    <button
                                    onClick={() => deleteDepartment(d.id)}
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