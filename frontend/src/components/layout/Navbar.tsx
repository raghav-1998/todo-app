export default function Navbar(){
    return(
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
            <div className="text-xl font-bold">
                Taskflow
            </div>
            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                    User
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
                    U
                </div>
            </div>
        </header>
    )
}