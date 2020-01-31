const Either = require('crocks/Either')
const { isNumber } = require('crocks/predicates')
const curry = require('curry')
const Maybe = require('crocks/Maybe')

const { Left, Right } = Either
//Either // Here i am using isNumber check function

const result = () => {
    isNumber(5) ? Right('success') : Left('error')
}

console.log(result)