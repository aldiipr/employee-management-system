import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/Axios";


export default function EditAttendance() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [attendance, setAttendance] = useState();
    const [form, setForm] = useState({
        status: ""
    });

    useEffect(() => {
        fetchAttendance();
    }, [id]);

    const fetchAttendance = async () => {
        const res = await api.get(`/attendance/${id}`)
        setAttendance(res.data)
    };

    const handleChange = (e) => {
        setForm({[e.target.name]: e.target.value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.patch(`/attendance/${id}`, form);
            alert("Attendance updated successfully")
            navigate("/attendance");
        } catch (err) {
            console.error("Error updating attendance")
        };
    };
    if(!attendance) {
        return <div className="text-center mt-6">Loading attendance data...</div>
    }
    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Edit Attendance Status</h1>
            <div className="mb-3">
                <p><strong>Employee:</strong>{attendance?.employee_name}</p>
                <p><strong>Date:</strong>{attendance?.date}</p>
                <p><strong>Check In:</strong>{attendance?.check_in}</p>
                <p><strong>Check Out:</strong>{attendance?.check_out}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block mb-1 font-medium">Status</label>
                <select 
                name="status"
                value={form.status}
                onChange={handleChange}
                className="border p-2 w-full rounded">
                    <option value="">-- Select Status --</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Leave">Leave</option>
                </select>

                <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
                    Update Attendance
                </button>
            </form>
        </div>
    );
};