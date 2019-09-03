import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Compromiso } from '../models/compromiso'

@Injectable({
  providedIn: 'root'
})
export class CommitmentsService {
  
  selectedCompromiso: Compromiso;
  urlApi = 'http://localhost:3000/commitments';  
  //urlApi = 'https://back-mpolitical.herokuapp.com/commitments';

  constructor(private http: HttpClient) {
    this.selectedCompromiso = new Compromiso();
   }

  getCommitmentsByUser(user: string) {
    const httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return this.http.get(`${this.urlApi}/${user}`, httpOptions);
  }

  postCompromiso(compromiso: Compromiso) {
    return this.http.post(this.urlApi, compromiso);
  }

  deleteCompromiso(_id: string) {
    return this.http.delete(this.urlApi + `/${_id}`);
    }

  getCommitmentsByType(compromiso: Compromiso) {
    const httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return this.http.get(`${this.urlApi}/${compromiso.userName}/typeCommitment/${compromiso.typeCommitment}`, httpOptions);
  }
  
  getCountcommitmentDescription(compromiso: Compromiso) {
    const httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return this.http.get(`${this.urlApi}/count/${compromiso.userName}/typeCommitment/${compromiso.typeCommitment}`, httpOptions);
  }

}
