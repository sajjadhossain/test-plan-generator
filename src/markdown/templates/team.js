const generateTeamSection = (projectOverview) => {
  const teams = {
    'Quality Engineering': projectOverview.members.QE,
    'Backend Engineering': projectOverview.members.BE,
    'Frontend Engineering': projectOverview.members.FE,
    'Product Owners': projectOverview.members.PO,
    'Project Manager': projectOverview.members.PM,
    'Scrum Master': projectOverview.members.SM
  }

  const getTeamMembers = (team) => {
    let teamString = ''
    teamTitles = Object.keys(team)

    for(let i = 0; i < teamTitles.length; i += 1) {
      teamString += '### ' + teamTitles[i] + '\n\n'

      for(let j = 0; j < team[teamTitles[i]].length; j += 1) {
        teamString += '* ' + team[teamTitles[i]][j] + '\n'
      }

      teamString += '\n'
    }

    return teamString
  }

  return getTeamMembers(teams)
}

module.exports = generateTeamSection
