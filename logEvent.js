const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs"); //core modules for writing to a file
const fsPromises = require("fs").promises;
const path = require("path");

const logEvent = async (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}`;
    console.log(logItem);
    try {
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem)
    } catch (err) {
        console.log(err);
    }

}



// console.log(uuid())
// console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));
// console.log("This is testing")


module.exports = logEvent;