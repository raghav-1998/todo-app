import { NavLink } from "react-router-dom";

const navigation=[
    {
        label: "Dashboard",
        path: "/dashboard",
    },
    {
        label: "Todos",
        path: "/todos",
    },
    {
        label: "Profile",
        path: "/profile",
    },
    {
        label: "Settings",
        path: "/settings",
    },
];

export default function Sidebar(){
    return(
        <aside className="hidden min-h-[calc(100vh-4rem)] w-64 border-r bg-white p-4 md:block">
            <nav className="space-y-2">
                {navigation.map((item)=>(
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            [
                                "block rounded-lg px-4 py-2 text-sm",
                                isActive
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-700 hover:bg-gray-100",
                            ].join(" ")
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}