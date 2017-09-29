//GLOBAL VARS
var controller = new Controller();
var model = new Model();

//GETTING DATA
controller.getResults().then(results => {
    let finishedMatches = model.getFinishedMatches(results)
    controller.showScorers(model.calculateGoalsScorers(finishedMatches));
});

