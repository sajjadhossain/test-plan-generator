// Libraries
const fs = require('fs')
const { prompt } = require('prompts')
// Prompt questions
const questions = require('../fixtures/questions')
// Response objects
let user
let access
let plan
// Test plan
const testRailsRoot = './test-rails-support/'
const axs = require(testRailsRoot.replace('./', '../../') + 'access.js')
const htmlDirectory = 'html/'
const plansDirectory = 'plans/'
const accessPath = testRailsRoot + 'access.json'
const userPath = testRailsRoot + 'user.json'
const plansPath = plansDirectory + 'project.json'
let projectOverview
let projectQATeam
let planContent

(async() => {
  const response = await prompt(questions)
  access = {}
  user = {}
  plan = {}
  // Append to our secure and ignored access
  access.marketplace_user = {
    user: axs.marketplace[0],
    password: axs.marketplace[1]
  }
  access.universal_user = response.email
  access.jira_password = response.jira_password
  access.jira_server_ID = axs.jira_server_ID
  access.test_rails_password = response.test_rails_password
  // Append to our user object
  user.name = response.lastName + ', ' + response.firstName
  user.email = response.email[0]
  // Append to our plan
  plan.project = response.project[0]
  plan.project_name = response.project[1]

  // Write out access.json in test-rails-support
  fs.writeFile(accessPath, JSON.stringify(access), (error) => {
    if (error) throw error
  })
  // Write out user.json in test-rails-support
  fs.writeFile(userPath, JSON.stringify(user), (error) => {
    if (error) throw error
  })
  // Write out plan.json in plans/
  fs.writeFile(plansPath, JSON.stringify(plan), (error) => {
    if (error) throw error
  })
})()
