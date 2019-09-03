import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Geografia } from '../models/geografia';


@Injectable({
  providedIn: 'root'
})
export class GeographyMasterService {

  selectedGeografia: Geografia;
  
  urlApi = 'http://localhost:3000/geographyMaster';
  //urlApi = 'https://back-mpolitical.herokuapp.com/geographyMaster';

  constructor(private http: HttpClient) { 
    this.selectedGeografia = new Geografia();
  }
  
  getGeographyMasterByUser(user: string){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return   this.http.get(`${this.urlApi}/${user}`, httpOptions);
  }

  postGeografia(Geografia: Geografia) {
    return this.http.post(this.urlApi, Geografia);
  }

  putGeografia(Geografia: Geografia) {
    return this.http.put(this.urlApi + `/${Geografia._id}`, Geografia);
  }

  deleteGeografia(_id: string) {
  return this.http.delete(this.urlApi + `/${_id}`);
  }


}
