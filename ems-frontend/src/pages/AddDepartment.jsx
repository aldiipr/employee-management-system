import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/Axios";



export default function AddDepartment() {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState([]);
    const [form, setForm] = useState({
        name: "",
        manager_id: ""
    });

    useEffect(() => {
        fetchEmployee();
    }, []);

    const fetchEmployee = async () => {
        try {
            const res = await api.get("/employees");
            setEmployee(res.data);
        } catch (err) {
            console.error("Error fetching employees", err)
        };
    };


    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form, 
            manager_id: form.manager_id === "" ? null : form.manager_id
        }
        try {
            await api.post("/departments", form);
            alert("Department added successfully");
            navigate("/departments");
        } catch (err) {
            console.error("Error adding department");
        };
    };


    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Add Department</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input 
                    type="text"
                    name="name"
                    placeholder="Department Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                     />

                    <select 
                    name="manager_id"
                    value={form.manager_id}
                    onChange={handleChange}
                    className="border rounded w-full">
                        <option value="">-- Select Manager --</option>
                        {employee.map((e) => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
                    Save Department
                </button>
            </form>
        </div>
    )
    
}