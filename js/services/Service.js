/**
 * Service connects to the API
 */
class Service {
    
    constructor() {
        this._api = 'https://www.openligadb.de/api';
        this._leagueId = 'bl1';
        this._year = 2017;
        this._pathCurrentGroup = 'getcurrentgroup';
        this._pathResults = 'getmatchdata';
        this._pathTeams = 'getavailableteams';
        this._pathGroups = 'getavailablegroups';
    }

    _handleError(response) {
        if(!response.ok) {
            throw new Error(res.statusText);
        }
        return response;
    }

    _get(url) {
        return fetch(url)
            .then(response => this._handleError(response))
            .then(response => response.json());
    }

	_import(url) {
		return this._get(url)
			.then(results => {
				return results;
			}) 
			.catch(erro => {
				throw new Error("Connection refused.")
			});
    }

    //URL Example: https://www.openligadb.de/api/getcurrentgroup/bl1
    importCurrentGroup() {
        let url = this._api + "/" + this._pathCurrentGroup + "/" + this._leagueId;
        return this._import(url);
    }

    //URL Example: https://www.openligadb.de/api/getmatchdata/bl1/2017
    importResults() {
        let url = this._api + "/" + this._pathResults + "/" + this._leagueId + "/" + this._year;
        return this._import(url);
    }

    //URL Example: https://www.openligadb.de/api/getavailableteams/bl1/2017
    importTeams() {
        let url = this._api + "/" + this._pathTeams + "/" + this._leagueId + "/" + this._year;
        return this._import(url);
    }

    //URL Example: https://www.openligadb.de/api/getavailablegroups/bl1/2017
    importGroups() {
        let url = this._api + "/" + this._pathGroups + "/" + this._leagueId + "/" + this._year;
        return this._import(url);
    }

}
