function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}

String.prototype.replaceAll = function (search, replacement) {
    let target = this
    return target.split(search).join(replacement)
}

String.prototype.toHex = function (fieldLength) {
    if (isNumeric(this)) {
        if (fieldLength && fieldLength > 0)
            return (new Array(fieldLength).fill('0').toString().replaceAll(',', '') + (parseInt(this)).toString(16)).slice((-1) * fieldLength)
        return (parseInt(this)).toString(16)
    }
    return null
}
