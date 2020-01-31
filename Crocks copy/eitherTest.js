const fs = require('fs')
const util = require('util')
const path = require('path')

const compose = require('crocks/helpers/compose')
const map = require('crocks/pointfree/map')
const maybe = require('crocks/Maybe')
const either = require('crocks/Either')
const Pred = require('crocks/predicates')
const { ifElse, not, isString } = require('crocks/logic')

const { fromPromise } = require('crocks/Async')

const dirName = path.join(__dirname, "Files")

const fileArray = ['file.txt']

const promiseAllRead = (file) => {
    return util.promisify(fs.readFile)(path.join(dirName, file), 'utf8');
}

// promiseAllRead(fileArray[0]).then(wholeContent => {
//     //writeF(wholeContent)
// });

const err1 = val =>
    `${val} error`

const success = val => //`${typeof val} SUCCESS`
    util.promisify(fs.writeFile)(path.join(dirName, 'result.txt'), 'success')

const validate1 = ifElse(
    Pred.isPromise,
    success,
    //compose(either.Right,success),
    compose(either.Left, err1)
)

const flow = compose(
    map(promiseAllRead),
    validate1
)

//flow('file1.txt')

const readFileWithContent = (fileName) => util.promisify(fs.readFile)(path.join(dirName, fileName), 'utf8')

const operation = fileName => readFileWithContent(fileName).then(content => util.promisify(fs.writeFile)(path.join(dirName, 'result.txt'), content))

const readFileWithContentAsync = fromPromise(readFileWithContent)

const writeFileContentAsync = fromPromise(content => util.promisify(fs.writeFile)(path.join(dirName, 'result.txt'), content))

const operationAsync = fileName => readFileWithContentAsync(fileName).chain(content => writeFileContentAsync(content))

operationAsync("file.txt").fork(console.log,console.error)



