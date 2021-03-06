import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListMasterService {
  
  urlApi = 'https://back-mpolitical.herokuapp.com/listMaster';

  constructor(private http: HttpClient) { }

  getListMasters(){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return   this.http.get(this.urlApi, httpOptions);
  }

}
