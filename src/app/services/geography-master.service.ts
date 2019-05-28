import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GeographyMasterService {
  
  urlApi = 'https://back-mpolitical.herokuapp.com/geographyMaster';

  constructor(private http: HttpClient) { }
  
  getGeographyMasterByUser(user: string){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return   this.http.get(`${this.urlApi}/${user}`, httpOptions);
  }

}
