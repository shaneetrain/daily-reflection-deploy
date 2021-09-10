import {
    addDays,
    isAfter,
    isBefore,
    isSameMonth,
    isSameWeek,
    isSaturday,
    isSunday,
    subDays,
    getMonth,
    setMonth,
    getYear,
} from "date-fns";
import format from "date-fns/format";
import React, { useState } from "react";
import { takeMonth } from "./calendarLogic";
import {
    ArrowRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/outline";

const FunctionalCalendar = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
}) => {
    // const [startDate, setStartDate] = useState(null);
    // const [endDate, setEndDate] = useState(null);
    const [buildDate, setBuildDate] = useState(new Date());

    const monthsArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const monthGen = takeMonth(buildDate);
    const currentMonth = monthGen();

    const isSelectedDay = (day) => {
        const start = startDate ? format(startDate, "yyyy-MM-dd") : null;
        const end = endDate ? format(endDate, "yyyy-MM-dd") : null;
        const currentDay = format(day, "yyyy-MM-dd");
        const now = format(new Date(), "yyyy-MM-dd");

        if (currentDay === start) {
            return "bg-blue-600 text-white hover:bg-blue-800 rounded-l-xl font-bold";
        }
        if (currentDay === end) {
            return "bg-blue-600 text-white hover:bg-blue-800 rounded-r-lg font-bold";
        }
        if (isBefore(day, endDate) && isAfter(day, startDate)) {
            return "bg-gray-100 text-blue-600 hover:bg-gray-200 font-bold";
        }
        if (!isSameMonth(day, buildDate)) {
            return "text-gray-300 hover:bg-gray-100 rounded-full";
        }
        if (currentDay === now) {
            return "text-blue-600 underline rounded-full hover:bg-gray-100";
        } else {
            return "text-gray-900 rounded-full hover:bg-gray-100";
        }
    };

    const isOnOutside = (day) => {
        if (
            (isSunday(day) && isSameWeek(day, startDate)) ||
            (isSunday(day) && isSameWeek(day, endDate))
        ) {
            return "rounded-bl-xl";
        }
        if (
            (isSaturday(day) && isSameWeek(day, startDate)) ||
            (isSaturday(day) && isSameWeek(day, endDate))
        ) {
            return "rounded-tr-xl";
        }
        if (isSaturday(day) && isSameWeek(subDays(endDate, 7), day)) {
            return "rounded-br-xl";
        }
        if (isSunday(day) && isSameWeek(addDays(startDate, 7), day)) {
            return "rounded-tl-xl";
        }
    };

    const handleClick = (day) => {
        if (!startDate && !endDate) {
            setStartDate(day);
        }
        if (startDate && !endDate) {
            setEndDate(day);
        }
        if (!startDate && endDate) {
            setStartDate(day);
        }
        if (startDate && endDate) {
            setEndDate(null);
            setStartDate(null);
        }
    };

    const nextMonth = () => {
        setBuildDate(setMonth(buildDate, getMonth(buildDate) + 1));
    };

    const previousMonth = () => {
        setBuildDate(setMonth(buildDate, getMonth(buildDate) - 1));
    };

    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    return (
        <div>
            <div className="flex flex-col items-center bg-gray-50">
                <div className="my-12">
                    <div className=" shadow-xl flex flex-col bg-white rounded-xl">
                        <div>
                            <div className="flex justify-between items-center mt-5 font-bold text-lg">
                                <ChevronLeftIcon
                                    onClick={previousMonth}
                                    className="h-9 w-9 md:ml-8 ml-3 cursor-pointer text-blue-600 hover:bg-gray-100 p-2 rounded-full"
                                />
                                <div>
                                    {monthsArray[getMonth(buildDate)]}{" "}
                                    {getYear(buildDate)}
                                </div>
                                <ChevronRightIcon
                                    onClick={nextMonth}
                                    className="h-9 w-9 md:mr-8 mr-3 cursor-pointer text-blue-600 hover:bg-gray-100 p-2 rounded-full"
                                />
                            </div>
                            <div className="flex flex-row justify-evenly mx-5 mt-5">
                                {dayNames.map((dayOfWeek) => {
                                    return (
                                        <p className="w-9 h-9 md:w-12 md:h-12 md:text-base font-semibold text-sm justify-center items-center flex ">
                                            {dayOfWeek}
                                        </p>
                                    );
                                })}
                            </div>
                            <div className="mx-5 md:mx-5 md:mb-5">
                                {currentMonth.map((w) => {
                                    return (
                                        <div className="flex flex-row justify-evenly">
                                            {w.map((d) => {
                                                return (
                                                    <div
                                                        onClick={() =>
                                                            handleClick(d)
                                                        }
                                                        className={`${isOnOutside(
                                                            d
                                                        )}  ${isSelectedDay(
                                                            d
                                                        )} w-9 h-9 md:w-12 md:h-12 text-sm md:text-base justify-center items-center flex cursor-pointer`}
                                                    >
                                                        {format(d, "d")}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex justify-center items-center mb-6">
                            <div className="rounded-lg text-xs w-24 h-6 md:px-4 md:py-1 md:text-sm md:w-36 md:h-8 justify-center flex items-center bg-gray-100  font-semibold">
                                {startDate
                                    ? format(
                                          startDate,
                                          "MM' '/' 'dd' '/' 'yyyy"
                                      )
                                    : null}
                            </div>
                            <ArrowRightIcon className="h-8 w-11 px-3 py-1 text-blue-600" />
                            <div className="rounded-lg w-24 h-6 text-xs md:px-4 md:py-1 md:text-sm md:w-36 md:h-8 justify-center flex items-center bg-gray-100  font-semibold ">
                                {endDate
                                    ? format(endDate, "MM' '/' 'dd' '/' 'yyyy")
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FunctionalCalendar;
