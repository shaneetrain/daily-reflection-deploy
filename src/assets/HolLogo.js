import React from "react";

const HolLogo = ({ width, height }) => {
    return (
        <div className=" flex justify-center items-center">
            <svg
                width={width}
                height={height}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/Svg"
            >
                <circle cx="12" cy="12" r="12" fill="#F59E0B" />
            </svg>
            <div className="text-sm px-3">Clarity</div>
        </div>
    );
};

export default HolLogo;
