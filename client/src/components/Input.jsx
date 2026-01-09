import React from 'react';

const Input = ({
    label,
    type = 'text',
    error,
    className = '',
    id,
    ...props
}) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    type={type}
                    id={id}
                    className={`
            w-full bg-crypto-light border rounded px-3 py-2.5 text-white 
            placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-crypto-accent/50 focus:border-crypto-accent
            transition-all duration-200
            ${error ? 'border-crypto-red' : 'border-gray-700'}
          `}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1 text-xs text-crypto-red">{error}</p>
            )}
        </div>
    );
};

export default Input;
