module.exports = {
  product: {
    abstract: 'Reach Customization application provides insight into the optimal allocation of spend across segments or dayparts within a channel. It optimizes the allocation of gross rating points (GRP) across segments to maximize reach or minimize budget.\n' + 'It is driven by Nielsen fusion data (AMP 1.0 data stack), which provides media consumption information for TV, online, and mobile channels in the US market. Currently, Reach Customization is only available in the US market.\n' + 'Reach Customization also supports the addition of system-generated ATV segments to show how reach can be extended when planning for TV.',
    overviewLink: 'https://wiki.mbww.com/pages/viewpage.action?spaceKey=AS&title=Reach+Customization',
    risks: {
      0: 'Legacy code involved as a model for AUT',
      1: 'Math Engine is a blackbox',
      2: 'Time difference between Math Team and PSL Team time zones is great',
      3: 'Third Party Integrations - both internal and external'
    },
    devDependencies: {
      'core-api-test-library': 'https://github.com/Cadreon/core-api-test-library',
      'core-ui-test-library': 'https://github.com/Cadreon/core-ui-test-library'
    },
    projectPages: {
      testRails: 'http://testrail.cadreon.com/testrail/index.php?/projects/overview/52',
      jiraAgileBoard: 'https://projects.mbww.com/projects/RC/issues',
      confluencePage: 'https://wiki.mbww.com/display/PRODUCT/Reach+Customization'
    },
    outOfScope: 'The logic inside of the legacy code of Reach Customization will be treated as a black box, and no unit test or integration test will be considered for it. The test scenarios identified by the PO and Leads will be apart of this scope.',
    environments: [ 'Local (dev)', 'CI', 'QA', 'Stage', 'Production' ]
  }
}
