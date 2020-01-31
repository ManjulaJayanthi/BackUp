
const compose = require('crocks/helpers/compose')
const Either = require('crocks/Either')
const { ifElse } = require('crocks/logic')
const { isNumber } = require('crocks/predicates')
//const { map } = require('crocks/pointfree/map')

//const { Right, Left } = crocksEither

// //const { isNumber, ifElse } = crocksEither
// const err = () => 'Not a valid Type';

// const add = x => x + 10;

// const validate = ifElse(
//     isNumber,
//     Right,
//     err
// )

// const result = compose(
//     add(10),
//     validate
// )

// result(20)

// import Either from 'crocks/Either'

// import compose from 'crocks/helpers/compose'
// import ifElse from 'crocks/logic/ifElse'
// import isNumber from 'crocks/predicates/isNumber'
// import map from 'crocks/pointfree/map'

const { Left, Right } = Either

// err :: a -> String
const err = val =>
  `${typeof val} is not an accepted type`

// add :: Number -> Number -> Number
const add =
  x => x + 10

// validate :: a -> Either String Number
const validate = ifElse(
  isNumber,
  Right,
  compose(Left, err)
)

// flow :: a -> Either String Number
const flow = compose(
  add,
  validate
)

console.log(flow(32))
//=> Right 42

//console.log(flow('32'))
//=> Left "string is not an accepted type"

//flow(true)
//=> Left "boolean is not an accepted type"