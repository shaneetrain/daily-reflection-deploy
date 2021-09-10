import React from "react";

const FormFormik = ({
    name,
    height = "h-5/6",
    formikProps,
    question,
    error,
    test,
    width = "w-full",
    justify,
    type,
}) => {
    return (
        <div className="py-3 md:py-6 flex flex-col items-center w-11/12 h-auto">
            <label
                htmlFor={name}
                className="self-start text-md md:text-xl font-sans font-semibold text-gray-900"
            >
                {question}
            </label>
            {type === "textarea" ? (
                <textarea
                    id={name}
                    name={name}
                    type={type}
                    className={`${width} ${height} ${justify} px-4 py-2 border-2 border-accent-hover rounded-lg bg-white my-2`}
                    style={{ resize: "none", outline: "none" }}
                    {...formikProps}
                />
            ) : type === "number" || type === "text" ? (
                <input
                    id={name}
                    name={name}
                    type={type}
                    className={` ${justify} px-4 py-2 border-2 border-accent-hover rounded-lg bg-white my-2`}
                    style={{ resize: "none", outline: "none" }}
                    {...formikProps}
                />
            ) : null}
            {error ? (
                <p
                    className=" self-start text-sm font-bold text-red-500"
                    id="email-error"
                >
                    {test.slice(0, 31)}
                </p>
            ) : null}
        </div>
    );
};

export default FormFormik;
