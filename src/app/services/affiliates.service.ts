import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Afiliado } from '../models/afiliado';

@Injectable({
  providedIn: 'root'
})
export class AffiliatesService {

  selectedAfiliado: Afiliado;
  afilaidos: Afiliado[];

  urlApi = 'http://localhost:3000/affiliates';


  constructor(private http: HttpClient) {
    this.selectedAfiliado = new Afiliado();
  }

  getAffiliatesByPresident(president: string) {
    const httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return this.http.get(`${this.urlApi}/${president}`, httpOptions);
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





}
