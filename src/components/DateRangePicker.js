import React from "react";
import { DateRangePicker } from "react-date-range";

const DateRange = ({ startDate, endDate, setStartDate, setEndDate }) => {
    const handleSelect = (newRange) => {
        setStartDate(newRange.selection.startDate);
        setEndDate(newRange.selection.endDate);
    };
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };

    return (
        <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
            months={1}
            direction={"horizontal"}
            showDateDisplay={true}
            rangeColors={["#2563EB"]}
        />
    );
};

export default DateRange;
