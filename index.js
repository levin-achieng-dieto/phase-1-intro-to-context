// Your code here
// const employee = ["Gray", "Worm", "Security", 1]
function createEmployeeRecord(employee){
    const employeeRecords = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecords
}

function createEmployeeRecords(empRecords){
    return empRecords.map(empRecords => createEmployeeRecord(empRecords))
}

function createTimeInEvent(employeeRecord, datestamp){
    let timeInEvent = {
        type: "TimeIn",
        hour: parseInt((datestamp).split(" ")[1]),
        date: datestamp.split(" ")[0]
    }
    employeeRecord.timeInEvents.push(timeInEvent)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, datestamp){
    let timeOutEvent = {
        type: "TimeOut",
        hour: parseInt((datestamp).split(" ")[1]),
        date: datestamp.split(" ")[0]
    }
    employeeRecord.timeOutEvents.push(timeOutEvent)
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, givendate){
    const timeInHours = employeeRecord.timeInEvents.find((event) => {
        return event.date === givendate
    })
    const timeOutHours = employeeRecord.timeOutEvents.find((event) => {
        return event.date === givendate
    })

    return (timeOutHours - timeInHours) / 100
}

function wagesEarnedOnDate(employeeRecord, givendate){
    const earnedWages = hoursWorkedOnDate * employeeRecord.payPerHour
    return parseFloat(earnedWages.toString()) 
}

function allWagesFor(employees){
    let eligibleDates = employees.timeInEvents.map(event => {
        return event.date
    })
    let peyableHours = eligibleDates.reduce((memo, date) => {
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)
    return peyableHours
}

function calculatePayroll (employeeRecords){
    return employeeRecords.reduce((memo, record) =>{
        return memo + allWagesFor(record)
    }, 0)
}