import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";

const DatePicker = () => {
    const [date, setDate] = useState(new Date());

    const handleDate = (newDate) => {
        setDate(newDate);
        console.log(date);
    };

    return (
        <div>
            <Calendar date={date} onChange={handleDate} />
        </div>
    );
};

export default DatePicker;
