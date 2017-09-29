/**
 * View manipulates the page
 */
class View {

    showMatchDay(results, group, currentGroup){
        let matches = results.filter(row => row.Group.GroupOrderID == group);
        let template = `<table class='table-matches'>
                    <caption>${(currentGroup == group) ? 'NEXT MATCHES' : ('MATCHDAY ' + group)}</caption>
                    <tbody>
                        ${matches.map(row => 
                            `
                                <tr>
                                    <td>
                                        <div class='date-local-match'>
                                            ${this.toStringDate(row.MatchDateTime)}
                                            ${(row.Location) ? ('<br />' + row.Location.LocationCity + ' - ' + row.Location.LocationStadium) : ''}
                                        </div>
                                        <div class='match'>
                                            <div class='team team1'>
                                                ${(row.Team1.ShortName) ? row.Team1.ShortName : row.Team1.TeamName} 
                                            </div>
                                            <div class='score'>
                                                <img src='${row.Team1.TeamIconUrl}' /> 
                                                ${(row.MatchResults.length > 0) ? row.MatchResults[row.MatchResults.length - 1].PointsTeam1 : ''} 
                                                x 
                                                ${(row.MatchResults.length > 0) ? row.MatchResults[row.MatchResults.length - 1].PointsTeam2 : ''} 
                                                <img src='${row.Team2.TeamIconUrl}' /> 
                                            </div>
                                            <div class='team team2'>
                                                ${(row.Team2.ShortName) ? row.Team2.ShortName : row.Team2.TeamName} 
                                            </div>
                                        </div>
                                        ${(! row.MatchIsFinished && row.MatchResults.length > 0) ? "<div class='ongoing'>ONGOING</div>" : ''}
                                    </td>
                                </tr>
                            `
                        ).join('')}
                    </tbody>
                </table>`;
        document.querySelector('.container-table-matches').innerHTML = template;
    }

    showAllMatchesDays(results){  
        let table = "";
        let currentGroup = 0;
        let auxGroup = 0;
        let matches = "";

        results.map(row => {
            if(auxGroup != row.Group.GroupOrderID) {
                if(auxGroup > 0) {
                    table += `<table class='table-matches'>
                                <caption>${(currentGroup == auxGroup) ? 'NEXT MATCHES' : ('MATCHDAY ' + auxGroup)}</caption>
                                <tbody>
                                    ${matches}
                                </tbody>
                            </table>
                            <br /><br />`;
                    matches = "";
                }
                auxGroup = row.Group.GroupOrderID;
            }
            if(! row.MatchIsFinished && currentGroup == 0)  {
                currentGroup = row.Group.GroupOrderID;
            }
            matches += `<tr>
                            <td>
                                <div class='date-local-match'>
                                    ${this.toStringDate(row.MatchDateTime)}
                                    ${(row.Location) ? ('<br />' + row.Location.LocationCity + ' - ' + row.Location.LocationStadium) : ''}
                                </div>
                                <div class='match'>
                                    <div class='team team1'>
                                        ${(row.Team1.ShortName) ? row.Team1.ShortName : row.Team1.TeamName} 
                                    </div>
                                    <div class='score'>
                                        <img src='${row.Team1.TeamIconUrl}' /> 
                                        ${(row.MatchResults.length > 0) ? row.MatchResults[row.MatchResults.length - 1].PointsTeam1 : ''} 
                                        x 
                                        ${(row.MatchResults.length > 0) ? row.MatchResults[row.MatchResults.length - 1].PointsTeam2 : ''} 
                                        <img src='${row.Team2.TeamIconUrl}' /> 
                                    </div>
                                    <div class='team team2'>
                                        ${(row.Team2.ShortName) ? row.Team2.ShortName : row.Team2.TeamName} 
                                    </div>
                                </div>
                                ${(! row.MatchIsFinished && row.MatchResults.length > 0) ? "<div class='ongoing'>ONGOING</div>" : ''}`;

                if(row.MatchIsFinished && row.Goals.length > 0) {
                    matches += `<div class='date-local-match'>
                                    ${row.Goals.map(goal => {
                                        let goalsString = "";
                                        if(goal.IsOwnGoal) {
                                            goalsString += "<img src='img/ball-red.svg' class='ball' /> (OG) ";
                                        } else {
                                            goalsString += "<img src='img/ball.svg' class='ball' />";
                                        }
                                        goalsString += `${goal.MatchMinute}' - ${goal.GoalGetterName}`;
                                        return goalsString;
                                    }).join('')}
                                </div>`;
                }
                matches += `</td></tr>`;
        });

        table += `<table class='table-matches'>
                    <caption>${(currentGroup == auxGroup) ? 'NEXT MATCHES' : ('MATCHDAY ' + auxGroup)}</caption>
                    <tbody>
                        ${matches}
                    </tbody>
                </table>
                <br /><br />`;
        document.querySelector('.container-table-all-matches').innerHTML = table;
    }

    showTable(teams){  
        let teamsView = `<table class='table-teams'>
                            <thead>
                                <tr>
                                    <th class='title-table' colspan='3' class='align-left'>TABLE</th>
                                    <th class='column-title'>MATCHES</th>
                                    <th class='column-title'>POINTS</th>
                                    <th class='column-title'>WINS</th>
                                    <th class='column-title'>DRAWS</th>
                                    <th class='column-title'>LOSSES</th>
                                    <th class='column-title'>GOALS</th>
                                    <th class='column-title'>GD</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                ${teams.map(team => 
                                    `
                                        <tr>
                                            <td class='bold'>${(teams.indexOf(team) + 1)}</td>
                                            <td>
                                                <img src='${team.TeamIconUrl}' />
                                            </td>
                                            <td class='align-left'>
                                                ${team.TeamName}
                                            </td>
                                            <td>${team.Matches}</td>
                                            <td class='bold'>${team.Points}</td>
                                            <td>${team.Wins}</td>
                                            <td>${team.Draws}</td>
                                            <td>${team.Losses}</td>
                                            <td>${team.ScoredGoals}:${team.ReceivedGoals}</td>
                                            <td class='bold'>${team.GoalDifference}</td>
                                        </tr>
                                    `
                                ).join('')}
                            </tbody>
                        </table>
                        <br /><br />`;
        document.querySelector('.container-table').innerHTML = teamsView;
    }

    showScorers(scorers){  
        let scorersView = `<table class='table-scorers'>
                            <thead>
                                <tr>
                                    <th class='title-table' class='align-left'>TOP SCORERS</th>
                                    <th class='column-title color-black'>GOALS</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                ${scorers.map(player => 
                                    `
                                        <tr>
                                            <td class='align-left'>${(player.playerName)}</td>
                                            <td class='bold'>${player.goalsQuantity}</td>
                                        </tr>
                                    `
                                ).join('')}
                            </tbody>
                        </table>
                        <br /><br />`;
        document.querySelector('.container-top-scorers').innerHTML = scorersView;
    }

    showSelectGroups(groups) {
        let selectGroups = document.querySelector("#select-group");
        selectGroups.classList.remove('hide');
        groups.forEach(group => {
            let item = document.createElement('option');
            item.value = group.GroupOrderID;
            item.innerHTML = 'MATCHDAY ' + group.GroupOrderID;
            if(group.GroupOrderID == currentGroup.GroupOrderID) {
                item.selected = true;
            }
            selectGroups.appendChild(item);
        });
    }

    //DATE FORMAT = yyyy-mm-ddThh:mm:ss
    toStringDate(date){
        let array = date.split("T");
        let arrayDate = array[0].split("-");
        let arrayTime = array[1].split(":");

        
        let dayWeek = this.toStringDayWeek(new Date(arrayDate[0], (arrayDate[1] - 1), arrayDate[2]).getDay());

        return dayWeek + " - " + arrayDate[2] + "/" + arrayDate[1] + "/" + arrayDate[0] + " " + arrayTime[0] + ":" + arrayTime[1];
    }

    toStringDayWeek(dayWeek) {
        switch(dayWeek) {
            case 0:
                return "Sunday";
            case 1: 
                return "Monday";
            case 2:
                return "Tuesday";
            case 3: 
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
            default:
                return "Undefined";
        }
    }

}