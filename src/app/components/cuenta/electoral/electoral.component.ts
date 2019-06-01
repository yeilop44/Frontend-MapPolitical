import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { DivipolMasterService } from '../../../services/divipol-master.service';
import { ElectoralMasterService } from '../../../services/electoral-master.service'


@Component({
  selector: 'app-electoral',
  templateUrl: './electoral.component.html',
  styleUrls: ['./electoral.component.css']
})  

export class ElectoralComponent implements OnInit {
  
  divipols: any[] = [];
  states: any[] = [];
  municipalitys: any[] = [];
  userNameCurrent;  
  electorals: any [] =[];

  constructor(public auth: AuthService, private divipolMasterService: DivipolMasterService, 
    private electoralService: ElectoralMasterService) { 
      this.userNameCurrent = this.auth.user;
    }

  ngOnInit() {
    this.getDivipolInfo();
    this.getElectoral();
  }

  getDivipolInfo() {
    this.divipolMasterService.getDivipolMasters()
      .subscribe((data: any ) => {
        console.log(data.Items);
        this.divipols = data.Items;        
        for(let i=0; i<this.divipols.length;i++){
            this.states[i] = this.divipols[i].state;            
        }
        console.log(this.states);  
      });
  }

  onOptionsSelectedState(value: string){    
    this.municipalitys = [];  
    for(let i=0;i<this.divipols.length;i++){
      if(value == this.divipols[i].state){      
        for(let j=0;j<this.divipols[i].municipality.length; j++){
          this.municipalitys[j] = this.divipols[i].municipality[j];    
        }               
      }      
    }
    console.log(this.municipalitys);    
  }

  addElectoral(form: NgForm) {
    this.electoralService.postElectoral(form.value)
    .subscribe(res =>{
      form.reset();
    });
  }

  getElectoral(){
    this.electoralService.getElectoralMastersByUser(this.auth.user)
      .subscribe((data: any) => {
        this.electorals = data.Items;        
      });
  }

}
