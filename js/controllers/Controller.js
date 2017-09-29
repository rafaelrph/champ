/**
 * Controller has the service and the view
 */
class Controller {

    constructor() {
        this._service = new Service();
        this._view = new View();
    }

    getCurrentGroup() {
        return this._service.importCurrentGroup();
    }

    getResults() {
        return this._service.importResults();
    }

    getTeams() {
        return this._service.importTeams();
    }

    getGroups(){
        return this._service.importGroups();
    }

    showTable(teams) {
        this._view.showTable(teams);
    }

    showAllMatchesDays(results){  
        this._view.showAllMatchesDays(results);
    }

    showMatchDay(results, group, currentGroup){
        this._view.showMatchDay(results, group, currentGroup);
    }

    showSelectGroups(groups) {
        this._view.showSelectGroups(groups);
    }

    showScorers(scorers) {
        this._view.showScorers(scorers);
    }

}