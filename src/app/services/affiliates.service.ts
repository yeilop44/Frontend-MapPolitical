import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Afiliado } from '../models/afiliado';

@Injectable({
  providedIn: 'root'
})
export class AffiliatesService {

  selectedAfiliado: Afiliado; 

  urlApi = 'http://localhost:3000/affiliates';


  constructor(private http: HttpClient) {
    this.selectedAfiliado = new Afiliado();
  }

  getAffiliatesByUser(user: string) {
    const httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return this.http.get(`${this.urlApi}/${user}`, httpOptions);
  }

  postAfiliado(Afiliado: Afiliado) {
    return this.http.post(this.urlApi, Afiliado);
  }

  putAfiliado(Afiliado: Afiliado) {
    return this.http.put(this.urlApi + `/${Afiliado._id}`, Afiliado);
  }

  deleteAfiliado(_id: string) {
  return this.http.delete(this.urlApi + `/${_id}`);
  }

  getCountProfessions(user: string) {
    const httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return this.http.get(`${this.urlApi}/count/profession/${user}`, httpOptions);
  }

  getCountOccupations(user: string) {
    const httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return this.http.get(`${this.urlApi}/count/occupation/${user}`, httpOptions);
  }

  getCountZones(user: string) {
    const httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return this.http.get(`${this.urlApi}/count/zone/${user}`, httpOptions);
  }

  getCountSubdivisions(user: string) {
    const httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return this.http.get(`${this.urlApi}/count/subdivision/${user}`, httpOptions);
  }

}
