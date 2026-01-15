export default function SelectOption({ 
    value, 
    onChange, 
    className = "",
    options = [],
    ...props 
}) {
    return (
        <select value={value} onChange={onChange} className={`px-2 py-2 w-32 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none ${className}`} {...props}>
            <option value="">All Status</option>
            {options.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    )
}