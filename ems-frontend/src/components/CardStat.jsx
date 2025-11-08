



export default function CardStat({title, value, icon}) {
    return (
        <div>
            <div className="bg-white shadow-md rounded-2xl p-5 items-center gap-4 hover:shadow-lg transition"><h2 className="text-gray-500 text-lg font-bold">{icon} {title} </h2></div>
            <div className="p-5 bg-sky-100 text-sky-500 rounded-xl">
                <h3 className=" text-center text-2xl font-semibold">{value}</h3>
            </div>
        </div>
    );
};