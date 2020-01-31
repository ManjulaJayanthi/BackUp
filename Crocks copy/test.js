const fs = require('fs')
const util = require('util')
const path = require('path')

const compose = require('crocks/helpers/compose')
const map = require('crocks/pointfree/map')
const chain = require('crocks/pointfree/chain')

const maybe = require('crocks/Maybe')
const either = require('crocks/Either')
const Pred = require('crocks/predicates')
const { ifElse, not } = require('crocks/logic')

const dirName = path.join(__dirname, "Files")
const { Left, Right } = either


const x = (val) => 10 + 20

const err = () => `error occured`

const validation = ifElse(
    Pred.isNumber,
    Right,
    compose(Left, err)
)

const result = compose(
    map(x),
    validation
)

//console.log(result(10))

const { Just, Nothing } = maybe
//MayBe

const safe = () => ifElse(Pred.isNumber, Just, Nothing)

const safeNumber = safe(70)

console.log(safeNumber)


