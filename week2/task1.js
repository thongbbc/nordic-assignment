const pr = require('prompt');
const CHALK = require("chalk");

async function askForInfo() {
  pr.start();
  return new Promise((resolve, reject) => {
    pr.get([
      { name: 'name', description: 'What\'s your name?', required: true, type: 'string' },
      { name: 'yob', description: 'What\'s your year of birth?', required: true, type: 'number' },
      { name: 'homeTown', description: 'What\'s your home town?', required: true, type: 'string' },
    ], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }).then((r) => {
    pr.stop();
    return r;
  });
}

function caluclateAge(yob) {
  const currentYear = new Date().getFullYear()
  const age = currentYear - yob;
  if (age >0) {
    return {valid: true, age:CHALK.blueBright(age)}
  }
  return {valid:false, age: CHALK.red(`Your year of birth ${yob} is not valid!`)}
}

async function answer() {
  try {
    const info = await askForInfo()
    const responseAge = caluclateAge(info.yob)
    if (!responseAge.valid) {
      console.info(`Thank you. ${responseAge.age}`);
    } else {
      console.info(`Thank you. Hello ${CHALK.white(info.name)}, so you are ${responseAge.age} year-old from ${CHALK.yellow(info.homeTown)}`);
    }
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
module.exports = {
  answer
}