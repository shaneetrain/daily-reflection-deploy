import {
    addDays,
    endOfMonth,
    endOfWeek,
    startOfDay,
    startOfMonth,
    startOfWeek,
} from "date-fns";

// Returns a function that returns an array of 7 days that begins at the beginning of the current week.

function takeWeek(start = new Date()) {
    let date = startOfWeek(startOfDay(start));

    return function () {
        const week = [...Array(7)].map((_, i) => addDays(date, i));
        date = addDays(week[6], 1);
        return week;
    };
}

//Used to get the last day of an array in takeMonth

function lastDayOfRange(range) {
    return range[range.length - 1][6];
}

// Returns a function that returns an array of weeks that last for the full month.
// Each function call of the returned function gets the month after the previous function call.

function takeMonth(start = new Date()) {
    let month = [];
    let date = start;

    return function () {
        const weekGen = takeWeek(startOfMonth(date));
        const endDate = startOfDay(endOfWeek(endOfMonth(date)));
        month.push(weekGen());

        while (lastDayOfRange(month) < endDate) {
            month.push(weekGen());
        }
        const range = month;
        month = [];
        date = addDays(lastDayOfRange(range), 1);
        return range;
    };
}

export { takeMonth, takeWeek };
