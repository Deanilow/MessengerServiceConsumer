const moment = require('moment-timezone');

const getFormattedDateWithOffset = () => {
    // Get current date and time in UTC
    const currentUtcDate = moment.utc();

    // Get the offset in minutes for the local timezone
    const offsetMinutes = moment().utcOffset();

    // Convert the offset to the format ±HH:MM
    const formattedOffset = moment().format('Z');

    // Format the date and time in the desired format
    const formattedDate = currentUtcDate.format('YYYY-MM-DD HH:mm:ss.SSSSSSS');

    // Combine the formatted date and the formatted offset
    const dateWithOffset = `${formattedDate} ${formattedOffset}`;

    return dateWithOffset;
};

module.exports = { getFormattedDateWithOffset } 
