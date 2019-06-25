import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import{ Electoral } from '../models/electoral';

@Injectable({
  providedIn: 'root'
})
export class ElectoralMasterService {
  
  selectedElectoral: Electoral;

  urlApi = 'https://back-mpolitical.herokuapp.com/electoralMaster';

  constructor(private http: HttpClient) { 
    this.selectedElectoral = new Electoral();
  }

  getElectoralMastersByUser(user: string){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return   this.http.get(`${this.urlApi}/${user}`, httpOptions);
  }
  
  postElectoral(Electoral: Electoral) {
    return this.http.post(this.urlApi, Electoral);
  }

  putElectoral(Electoral: Electoral) {
    return this.http.put(this.urlApi + `/${Electoral._id}`, Electoral);
  }

  deleteElectoral(_id: string) {
  return this.http.delete(this.urlApi + `/${_id}`);
  }

}
