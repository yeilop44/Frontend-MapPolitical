import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Afiliado } from '../models/afiliado';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AffiliatesService {

  selectedAfiliado: Afiliado; 
 
  urlApi = 'http://localhost:3000/affiliates';
  //urlApi = 'https://back-mpolitical.herokuapp.com/affiliates';

  constructor(private http: HttpClient, private auth: AuthService) {
    this.selectedAfiliado = new Afiliado();
  }

  getAffiliatesByUserPaginated(user: string, page: number) {
    let token = this.auth.token;
    const httpOptions = {
          headers: new HttpHeaders({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return this.http.get(`${this.urlApi}/${user}/${page}`, httpOptions);
  }

  searchContactsByUser(user: string, searchCriteria: string) {
    let token = this.auth.token;
    const httpOptions = {
          headers: new HttpHeaders({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return this.http.get(`${this.urlApi}/searchengine/${user}/${searchCriteria}/1`, httpOptions);
  }

  getAffiliatesByUser(user: string) {
      let token = this.auth.token;
      const httpOptions = {
          headers: new HttpHeaders({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json'})};
      return this.http.get(`${this.urlApi}/${user}`, httpOptions);
  }

  postAfiliado(Afiliado: Afiliado) {
    let token = this.auth.token;
    const httpOptions = {      
      headers: new HttpHeaders({'Authorization': `Bearer ${token}`,'Content-Type': 'application/json', 'Accept': 'application/json'})
    };
    return this.http.post(this.urlApi, Afiliado, httpOptions);
  }

  putAfiliado(Afiliado: Afiliado) {
    let token = this.auth.token;
    const httpOptions = {      
      headers: new HttpHeaders({'Authorization': `Bearer ${token}`,'Content-Type': 'application/json', 'Accept': 'application/json'})
    };
    return this.http.put(this.urlApi + `/${Afiliado._id}`, Afiliado, httpOptions);
  }

  deleteAfiliado(_id: string) {
    let token = this.auth.token;    
    const httpOptions = {      
      headers: new HttpHeaders({'Authorization': `Bearer ${token}`,'Content-Type': 'application/json', 'Accept': 'application/json'})
    };
  return this.http.delete(this.urlApi + `/${_id}`,  httpOptions);
  }

  getAffiliatesByLeader(leader: Afiliado) {
    const httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return this.http.get(`${this.urlApi}/${leader.userName}/leader/${leader.leader}`, httpOptions);
  }

  getAffiliatesByNames(contactSearch: any) {

    const httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return this.http.get(`${this.urlApi}/${contactSearch.userName}/names/${contactSearch.names}`, httpOptions);
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
