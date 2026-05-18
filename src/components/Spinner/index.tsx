export const Spinner = ({loading}:{loading:boolean}) => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="mb-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                </div>
                <p className="text-gray-600 font-medium">Loading movies...</p>
            </div>
        </div>
    )
}