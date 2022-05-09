const getDayEnd = (month, year) => {
    const lstDay31 = [1, 3, 5, 7, 8, 10, 12];
    const lstDay30 = [4, 6, 9, 11];
    var dayEnd = 0;
    if (lstDay30.includes(month) === true) {
        dayEnd = 30;
    } else if (lstDay31.includes(month) === true) {
        dayEnd = 31;
    } else if (month === 2 && year % 4 === 0) {
        dayEnd = 29;
    } else {
        dayEnd = 28;
    }
    return dayEnd;
};

module.exports = getDayEnd;
