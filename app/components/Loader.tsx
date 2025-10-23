type LoaderProps = {
    className?: string;
    spinnerClassName?: string;
};

export default function Loader({ className = '', spinnerClassName = '' }: LoaderProps) {
    return (
        <div className={`${className}`} role="status">
            <div
                className={`animate-spin rounded-full h-5 w-5 border-t-4 border-primary ${spinnerClassName}`}
                data-testid="spinner"
                aria-label="Loading"
            />
        </div>
    );
}
