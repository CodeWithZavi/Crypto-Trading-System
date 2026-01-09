import React from 'react';

const Card = ({ children, className = '', ...props }) => {
    return (
        <div className={`bg-crypto-light rounded-lg shadow-sm border border-gray-800 ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Card;
