//GLOBAL VARS
var controller = new Controller();

//GETTING DATA
controller.getResults().then(results => {
    controller.showAllMatchesDays(results);
});
