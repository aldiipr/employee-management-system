import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/Axios";



export default function EditDepartment() {
    const navigate = useNavigate();

    const {id} = useParams();

    const [employee, setEmployee] = useState([]);

    const [form, setForm] = useState({
        name: "",
        manager_id: ""
    });

    useEffect(() => {
        fetchEmployee();
        fetchDepartment();
    }, [id]);

    const fetchDepartment = async () => {
        try {
            const res = await api.get(`/departments/${id}`);
            setForm({
                name: res.data.name || "",
                manager_id: res.data.manager_id || ""
            });
        } catch (err) {
            console.error("Error fetching departments", err);
        };
    };

    const fetchEmployee = async () => {
        try {
            const res = await api.get("/employees");
            setEmployee(res.data)
        } catch (err) {
            console.error("Error fetching employee");
        };
    };

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.patch(`/departments/${id}`, form);
            alert("Department updated successfully");
            navigate("/departments");
        } catch (err) {
            console.error("Error updating department");
        };
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-ld shadow">
            <h1 className="text-2xl font-bold mb-6">Edit Department</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                    type="text"
                    name="name"
                    placeholder="Name Department"
                    value={form.name || ""}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    required />

                    <select 
                    name="manager_id" 
                    value={form.manager_id}
                    onChange={handleChange}
                    className="border rounded w-full">
                        <option value="">-- Select Manager --</option>
                        {employee
                        .filter(e => e.position === 'Manager')
                        .map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Update Department
                </button>

            </form>
        </div>
    )

};