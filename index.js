const createStatsCollector = require("mocha/lib/stats-collector")

// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
	return {
		firstName,
		familyName,
		title,
		payPerHour,
		timeInEvents: [],
		timeOutEvents: [],
	}
}

function createEmployeeRecords(arr) {
	let records = []
	for (const data of arr) {
		records.push(createEmployeeRecord(data))
	}
	return records
}

function createTimeInEvent(record, dateTime) {
	const timeObj = {
		type: "TimeIn",
		date: dateTime.split(" ")[0],
		hour: parseInt(dateTime.slice(-4), 10),
	}
	record.timeInEvents.push(timeObj)
	return record
}

function createTimeOutEvent(record, dateTime) {
	const timeObj = {
		type: "TimeOut",
		date: dateTime.split(" ")[0],
		hour: parseInt(dateTime.slice(-4), 10),
	}
	record.timeOutEvents.push(timeObj)
	return record
}

function hoursWorkedOnDate(employee, date) {
	const timeIn = employee.timeInEvents.find((record) => {
		return record.date === date
	}).hour
	const timeOut = employee.timeOutEvents.find((record) => {
		return record.date === date
	}).hour
	return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(employee, date) {
	const hours = hoursWorkedOnDate(employee, date)
	return hours * employee.payPerHour
}

function allWagesFor(employee) {
	let pay = 0
	for (const daysWorked of employee.timeOutEvents) {
		pay += wagesEarnedOnDate(employee, daysWorked.date)
	}
	return pay
}

function calculatePayroll(recordsArray) {
	let pay = 0
	for (const employee of recordsArray) {
		pay += allWagesFor(employee)
	}
	return pay
}
