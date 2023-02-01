const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs"); //core modules for writing to a file
const fsPromises = require("fs").promises;
const path = require("path");

const logEvent = async (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try { 
        //Checks if the log folder exits and if it doesnt exist, the id statement will create a new l
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem)
    } catch (err) {
        console.log(err);
    }

}


// console.log(uuid())
// console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));
// console.log("This is testing")


module.exports = logEvent;