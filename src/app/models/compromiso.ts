interface Affiliate{
	_id:string;
  fullname:string;
}

export class Compromiso {
  
  constructor (_id = '', userName= '', affiliate = {_id:'', fullname:''},typeCommitment='',
               commitmentDescription='', quantity=0  ) {
    this._id = _id;
    this.userName = userName;
    this.affiliate = affiliate;
    this.typeCommitment = typeCommitment;
    this.commitmentDescription = commitmentDescription;
    this.quantity = quantity;
    
 
}

  _id: string;
  userName: string;
  affiliate: Affiliate;
  typeCommitment: string;
  commitmentDescription: string;
  quantity: number; 
  date: Date;   
  
}
