export class Afiliado {
  constructor (_id = '', president='', date='', fullName='', address='', positionLat=0,
                positionLng=0, proffesion='', commission='', noAffiliate=0, identification=0, observations='') {
    this._id = _id;
    this.date = date;
    this.president = president;
    this.fullName = fullName;
    this.address = address;
    this.positionLat= positionLat;
    this.positionLng= positionLng;
    this.profession = proffesion;
    this.commission = commission;
    this.noAffiliate = noAffiliate;
    this.identification = identification;
    this.observations = observations;
    this.commission = commission;
}

  _id: string;
  president: string;
  date: string;
  fullName: string;
  address: string;
  positionLat: number;
  positionLng: number;

  profession: string;
  commission: string;
  noAffiliate: number;
  identification: number;
  observations: string;
}
