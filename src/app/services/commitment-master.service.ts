import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { CommitmentMaster } from '../models/commimentMaster';

@Injectable({
  providedIn: 'root'
})
export class CommitmentMasterService {

  selectedCommitmentMaster: CommitmentMaster;
  //urlApi = 'http://localhost:3000/affiliates';
  urlApi = 'https://back-mpolitical.herokuapp.com/commitmentMaster';

  constructor(private http: HttpClient) { 
    this.selectedCommitmentMaster = new CommitmentMaster();
  }

  getCommitmentMasterByUser(user: string){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})};
    return   this.http.get(`${this.urlApi}/${user}`, httpOptions);
  }

  postCommitmentMaster(CommitmentMaster: CommitmentMaster) {
    return this.http.post(this.urlApi, CommitmentMaster);
  }
  
  putCommitmentMaster(CommitmentMaster: CommitmentMaster) {
    return this.http.put(this.urlApi + `/${CommitmentMaster._id}`, CommitmentMaster);
  }

  deleteCommitmentMaster(_id: string) {
  return this.http.delete(this.urlApi + `/${_id}`);
  }

}
