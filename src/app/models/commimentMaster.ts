export class CommitmentMaster {
    constructor (_id = '', userName='', typeCommitment='', commitmentDescription='' ) {
      this._id = _id;
      this.userName = userName;
      this.typeCommitment = typeCommitment;
      this.commitmentDescription = commitmentDescription;    
     
  }  
    _id: string;
    userName: string;
    typeCommitment: string;
    commitmentDescription: string;     
  }
  