export class Geografia {
  constructor (_id = '', userName='', state='', municipality='', zone='', subdivision='' ) {
    this._id = _id;
    this.userName = userName;
    this.state = state;
    this.municipality = municipality;
    this.zone = zone;
    this.subdivision = subdivision; 
   
}

  _id: string;
  userName: string;
  state: string;
  municipality: string;
  zone: string;
  subdivision: string;
  
}
