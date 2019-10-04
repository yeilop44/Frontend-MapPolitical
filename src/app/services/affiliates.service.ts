import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Afiliado } from '../models/afiliado';
import { AuthService } from '../services/auth.service';
import { FilterOptions } from '../models/filterOptions';


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

  getAffiliatesByUserPaginated(user: string, page: number, filterOptions:FilterOptions) {
    console.log("OPTIONS:" + typeof filterOptions)
    let token = this.auth.token;
    const httpOptions = {
          headers: new HttpHeaders({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return this.http.post(`${this.urlApi}/${user}/${page}`, filterOptions, httpOptions);
  }

  getFilteredAffiliatesByUserPaginated(user: string, page: number, filterOptions:FilterOptions) {
    let token = this.auth.token;
    const httpOptions = {
          headers: new HttpHeaders({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return this.http.post(`${this.urlApi}/${user}/${page}`, filterOptions, httpOptions);
  }

  searchContactsByUser(user: string, searchCriteria: string, page: number) {
    let token = this.auth.token;
    const httpOptions = {
          headers: new HttpHeaders({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return this.http.get(`${this.urlApi}/searchengine/${user}/${searchCriteria}/${page}`, httpOptions);
  }

  searchContactsByZone(user: string, zone: string) {
    let token = this.auth.token;
    const httpOptions = {
          headers: new HttpHeaders({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return this.http.get(`${this.urlApi}/${user}/zone/${zone}`, httpOptions);
  }

  searchContactsBySubdivision(user: string, subdivision: string) {
    let token = this.auth.token;
    const httpOptions = {
          headers: new HttpHeaders({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return this.http.get(`${this.urlApi}/${user}/subdivision/${subdivision}`, httpOptions);
  }

  searchContactsByProfession(user: string, profession: string) {
    let token = this.auth.token;
    const httpOptions = {
          headers: new HttpHeaders({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return this.http.get(`${this.urlApi}/${user}/profession/${profession}`, httpOptions);
  }

  searchContactsByChurch(user: string, church: string) {
    let token = this.auth.token;
    const httpOptions = {
          headers: new HttpHeaders({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return this.http.get(`${this.urlApi}/${user}/church/${church}`, httpOptions);
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

  getNeighborhoodListByUser(user: string){
    let token = this.auth.token;
    const httpOptions = {      
      headers: new HttpHeaders({'Authorization': `Bearer ${token}`,'Content-Type': 'application/json', 'Accept': 'application/json'})
    };
    return this.http.get(`${this.urlApi}/listar/neighborhood/${user}`, httpOptions);
  }

}
