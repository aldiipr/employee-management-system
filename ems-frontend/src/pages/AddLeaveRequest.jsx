import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/Axios";


export default function AddLeaveRequest() {
    const navigate = useNavigate();

    const [employee, setEmployee] = useState([]);
    
    const [form, setForm] = useState({
        employee_id: "",
        start_date: "",
        end_date: "",
        type: "",
        status: "Pending",
    });

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        const res = await api.get("/employees");
        setEmployee(Array.isArray(res.data) ? res.data: [res.data]);
    };

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/leave_requests", form);
            alert("Leave request add successfully");
            navigate("/leave_requests");
        } catch (err) {
            console.error("Error adding leave request");
        };
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Add Leave Request</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <select 
                name="employee_id"
                value={form.employee_id}
                onChange={handleChange}
                className="border p-2 w-full rounded">
                    <option value="">-- Select Employee --</option>
                    {employee.map((e) => (
                        <option key={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
                </select>

                <input 
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required />

                <input 
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required />

                <select 
                name="type"
                value={form.type}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                >
                    <option value="">-- Select Type --</option>
                    <option value="Annual">Annual</option>
                    <option value="Sick">Sick</option>
                    <option value="Maternity">Maternity</option>
                    <option value="Bereavement">Bereavement</option>
                    <option value="Marriage">Marriage</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Unpaid">Unpaid</option>
                </select>

                <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
                    Save Leave Request
                </button>
            </form>
        </div>
    )
};