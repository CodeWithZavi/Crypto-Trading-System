import React from 'react';

const Loader = ({ size = 'md', center = false }) => {
    const sizes = {
        sm: 'h-5 w-5',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    const loaderHtml = (
        <div className={`relative ${sizes[size]}`}>
            <div className="absolute inset-0 border-2 border-gray-700/50 rounded-full"></div>
            <div className="absolute inset-0 border-2 border-crypto-accent rounded-full border-t-transparent animate-spin"></div>
        </div>
    );

    if (center) {
        return (
            <div className="flex justify-center items-center w-full h-full min-h-[100px]">
                {loaderHtml}
            </div>
        );
    }

    return loaderHtml;
};

export default Loader;
