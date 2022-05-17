const createStatsCollector = require("mocha/lib/stats-collector");

// Your code here
function createEmployeeRecord(arr) {
    let record = [];
    record.firstName = arr[0];
    record.familyName = arr[1];
    record.title = arr[2];
    record.payPerHour = arr[3];
    record.timeInEvents = [];
    record.timeOutEvents = [];
    return record;
}

function createEmployeeRecords(arr) {
    let records = [];
    for (const data of arr) {
        records.push(createEmployeeRecord(data));
    }
    return records;
}

function createTimeInEvent(employeeRec, clockIn) {
    employeeRec.timeInEvents.push({ type: "TimeIn" });
    const timeIn = employeeRec.timeInEvents[0];
    const timeInDate = clockIn.split(" ")[0];
    const timeInHour = parseInt(clockIn.split(" ")[1]);
    timeIn.date = timeInDate;
    timeIn.hour = timeInHour;
    return employeeRec;
}

function createTimeOutEvent(employeeRec, clockOut) {
    employeeRec.timeOutEvents.push({ type: "TimeOut" });
    const timeOut = employeeRec.timeOutEvents[0];
    const timeOutDate = clockOut.split(" ")[0];
    const timeOutHour = parseInt(clockOut.split(" ")[1]);
    timeOut.date = timeOutDate;
    timeOut.hour = timeOutHour;
    return employeeRec;
}

function hoursWorkedOnDate(employee, date) {
    for (let i = 0; i < employee.timeInEvents.length; i++) {
        if (employee.timeInEvents[i].date === date) {
            const hoursWorked =
                employee.timeOutEvents[i].hour - employee.timeInEvents[i].hour;
            return hoursWorked / 100;
        }
    }
}

function wagesEarnedOnDate(employee) {
    for (const daysWorked of employee.timeInEvents) {
        const hours = hoursWorkedOnDate(employee, daysWorked.date);
        return hours * employee.payPerHour;
    }
}

function allWagesFor(employee) {
    let allWages = "";
    console.log(wagesEarnedOnDate(employee));
}
