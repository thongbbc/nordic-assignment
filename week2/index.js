
const task1 = require('./task1')
const task2 = require('./task23')
async function main() {
  await task1.answer()
  task2.readFileAndConvert()
}
main()