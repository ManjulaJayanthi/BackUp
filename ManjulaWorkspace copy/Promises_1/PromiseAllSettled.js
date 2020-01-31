const fs = require('fs')
const util = require('util')
const path = require('path')
const dirName = path.join(__dirname, "Files")

const readAllFiles = (directoryName) => {
    //Directory Promise
    return util.promisify(fs.readdir)(directoryName).then(fileNames => {
        return Promise.all(fileNames.map(file => {
            return new Promise((resolve, reject) => {
                return util.promisify(fs.readFile)(path.join(dirName, file), 'utf8');
            })
        }))
    })
}

readAllFiles(dirName).then(fileData => {
    console.log(fileData)
    fs.writeFile(path.join(__dirname, 'result.txt'), fileData, (err, data) => {
        err ? console.log("error occured") : console.log("file saved")
    });
})
