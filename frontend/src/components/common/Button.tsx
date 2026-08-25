type ButtonProps =
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: "primary" | "secondary" | "danger";
    };

export default function Button({
    variant = "primary",
    className = "",
    ...props
}: ButtonProps) {
    const variants = {
        primary:
            "bg-gray-900 text-white hover:bg-gray-800",
        secondary:
            "border bg-white text-gray-900 hover:bg-gray-50",
        danger:
            "bg-red-600 text-white hover:bg-red-700",
    };

    return (
        <button
            className={[
                "rounded-lg px-4 py-2 text-sm font-medium",
                "transition-colors",
                variants[variant],
                className,
            ].join(" ")}
            {...props}
        />
    );
}