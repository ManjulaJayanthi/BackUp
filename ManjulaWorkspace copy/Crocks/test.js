const compose = require('crocks/helpers/compose')

const Either = require('crocks/Either')

const { ifElse } = require('crocks/logic')
const { isNumber, isTruthy } = require('crocks/predicates')

const err = () => 'error'
const sum = x => y => 'success';

const validate = ifElse(
    isTruthy,
    Either.Right,
    compose(Either.Left, err)
)


const result = compose(
    sum(null),
    validate
)

//console.log(result('hello'))


console.log(result(false))