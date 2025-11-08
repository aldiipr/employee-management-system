import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";



const data = [
    {name: "Mon", attendance: 92},
    {name: "Tue", attendance: 88},
    {name: "Wed", attendance: 99},
    {name: "Thu", attendance: 90},
    {name: "Fri", attendance: 95}
];

export default function ChartAttendance() {
    return (
        <div className="bg-white shadow rounded-2xl p-5 hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-4">Weekly Attendance</h2>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis domain={[80, 100]}/>
                        <Tooltip />
                        <Line type="monotone" dataKey="attendance" stroke="#38bdf8" strokeWidth={3}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};