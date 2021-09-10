import React from "react";
import { useLocation } from "react-router";
import Spacer from "../components/Spacer";
import { format, parseISO } from "date-fns";

const ViewReflection = (props) => {
    let location = useLocation();
    const { responses, date } = location.state.reflection;

    return (
        <div className="bg-gray-50 h-screen">
            <Spacer height={8} />
            <div className="flex items-center flex-col justify-center">
                <p className="font-bold text-3xl py-6">
                    {format(parseISO(date), "LLLL' 'do', 'yyyy")}
                </p>
            </div>
            <div className="flex justify-center ">
                <div className="flex items-start justify-center flex-col md:w-128 lg:w-192 w-4/5">
                    {responses.map((q) => {
                        return (
                            <div className="py-6">
                                <div className="font-semibold pb-2 text-accent">
                                    {q.question}
                                </div>
                                <div>{q.answer}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ViewReflection;
