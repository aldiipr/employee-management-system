import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/Axios";


export default function AddAttendance() {   
    const navigate = useNavigate();
    
    const [employee, setEmployee] = useState([]);
    const [form, setForm] = useState({
        employee_id: "",
        date: "",
        status: "",
        check_in: "",
        check_out: "",
    });

    useEffect(() => {
        fetchEmployee();
    }, []);

    const fetchEmployee = async () => {
        const res = await api.get(`/employees`);
        setEmployee(res.data)
    };

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/attendance", form);
            alert("Attendance added successfully")
            navigate("/attendance");
        } catch (err) {
            console.error("Error adding attendance")
        };
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Add Attendance</h1>
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
                    ))};
                </select>

                <input 
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required />

                <input 
                type="time"
                name="check_in"
                value={form.check_in || ""}
                onChange={handleChange}
                className="border p-2 w-full rounded" />

                <input 
                type="time"
                name="check_out"
                value={form.check_out || ""}
                onChange={handleChange}
                className="border p-2 w-full rounded" />

                <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
                    Save Attendance
                </button>
            </form>
        </div>
    )
}