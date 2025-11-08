import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Clock, CalendarCheck} from "lucide-react";
import CardStat from "../components/CardStat";
import ChartAttendance from "../components/ChartAttendance";



export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if(!user) {
            navigate("/Login");
        };
    }, [navigate]);
    return (
        <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <CardStat title="Total Employees" value="120" icon={<Users size={24}/>} />
                <CardStat title="Present Today" value="90" icon={<Clock size={24}/>}/>
                <CardStat title="Approved Leaves" value="5" icon={<CalendarCheck size={24}/>}/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChartAttendance />
            </div>
        </div>
    );
};