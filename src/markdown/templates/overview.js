// Libraries
const fs = require('fs')
const MarkdownIt = require('markdown-it')
const md = new MarkdownIt()
// Our modules
const todaysDate = require('./date')
const generateTeamSection = require('./team')
const fetchEnvironments = require('./environments')
const getVersions = require('../../../test-rails-support/api/unity/src/getVersions')
// Test plan variables
const htmlDir = './html'
const sectionsDir = htmlDir + '/sections/'
const generalCompatibility = fs.readFileSync('src/markdown/templates/compatibility.md', 'utf8')
let versionsMarkdown
let overview

getVersions.then((artifacts) => {
  const versions = []
  const versionsHeader =
      '| Artifact ID | Version | Jenkins Build # |\n' +
      '| --- | --- | --- |\n'

  for(let i = 0; i < artifacts.length; i += 1) {
    versions.push(
        '| ' + artifacts[i].artifact.id + ' | ' + artifacts[i].build.productVersion + ' | ' + artifacts[i].build.jenkinsBuildNumber + ' |\n'
    )
  }

  versionsMarkdown = versionsHeader + versions.join('')
})

const generateOverviewSection = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(overview)
  }, 4000)
})

const getOverview = (planObject, projectOverview) => {
  let planName = planObject.plan.name.replace(/ /g, '-').toLowerCase()

  generateOverviewSection.then((overview) => {
    overview =
      md.render('# Overview') +
      md.render('## Authors') +
      md.render(
        '| Name | Email |\n' +
        '| --- | --- |\n' +
        '| ' + planObject.user.name + ' | ' +  planObject.user.email + ' |\n'
      ) +
      md.render('## Versions') +
      md.render('### Document') +
      md.render(
        '| Date | Version |\n' +
        '| --- | --- |\n' +
        '| ' + todaysDate + ' | 0.0.1 |\n'
      ) +
      md.render('## Team') +
      md.render(generateTeamSection(projectOverview)) +
      md.render('## Abstract') +
      md.render(projectOverview.product.abstract) +
      md.render('[Read More...](' + projectOverview.product.overviewLink + ')') +
      md.render('## Tools') +
      md.render('See [here](https://wiki.mbww.com/display/AS/On-Boarding+Resources+for+QA).') +
      md.render('### Additionally') +
      md.render('#### Dependencies') +
      md.render(
        '* [core-ui-test-library](' + projectOverview.product.devDependencies['core-ui-test-library'] + ')\n' +
        '* [core-api-test-library](' +
        projectOverview.product.devDependencies['core-api-test-library'] + ')'
      ) +
      md.render('#### Pages') +
      md.render(
        '* [Test Rails](' + projectOverview.product.projectPages.testRails + ')\n' +
        '* [JIRA Agile Board](' + projectOverview.product.projectPages.jiraAgileBoard + ')\n' +
        '* [Confluence Page](' + projectOverview.product.projectPages.confluencePage + ')'
      ) +
      md.render('## Environment') +
      md.render(fetchEnvironments(projectOverview)) +
      md.render('### EUT') +
      md.render(versionsMarkdown) +
      md.render('### Compatibility') +
      md.render(generalCompatibility)

    fs.writeFile(sectionsDir + planName + '-overview.html', overview, (error) => {
      if (error) throw error
    })
  })
}

module.exports = getOverview
