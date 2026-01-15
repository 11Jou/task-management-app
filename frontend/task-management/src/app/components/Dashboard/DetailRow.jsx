export default function DetailRow({ label, value, badge = false }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <span className="w-40 text-sm font-medium text-gray-500">
                {label}
            </span>
            {badge ? (
                <span className="inline-block w-fit px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                    {value}
                </span>
            ) : (
                <div className="flex-1 text-gray-800 break-words">
                    {value || '—'}
                </div>
            )}
        </div>
    )
}