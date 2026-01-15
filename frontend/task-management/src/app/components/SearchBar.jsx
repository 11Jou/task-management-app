export default function SearchBar({ 
    value, 
    onChange, 
    placeholder = "Search", 
    className = "",
    ...props 
}) {
    return (
        <input 
            type="text" 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`px-4 py-2 w-68 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none ${className}`}
            {...props}
        />
    )
}
