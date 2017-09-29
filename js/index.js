//GLOBAL VARS
var controller = new Controller();
var model = new Model();
var finishedMatches, currentGroup, results, teams;

//GETTING DATA
controller.getResults().then(data => {
    results = data;
    finishedMatches = model.getFinishedMatches(results);

    controller.getTeams().then(teamsData => {
        teams = model.generateTeams(teamsData, finishedMatches);
        controller.getCurrentGroup().then(group => {
            currentGroup = group;
            updateView(teams, results);   
        });
    });
});

function updateView(teams, results){
    controller.showTable(teams);
    controller.showMatchDay(results, currentGroup.GroupOrderID, currentGroup.GroupOrderID);
    generateSelectGroups(currentGroup);
}

function showTableMatchDay(event) {
    controller.showMatchDay(results, event.target.value, currentGroup.GroupOrderID);
}

function generateSelectGroups(currentGroup) {
    controller.getGroups().then(groups => {
        controller.showSelectGroups(groups);
    });
}