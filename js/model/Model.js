/**
 * Model is responsible for treat and organise all data, applying rules, etc.
 */
class Model {

    getFinishedMatches(results) {
        return results.filter(match => match.MatchIsFinished);
    }

    generateTeams(teamsData, finishedMatches) {
        let teams = [];
        teamsData.map(team => {
            teams.push(this.calculatePontuation(team, finishedMatches));       
        });
        this._orderTeams(teams);
        return teams;
    }

    _orderTeams(teams) {
        teams.sort(function(teamA, teamB) {
            return (parseInt(teamB.Points) - parseInt(teamA.Points)) 
                    || (parseFloat(teamB.GoalDifference) - parseFloat(teamA.GoalDifference))
                    || (parseInt(teamB.ScoredGoals) - parseInt(teamA.ScoredGoals)) ;
        });
    }
    
    calculatePontuation(team, finishedMatches) {
        team.Wins = 0;
        team.Losses = 0;
        team.Draws = 0;
        team.Points = 0;
        team.ScoredGoals = 0;
        team.ReceivedGoals = 0;
    
        let teamMatches = finishedMatches.filter(match => (match.Team1.TeamId == team.TeamId) || (match.Team2.TeamId == team.TeamId));
    
        teamMatches.forEach(match => {
            if(match.MatchResults[1].PointsTeam1 == match.MatchResults[1].PointsTeam2) {
                team.Draws ++;
                team.Points ++;
            } else {
                if(match.MatchResults[1].PointsTeam1 > match.MatchResults[1].PointsTeam2) {
                    if(match.Team1.TeamId == team.TeamId) {
                        team.Wins ++;
                        team.Points += 3;
                    } else {
                        team.Losses ++;
                    }
                } else {
                    if(match.Team1.TeamId == team.TeamId) {
                        team.Losses ++;
                    } else {
                        team.Wins ++;
                        team.Points += 3;
                    }
                }
            }
    
            if(match.Team1.TeamId == team.TeamId) {
                team.ScoredGoals += match.MatchResults[1].PointsTeam1;
                team.ReceivedGoals += match.MatchResults[1].PointsTeam2;
            } else {
                team.ScoredGoals += match.MatchResults[1].PointsTeam2;
                team.ReceivedGoals += match.MatchResults[1].PointsTeam1;
            }
        });
    
        team.GoalDifference = team.ScoredGoals - team.ReceivedGoals;
        team.Matches = teamMatches.length;
        return team;
    }

    calculateGoalsScorers(finishedMatches){
        let allGoals = [];
        finishedMatches.forEach(match => {
            let goals = match.Goals.filter(goal => !goal.IsOwnGoal);
            goals.forEach(goal => {
                if(goal.GoalGetterID) {
                    allGoals.push({playerId: goal.GoalGetterID, playerName: goal.GoalGetterName})
                }
            });
            
        });
        
        let countedPlayersGoals = {};
        allGoals.forEach(function(obj) { 
            let goal = JSON.stringify(obj);
            countedPlayersGoals[goal] = (countedPlayersGoals[goal] || 0) + 1; 
        });
    
        let goalsQuantity = Object.values(countedPlayersGoals);
        let players = Object.keys(countedPlayersGoals);
        let goalsPlayers = [];
    
        for(let i = 0; i < players.length; i++) {
            let item = JSON.parse(players[i]);
            item.goalsQuantity = goalsQuantity[i];
            goalsPlayers.push(item);
        }
    
        return this._orderGoalsScorers(goalsPlayers);
    }
    
    _orderGoalsScorers(goalPlayers) {
        goalPlayers.sort(function(p1, p2) {
            return (parseInt(p2.goalsQuantity) - parseInt(p1.goalsQuantity) || p2.playerName - p1.playerName) ;
        });
        return goalPlayers;
    }
    

}