const fetchEnvironments = (projectOverview) => {
  const environments = projectOverview.product.environments
  let environmentsString = ''

  for(let i = 0; i < environments.length; i += 1) {
    environmentsString += '* ' + environments[i] + '\n'
  }

  return environmentsString
}

module.exports = fetchEnvironments
