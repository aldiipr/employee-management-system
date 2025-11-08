import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/Axios";



export default function EmployeeDetail() {
    const { id } = useParams();
    const [employee, setEmployee] = useState({});

    useEffect(() => {
        fetchEmployee();
    }, [id]);

    const fetchEmployee= async () => {
        try {
            const res = await api.get(`/employees/${id}`);
            setEmployee(res.data);
        } catch (err) {
            console.error("Error fetching employees")
        }
    };

    if(!employee || Object.keys(employee).length === 0) {
        return <p>Loading employee details...</p>
    }


    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Employee Detail</h1>
            <div className="bg-white rounded-lg p-6 shadow space-y-2">
                <p><strong>Name:</strong> {employee.name}</p>
                <p><strong>Department:</strong> {employee.department}</p>
                <p><strong>Position:</strong> {employee.position}</p>
                <p><strong>Email:</strong> {employee.email}</p>
                <p><strong>Gender:</strong> {employee.gender}</p>
                <p><strong>Address:</strong> {employee.address}</p>
                <p><strong>Hire Date:</strong> {employee.hire_date?.split("T")[0] || ""}</p>
                <p><strong>Salary:</strong> {employee.salary}</p>
            </div>
        </div>
    )
}