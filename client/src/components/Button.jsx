import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    className = '',
    type = 'button',
    onClick,
    ...props
}) => {
    const baseStyles = 'font-medium rounded transition-all duration-200 flex items-center justify-center focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-crypto-accent text-black hover:bg-yellow-400 active:bg-yellow-500 shadow-sm hover:shadow-md',
        secondary: 'bg-crypto-light text-gray-200 border border-gray-700 hover:border-gray-500 hover:text-white',
        danger: 'bg-crypto-red text-white hover:bg-red-600',
        success: 'bg-crypto-green text-white hover:bg-green-600',
        ghost: 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5',
    };

    const sizes = {
        sm: 'text-xs px-3 py-1.5',
        md: 'text-sm px-4 py-2.5',
        lg: 'text-base px-6 py-3',
        full: 'w-full py-3 text-base',
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || isLoading}
            onClick={onClick}
            {...props}
        >
            {isLoading ? (
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
            ) : null}
            {children}
        </button>
    );
};

export default Button;
