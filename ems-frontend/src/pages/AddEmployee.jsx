import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/Axios";


export default function AddEmployee () {
    const navigate = useNavigate();
    const [department, setDepartment] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        gender: "",
        phone: "",
        address: "",
        department_id: "",
        position: "",
        hide_date: "",
        salary: ""
    });


    useEffect(() => {
        fetchDepartments();
    }, []);


    const fetchDepartments = async () => {
        try {
            const res = await api.get("/departments");
            setDepartment(res.data);
        } catch (err) {
            console.error("Error fetching departments", err);
        }
    };


    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/employees", form);
            alert("Employee added successfully");
            navigate("/employees");
        } catch (err) {
            console.error("Error adding employee", err)
        }
    };


    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Add Employee</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    required />

                    <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select 
                    name="gender" 
                    value={form.gender}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    required>
                        <option value="">-- Select Gender --</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input 
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    required />
                </div>

                < textarea
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required/>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select 
                    name="department_id"
                    value={form.department_id}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    required>
                        <option value="">-- Select Department --</option>
                        {department.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>

                    <select 
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    className="border rounded p-2 w-full">
                        <option value="">-- Select Position --</option>
                        <option value="Manager">Manager</option>
                        <option value="Assistant Manager">Assistant Manager</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Assistant Supervisor">Assistant Supervisor</option>
                        <option value="Staff">Staff</option>
                        <option value="Intern">Intern</option>
                    </select>
                </div>

                <input 
                type="date"
                name="hire_date"
                value={form.hire_date}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required />

                <input
                type="number"
                name="salary"
                placeholder="Salary"
                value={form.salary || ""}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
                />

                <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Save Employee
                </button>
            </form>
        </div>
    );
};