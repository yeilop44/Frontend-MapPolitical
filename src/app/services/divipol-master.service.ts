import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DivipolMasterService {
  
  urlApi = 'http://localhost:3000/divipolMaster';
  //urlApi = 'https://back-mpolitical.herokuapp.com/divipolMaster';  
  
  constructor(private http: HttpClient) { }

  getDivipolMasters(){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return   this.http.get(this.urlApi, httpOptions);
  }
}
