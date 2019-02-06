module.exports = {
  members: {
    QE: ['Alejandro Botero', 'Jose Alvarez', 'Juan Pablo Abad'],
    BE: ['Daniel Valderrama', 'Andres Romero', 'Marlon Rodriguez ', 'Andres Marin'],
    FE: ['Danny Salazar', 'Luis Cervantes', 'Heinner Zapata'],
    PO: ['Luisa Rivera'],
    PM: ['Denila Philip'],
    SM: ['Gustavo Arroyave'],
    MATH: {
      FR: ['Thierry Colomb', 'Carlos Bertrand']
    }
  },
  product: {
    abstract: 'Reach Customization application provides insight into the optimal allocation of spend across segments or dayparts within a channel. It optimizes the allocation of gross rating points (GRP) across segments to maximize reach or minimize budget.\n' + 'It is driven by Nielsen fusion data (AMP 1.0 data stack), which provides media consumption information for TV, online, and mobile channels in the US market. Currently, Reach Customization is only available in the US market.\n' + 'Reach Customization also supports the addition of system-generated ATV segments to show how reach can be extended when planning for TV.',
    overviewLink: 'https://wiki.mbww.com/pages/viewpage.action?spaceKey=AS&title=Reach+Customization',
    risks: {
      1: 'Legacy code involved as a model for AUT',
      2: 'Math Engine is a blackbox, see [Reach Customization - Math Engine Regression Test Plan](https://wiki.mbww.com/display/AS/Reach+Customization+-+Math+Engine+Regression+Test+Plan)',
      3: 'Time difference between Math Team and PSL Team time zones is +5 hours',
      4: 'The MATH team works a monthly sprint, requiring all planning to be done monthly',
      5: 'The MATH team does not use Slack, Skype, JIRA, Confluence or any other form of communication or documentation outside of email. Making commitments and tracking of status and tasks difficult.',
      6: 'Third Party Integrations - both internal and external'
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
    inScope: 'sprint = $SPRINT_ID$ and type = Story and project = "Reach Customization"',
    knownDefects: 'sprint = $SPRINT_ID$ and type = Bug and project = "Reach Customization"',
    outOfScope: 'The logic inside of the legacy code of Reach Customization will be treated as a black box, and no unit test or integration test will be considered for it. The test scenarios identified by the PO and Leads will be apart of this scope.',
    environments: [ 'Local (dev)', 'CI', 'QA', 'Stage', 'Production' ]
  }
}
