/* eslint-disable no-console */
const animalHash = require('../lib')

Array.from(Array(100), () => {
  console.log(animalHash(Math.random()))
})
