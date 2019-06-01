import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { DivipolMasterService } from '../../../services/divipol-master.service';
import { GeographyMasterService } from '../../../services/geography-master.service'
import { Geografia } from '../../../models/geografia';

@Component({
  selector: 'app-geofrafica',
  templateUrl: './geofrafica.component.html',
  styleUrls: ['./geofrafica.component.css']
})
export class GeofraficaComponent implements OnInit {
  
  divipols: any[] = [];
  states: any[] = [];
  municipalitys: any[] = [];
  userNameCurrent;
  geographys: any[] = [];

  constructor( public auth: AuthService, private geographyMasterService: GeographyMasterService, 
    private divipolMasterService: DivipolMasterService ) { 
    this.userNameCurrent = this.auth.user;
  }

  ngOnInit() {
    this.getDivipolInfo();
    this.getGeografia();
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

  addGeografia(form: NgForm) {
    this.geographyMasterService.postGeografia(form.value)
    .subscribe(res =>{
      form.reset();
    });
    setTimeout(()=>{
      this.getGeografia();  
    }, 1000);    
  }

  getGeografia(){
    this.geographyMasterService.getGeographyMasterByUser(this.auth.user)
      .subscribe((data: any) => {
        this.geographys = data.Items;        
      });
  }

}
