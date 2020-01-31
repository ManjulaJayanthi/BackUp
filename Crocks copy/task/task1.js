// Same file reading task
require('dotenv').config();

const fs = require('fs')
const path = require('path')


const Async = require('crocks/Async')
const map = require('crocks/pointfree/map')
const chain = require('crocks/pointfree/chain')
const compose = require('crocks/helpers/compose')

const fileArray = ['file1.txt', 'file2.txt']


const readFileAsync = (fileName) => {
    return Async((rej, res) => {
        (fs.readFile)(path.join(__dirname, fileName), 'utf8', (err, data) => {
            return err ? rej(err) : res(data)
        })
    })
}

const writeFileAsync = (content) => {
    return Async((rej, res) => {
        (fs.writeFile)(path.join(__dirname, 'result.txt'), content, (err) => {
            return err ? rej(err) : res('File Saved')
        })
    })
}

const validate = (fileArray) => {
    return Async.all(
        fileArray.map((file) => {
            return readFileAsync(file)
        }))
}

const validateFiles = compose(
    chain(writeFileAsync),
    Async.all,
    map(readFileAsync)
)(['file1.txt', 'file2.txt'])

validateFiles.fork(console.log, console.error)
// validateFiles(fileArray).fork()
// validate(fileArray).chain(data => writeFileAsync(data)).fork(console.log, console.error)
