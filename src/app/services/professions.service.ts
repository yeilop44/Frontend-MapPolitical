import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfessionsService {
  
  urlApi = 'https://back-mpolitical.herokuapp.com/professions';
  
  constructor(private http: HttpClient) { }

  getProfessions(){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return   this.http.get(this.urlApi, httpOptions);
  }
}
