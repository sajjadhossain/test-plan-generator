const schedule = require('node-schedule')
const shell = require('shelljs')
const type = process.argv[2]
let job

job = schedule.scheduleJob('0 0 0 * * *', () => {
  shell.exec('npm run generate:testPlan')
  setTimeout(() => {
    shell.exec('npm run confluence:writeTestPlans')
  }, 30000)
})
