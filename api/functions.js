
const axios = require('axios')
const Queue = require("promise-queue")
Queue.configure(require('vow').Promise) 

// Exemple:
// var queue = new Queue(1, 1000)
// queue.add(f => myFunction(queueName))    // NOTE.: 'myFunction' must be implemented using 'Promise'

function dateTimeDiffObj(finalDate, initialDate) {
    var ms = Math.abs(finalDate.getTime() - initialDate.getTime())
    var diff = {}

    for (diff.years = 0; ms >= 31536000000; diff.years++ , ms -= 31536000000)
    for (diff.months = 0; ms >= 2628000000; diff.months++ , ms -= 2628000000)
    for (diff.days = 0; ms >= 86400000; diff.days++ , ms -= 86400000)
    for (diff.hours = 0; ms >= 3600000; diff.hours++ , ms -= 3600000)
    for (diff.minutes = 0; ms >= 60000; diff.minutes++ , ms -= 60000)
    for (diff.seconds = 0; ms >= 1000; diff.seconds++ , ms -= 1000)
        diff.milliseconds = ms
    return diff
}

function isInternalIp(req) {
    var internalIP = "::ffff:189.90.240.161"
    var ipv4 = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress
    return (internalIP == ipv4)
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}

function timeInterval(start, end, time) {
    var start_hours = parseInt(start.split(':')[0])
    var start_minutes = parseInt(start.split(':')[1])
    var end_hours = parseInt(end.split(':')[0])
    var end_minutes = parseInt(end.split(':')[1])

    if (time)
        return (
            (new Date(time).getHours() == start_hours && new Date(time).getMinutes() >= start_minutes) ||
            (new Date(time).getHours() == end_hours && new Date(time).getMinutes() <= end_minutes) ||
            (new Date(time).getHours() > start_hours && new Date(time).getHours() < end_hours)
        )

    return (
        (new Date().getHours() == start_hours && new Date().getMinutes() >= start_minutes) ||
        (new Date().getHours() == end_hours && new Date().getMinutes() <= end_minutes) ||
        (new Date().getHours() > start_hours && new Date().getHours() < end_hours)
    )
}


module.exports = {
    dateTimeDiffObj,
    isInternalIp,
    isNumeric,
    timeInterval
}