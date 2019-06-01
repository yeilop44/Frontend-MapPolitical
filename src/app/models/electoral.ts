export class Electoral {
  constructor (_id = '', userName='', state='', municipality='',  votingStation='', votingPlace='', numberTables=0) {
    this._id = _id;
    this.userName = userName;
    this.state = state;
    this.municipality = municipality;
    this.votingStation = votingStation;
    this.votingPlace = votingPlace;
    this.numberTables = numberTables;
   
}

  _id: string;
  userName: string;
  state: string;
  municipality: string;
  votingStation: string;
  votingPlace: string;
  numberTables: number;

}
