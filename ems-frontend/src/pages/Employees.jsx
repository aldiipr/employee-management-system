import { Link } from "react-router-dom";
import api from "../api/Axios";
import { useState, useEffect } from "react";
import {Trash2 } from "lucide-react";



export default function Employees() {
    const [employees, setEmployees] = useState([]);

    const fetchEmployees = async () => {
        try {
            const res = await api.get("/employees");
            setEmployees(res.data);
        } catch (err) {
            console.error("Error fetching employees:", err);
        }
    };

    const deleteEmployees = async (id) => {
        if(!window.confirm("Yakin mau hapus data ini?")) return;
        try {
            await api.delete(`/employees/${id}`);
            fetchEmployees();
        } catch (err) {
            console.error("Gagal hapus:", err)
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Employees</h1>
                <Link 
                to="/employees/add"
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">
                    + Add Employee
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 text-left">Name</th>
                            <th className="p-2 text-left">Department</th>
                            <th className="p-2 text-left">Position</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp => (
                            <tr key={emp.id} className="border-b">
                                <td className="p-2">{emp.name}</td>
                                <td className="p-2">{emp.department}</td>
                                <td className="p-2">{emp.position}</td>
                                <td className="p-2 text-center space-x-3 items-center">
                                    <Link 
                                    to={`/employees/${emp.id}`}
                                    className="text-blue-500 hover:underline">
                                        View 
                                    </Link>
                                    <Link
                                    to={`/employees/edit/${emp.id}`}
                                    className="text-blue-500 hover:underline">
                                        Edit
                                    </Link>
                                    <button
                                    onClick={() => deleteEmployees(emp.id)}
                                    className="text-red-500 hover:bg-slate-50 ">
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