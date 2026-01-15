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
        <div className="w-full overflow-x-auto">
            <table className="border-collapse w-full min-w-max border border-gray-300">
                <thead className="bg-gray-800">
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={header.key || index}
                                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-gray-200"
                            >
                                {header.label || header}
                            </th>
                        ))}
                        {hasActions && (
                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-gray-200">
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
                                className="px-6 py-8 text-center text-gray-500"
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
                                        <td key={colIndex} className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                                            <div className="truncate"
                                                title={typeof renderCell === 'string' ? renderCell : undefined}
                                            >
                                                {renderCell}
                                            </div>
                                        </td>
                                    )
                                })}
                                {hasActions && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div className="flex items-center gap-2">
                                            {actions.onView && (
                                                <button
                                                    onClick={() => actions.onView(row, rowIndex)}
                                                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-800 transition-colors text-xs font-medium"
                                                    title="View"
                                                >
                                                    View
                                                </button>
                                            )}
                                            {actions.onEdit && (
                                                <button
                                                    onClick={() => actions.onEdit(row, rowIndex)}
                                                    className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-800 transition-colors text-xs font-medium"
                                                    title="Edit"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                            {actions.onDelete && (
                                                <button
                                                    onClick={() => actions.onDelete(row, rowIndex)}
                                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-800 transition-colors text-xs font-medium"
                                                    title="Delete"
                                                >
                                                    Delete
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
    )
}
