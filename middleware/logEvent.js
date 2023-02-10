const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs"); //core modules for writing to a file
const fsPromises = require("fs").promises;
const path = require("path");

const logEvent = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try {
        //Checks if the log folder exits and if it doesnt exist, the id statement will create a new l
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem)
    } catch (err) {
        console.log(err);
    }

}

const logger = (req, res, next) => {
    logEvent(`${req.method}\t ${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next(); // Why we are adding the next function is to ensure that the next request is called, without the next function the program automiatically stops here
    //For the built in custom middlew ares, You dont need a next function cause the next is areay built in the middlewre
}


// console.log(uuid())
// console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));
// console.log("This is testing")


module.exports = {logger, logEvent};