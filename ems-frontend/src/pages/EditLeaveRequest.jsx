import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/Axios";

export default function EditLeaveRequest() {
    const { id } = useParams();
    
    const navigate = useNavigate();

    const [leaves, setLeaves] = useState();

    const [form, setForm] = useState({
        status: ""
    });

    useEffect(() => {
        fetchLeaves();
    }, [id]);
    
    const fetchLeaves = async () => {
        const res = await api.get(`/leave_requests/${id}`)
        setLeaves(res.data)
    };

    const handleChange = (e) => {
        setForm({[e.target.name]: e.target.value})

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.patch(`/leave_requests/${id}`, form)
            alert("Leave request updated successfully")
            navigate("/leave_requests")
        } catch (err) {
            console.error("Error updating leave request")
        }
    };

    if(!leaves) {
        return <div className="text-center mt-6">Loading leave request data...</div>
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Edit Leave Request Status</h1>
            <div className="mb-3">
                <p><strong>Employee:</strong>{leaves?.employee_name}</p>
                <p><strong>Department:</strong>{leaves?.department_name}</p>
                <p><strong>Start Date:</strong>{leaves?.start_date}</p>
                <p><strong>End Date:</strong>{leaves?.end_date}</p>
                <p><strong>Type:</strong>{leaves?.type}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block mb-1 font-medium">Status</label>
                <select 
                name="status"
                value={form.status}
                onChange={handleChange}
                className="border p-2 w-full rounded">
                    <option value="">-- Select Status --</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>

                <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
                    Update Leave Request
                </button>
            </form>
        </div>
    )

};