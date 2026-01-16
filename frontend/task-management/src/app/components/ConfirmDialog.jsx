export default function ConfirmDialog({
    isOpen,
    title = "Confirm Action",
    message = "Are you sure you want to proceed?",
    onConfirm,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
    isLoading = false,
    confirmButtonClass = "bg-red-600 hover:bg-red-700",
    cancelButtonClass = "bg-gray-300 hover:bg-gray-400"
}) {
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && !isLoading) {
            onCancel?.()
        }
    }

    return (
        <div
            onClick={handleBackdropClick}
            className={`
                fixed inset-0 z-50 flex items-center justify-center
                bg-black/50 transition-opacity duration-300
                ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
        >
            <div
                className={`
                    bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6
                    transform transition-all duration-300
                    ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'}
                `}
            >
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {title}
                </h2>

                <p className="text-gray-600 mb-6">
                    {message}
                </p>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className={`px-4 py-2 rounded-md font-medium text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${cancelButtonClass}`}
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`px-4 py-2 rounded-md font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${confirmButtonClass}`}
                    >
                        {isLoading ? 'Processing...' : confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}
