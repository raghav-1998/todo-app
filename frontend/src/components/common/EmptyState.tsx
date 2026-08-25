type EmptyStateProps = {
    title: string;
    description?: string;
};

export default function EmptyState({
    title,
    description,
}: EmptyStateProps) {
    return (
        <div className="rounded-xl border border-dashed bg-white p-10 text-center">
            <h3 className="font-semibold">
                {title}
            </h3>

            {description && (
                <p className="mt-2 text-sm text-gray-500">
                    {description}
                </p>
            )}
        </div>
    );
}