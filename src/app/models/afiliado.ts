export class Afiliado {
  constructor (_id = '', userName='', birthdate='', names='', surnames='', sex='', zone='', subdivision='', address='', municipality='',
                votingTable='',votingStationy='', leader='', positionLat=0, positionLng=0, proffesion='', occupation='', church='',
                lgtbi= false, disability= false, phone=0, identification=0,familyNumber=0) {
    this._id = _id;
    this.userName = userName;
    this.birthdate = birthdate;
    this.names = names;
    this.surnames = surnames;
    this.sex = sex;
    this.zone = zone;
    this.subdivision = subdivision;
    this.address = address;
    this.municipality = municipality;
    this.votingTable = votingTable;
    this.votingStation = votingStationy;
    this.leader = leader;
    this.positionLat= positionLat;
    this.positionLng= positionLng;
    this.profession = proffesion; 
    this.occupation = occupation; 
    this.church = church;
    this.lgtbi = lgtbi;
    this.disability = disability;
    this.phone = phone;
    this.identification = identification;
    this.familyNumber = familyNumber;
   
}

  _id: string;
  userName: string;
  birthdate: string;
  names: string;
  surnames: string;
  sex: string;
  zone: string;
  subdivision: string;
  address: string;
  municipality: string;
  votingTable: string;
  votingStation: string;
  votingPlace: string;
  leader: string;
  positionLat: number;
  positionLng: number;
  profession: string;
  occupation: string;
  church: string;
  lgtbi: boolean;
  disability: boolean;
  phone: number;
  identification: number;
  familyNumber: number;
}
