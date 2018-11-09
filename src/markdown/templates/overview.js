const fs = require('fs')
const MarkdownIt = require('markdown-it')
const md = new MarkdownIt()
const todaysDate = require('../date')
const generateTeamSection = require('./team')
const generalCompatibility = fs.readFileSync('src/markdown/templates/compatibility.md', 'utf8')
const fetchEnvironments = require('./environments')
const generateOverviewSection = (planJson, projectOverview) => {
  return (
    md.render('# Overview') +
    md.render('## Authors') +
    md.render(
      '| Name | Email |\n' +
      '| --- | --- |\n' +
      '| ' + planJson.name[0] + ', ' + planJson.name[1] + ' | ' +  planJson.userName[0] + ' |\n'
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
    md.render(
      'Environment Under Test: [app.cadreon.com](https://app.cadreon.com)\n' +
      '| Application | API | UI | \n' +
      '| --- | --- | --- |\n' +
      '| Shell |  |  |\n' +
      '| CM |  |  |\n' +
      '| Creatives |  |  |\n' +
      '| Mkt |  |  |\n' +
      '| uTag |  |  |\n' +
      '| ATV |  |  |\n' +
      '| AMP |  |  |\n' +
      '| Reports |  |  |\n' +
      '| Client Reports |  |  |\n' +
      '| CFD |  |  |\n' +
      '| CSF |  |  |\n' +
      '| UM |  |  |\n' +
      '| NC |  |  |\n' +
      '| Taxonomies |  |  |\n' +
      '| PDM |  |  |\n' +
      '| PAB |  |  |\n' +
      '| TA |  |  |\n' +
      '| OPT |  |  |\n' +
      '| ICA |  |  |\n'
      ) +
    md.render('⚛	 *TODO:* Get Application Space Versions from API and collect on script run, currently the above is manually updated every sprint. 😢') +
    md.render('### Compatibility') +
    md.render(generalCompatibility)
  )
}

module.exports = generateOverviewSection
