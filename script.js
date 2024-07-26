const ageCalculate = () => {
    const current = new Date();
    const inputDate = new Date(document.getElementById("date").value);

    const birthDetails = {
        date: inputDate.getDate(),
        month: inputDate.getMonth() + 1,
        year: inputDate.getFullYear()
    };

    const currentYear = current.getFullYear();
    const currentMonth = current.getMonth() + 1; // Adjusted for 0-based index
    const currentDate = current.getDate();

    if (isFutureDate(birthDetails, currentYear, currentMonth, currentDate)) {
        alert("not born yet");
        displayResult("-", "-", "-");
        return;
    }

    const { years, months, days } = calculateAge(birthDetails, currentYear, currentMonth, currentDate);

    displayResult(days, months, years);
};

const isFutureDate = (birthDetails, currentYear, currentMonth, currentDate) => {
    return (
        birthDetails.year > currentYear ||
        (birthDetails.year === currentYear &&
            (birthDetails.month > currentMonth ||
                (birthDetails.month === currentMonth &&
                    birthDetails.date > currentDate)))
    );
};

const calculateAge = (birthDetails, currentYear, currentMonth, currentDate) => {
    let years = currentYear - birthDetails.year;
    let months, days;

    if (currentMonth < birthDetails.month) {
        years--;
        months = 12 - (birthDetails.month - currentMonth);
    } else {
        months = currentMonth - birthDetails.month;
    }

    if (currentDate < birthDetails.date) {
        months--;
        const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const daysInLastMonth = getDaysInMonth(lastMonth, currentYear);
        days = daysInLastMonth - (birthDetails.date - currentDate);
    } else {
        days = currentDate - birthDetails.date;
    }

    return { years, months, days };
};

const getDaysInMonth = (month, year) => {
    const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonth[month - 1];
};

const displayResult = (bDate, bMonth, bYear) => {
    document.getElementById("years").textContent = bYear;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("days").textContent = bDate;
};

document.getElementById("age-button").addEventListener("click", ageCalculate);
