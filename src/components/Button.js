import React from "react";

const Button = ({ text, onClick, h, w }) => {
    return (
        <div>
            <button
                onClick={onClick}
                className={`inline-flex justify-center h-${h} w-${w} items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-accent hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent`}
            >
                {text}
            </button>
        </div>
    );
};

export default Button;
