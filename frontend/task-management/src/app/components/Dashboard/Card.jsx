export default function Card({ title, icon, value, className }) {
    const Icon = icon

    return (
        <div className="flex bg-white rounded-lg shadow-md p-4 justify-between">
            <div>
                <h1 className="text-l text-gray-700">{title}</h1>
                <p className="text-2xl font-bold">{value}</p>
            </div>
            <div className="flex">
                <Icon size={40} className={className} />
            </div>
        </div>
    )
}
