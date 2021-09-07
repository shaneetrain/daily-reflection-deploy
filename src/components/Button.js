import React from "react";

const Button = ({ text, onClick }) => {
    return (
        <div>
            <button
                onClick={onClick}
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                {text}
            </button>
        </div>
    );
};

export default Button;
