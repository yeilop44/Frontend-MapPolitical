import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListMasterService {
  
  urlApi = 'http://localhost:3000/listMaster';
  //urlApi = 'https://back-mpolitical.herokuapp.com/listMaster';

  constructor(private http: HttpClient) { }

  getListMasters(){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return   this.http.get(this.urlApi, httpOptions);
  }

  getListByType(type:string){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})};
      return this.http.get(`${this.urlApi}/${type}`, httpOptions);
  }

}
