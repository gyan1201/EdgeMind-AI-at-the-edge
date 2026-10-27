import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
    return {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.3,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        "aria-hidden": true,
        ...props,
    };
}

export function PackageIcon(props: IconProps) {
    return (
        <svg {...base(props)}>
            <path d="M12 2.6 20.5 7v10L12 21.4 3.5 17V7L12 2.6Z" />
            <path d="M3.7 7.1 12 11.6l8.3-4.5M12 11.6v9.7" />
            <path d="m7.7 4.9 8.4 4.6v3.2" />
        </svg>
    );
}

export function PulseIcon(props: IconProps) {
    return (
        <svg {...base(props)}>
            <path d="M2.5 12h3.2l2-6.2L11.9 18l2.7-8.1 1.7 2.1h5.2" />
        </svg>
    );
}

export function NetworkIcon(props: IconProps) {
    return (
        <svg {...base(props)}>
            <circle cx="12" cy="12" r="2.4" />
            <circle cx="4.6" cy="6.2" r="1.9" />
            <circle cx="19.4" cy="6.2" r="1.9" />
            <circle cx="12" cy="19.6" r="1.9" />
            <path d="m6.2 7.4 4 3.1M17.8 7.4l-4 3.1M12 14.4v3.3" />
        </svg>
    );
}

export function ShieldIcon(props: IconProps) {
    return (
        <svg {...base(props)}>
            <path d="M12 2.8 20 6v5.6c0 4.5-3.2 8-8 9.6-4.8-1.6-8-5.1-8-9.6V6l8-3.2Z" />
            <path d="m8.4 11.8 2.5 2.5 4.7-4.7" />
        </svg>
    );
}

export function ArrowUpRight(props: IconProps) {
    return (
        <svg {...base(props)}>
            <path d="M7 17 17 7M8.4 7H17v8.6" />
        </svg>
    );
}


export function ArrowDown(props: IconProps) {
    return (
        <svg {...base(props)}>
            <path d="M12 4v15M6.4 13.4 12 19l5.6-5.6" />
        </svg>
    );
}

export function CheckIcon(props: IconProps) {
    return (
        <svg {...base(props)}>
            <path d="m4.5 12.4 4.6 4.6L19.5 6.6" />
        </svg>
    );
}

export function LockIcon(props: IconProps) {
    return (
        <svg {...base(props)}>
            <rect x="4.6" y="10.4" width="14.8" height="9.8" rx="2" />
            <path d="M8.2 10.4V7.8a3.8 3.8 0 0 1 7.6 0v2.6M12 14.6v2.1" />
        </svg>
    );
}

export function CpuIcon(props: IconProps) {
    return (
        <svg {...base(props)}>
            <rect x="6.4" y="6.4" width="11.2" height="11.2" rx="1.8" />
            <rect x="10" y="10" width="4" height="4" rx="0.6" />
            <path d="M9.4 2.8v3.6M14.6 2.8v3.6M9.4 17.6v3.6M14.6 17.6v3.6M2.8 9.4h3.6M2.8 14.6h3.6M17.6 9.4h3.6M17.6 14.6h3.6" />
        </svg>
    );
}

export function RestartIcon(props: IconProps) {
    return (
        <svg {...base(props)}>
            <path d="M3.6 12a8.4 8.4 0 1 0 2.6-6.1" />
            <path d="M3.4 4.4v5h5" />
        </svg>
    );
}

export function AlertIcon(props: IconProps) {
    return (
        <svg {...base(props)}>
            <path d="M12 3.4 21.4 20H2.6L12 3.4Z" />
            <path d="M12 9.6v4.6M12 17.3v.1" />
        </svg>
    );
}

export function MenuIcon(props: IconProps) {
    return (
        <svg {...base(props)}>
            <path d="M3.8 7h16.4M3.8 12h16.4M3.8 17h16.4" />
        </svg>
    );
}

export function CloseIcon(props: IconProps) {
    return (
        <svg {...base(props)}>
            <path d="m5.6 5.6 12.8 12.8M18.4 5.6 5.6 18.4" />
        </svg>
    );
}

