export default function Table({ headers = [], data = [], actions = {} }) {
    if (headers.length === 0) {
        return (
            <div className="w-full text-center py-8 text-gray-500">
                No headers provided
            </div>
        )
    }

    const hasActions = actions.onEdit || actions.onDelete || actions.onView
    const totalColumns = headers.length + (hasActions ? 1 : 0)

    return (
        <div className="w-full overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
                        <thead className="bg-gray-800">
                            <tr>
                                {headers.map((header, index) => (
                                    <th
                                        key={header.key || index}
                                        className="px-3 py-3 sm:px-6 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-gray-200 whitespace-nowrap"
                                    >
                                        {header.label || header}
                                    </th>
                                ))}
                                {hasActions && (
                                    <th className="px-3 py-3 sm:px-6 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-gray-200 whitespace-nowrap sticky right-0 bg-gray-800">
                                        Actions
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={totalColumns}
                                        className="px-3 py-8 sm:px-6 text-center text-gray-500"
                                    >
                                        No data available
                                    </td>
                                </tr>
                            ) : (
                                data.map((row, rowIndex) => (
                                    <tr
                                        key={rowIndex}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        {headers.map((header, colIndex) => {
                                            const key = header.key || header
                                            const value = row[key] !== undefined ? row[key] : ''
                                            const renderCell = header.render
                                                ? header.render(value, row, rowIndex)
                                                : value

                                            return (
                                                <td key={colIndex} className="px-3 py-4 sm:px-6 text-sm text-gray-900">
                                                    <div className="max-w-xs sm:max-w-md md:max-w-lg truncate"
                                                        title={typeof renderCell === 'string' ? renderCell : undefined}
                                                    >
                                                        {renderCell}
                                                    </div>
                                                </td>
                                            )
                                        })}
                                        {hasActions && (
                                            <td className="px-3 py-4 sm:px-6 whitespace-nowrap text-sm text-gray-900 sticky right-0 bg-white hover:bg-gray-50">
                                                <div className="flex items-center gap-1 sm:gap-2">
                                                    {actions.onView && (
                                                        <button
                                                            onClick={() => actions.onView(row, rowIndex)}
                                                            className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-600 text-white rounded hover:bg-blue-800 transition-colors text-xs font-medium"
                                                            title="View"
                                                        >
                                                            <span className="hidden sm:inline">View</span>
                                                            <span className="sm:hidden">V</span>
                                                        </button>
                                                    )}
                                                    {actions.onEdit && (
                                                        <button
                                                            onClick={() => actions.onEdit(row, rowIndex)}
                                                            className="px-2 py-1 sm:px-3 sm:py-1 bg-yellow-600 text-white rounded hover:bg-yellow-800 transition-colors text-xs font-medium"
                                                            title="Edit"
                                                        >
                                                            <span className="hidden sm:inline">Edit</span>
                                                            <span className="sm:hidden">E</span>
                                                        </button>
                                                    )}
                                                    {actions.onDelete && (
                                                        <button
                                                            onClick={() => actions.onDelete(row, rowIndex)}
                                                            className="px-2 py-1 sm:px-3 sm:py-1 bg-red-600 text-white rounded hover:bg-red-800 transition-colors text-xs font-medium"
                                                            title="Delete"
                                                        >
                                                            <span className="hidden sm:inline">Delete</span>
                                                            <span className="sm:hidden">D</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
