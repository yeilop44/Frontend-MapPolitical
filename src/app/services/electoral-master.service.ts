import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ElectoralMasterService {
  
  urlApi = 'https://back-mpolitical.herokuapp.com/electoralMaster';

  constructor(private http: HttpClient) { }

  getElectoralMastersByUser(user: string){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return   this.http.get(`${this.urlApi}/${user}`, httpOptions);
  }
}
