export function GrabLogo({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M8 14C8 10.6863 10.6863 8 14 8C17.3137 8 20 10.6863 20 14V20H14C10.6863 20 8 17.3137 8 14Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8 34C8 37.3137 10.6863 40 14 40C17.3137 40 20 37.3137 20 34V28H14C10.6863 28 8 30.6863 8 34Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <rect
                x="14"
                y="20"
                width="6"
                height="8"
                stroke="currentColor"
                strokeWidth="2.5"
            />

            <path
                d="M40 16V28C40 30.2091 38.2091 32 36 32H28"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M32 28L28 32L32 36"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
