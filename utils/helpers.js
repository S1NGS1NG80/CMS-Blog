module.exports = {
    // the helper method 'format_time' will take in a timestamp and return a string with only the time
    format_time: (date) => {
        // We use the 'toLocaleTimeString()' method to format the time as H:MM:SS AM/PM
        return date.toLocaleTimeString();
    },
    // the helper method 'format_date' will take in a timestamp and return a string with only the date
    format_date: (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
};
