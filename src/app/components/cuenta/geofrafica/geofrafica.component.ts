import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class GeofraficaComponent implements OnInit, OnDestroy {
  
  divipols: any[] = [];
  states: any[] = [];
  municipalitys: any[] = [];
  userNameCurrent;
  geographys: any[] = [];
  isLoading: boolean = false;
  isEmptyFields: boolean = false;
  isDisabledButton: boolean = false;

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
    this.userNameCurrent = this.auth.user;     
  }

  addGeografia(form: NgForm) {
    if(this.geographyMasterService.selectedGeografia.state == (null || "") || 
        this.geographyMasterService.selectedGeografia.municipality == (null || "") ||
        this.geographyMasterService.selectedGeografia.zone == (null || "") ||
        this.geographyMasterService.selectedGeografia.subdivision == ( null || "")) {
      this.isEmptyFields = true;
    }else {
      this.isDisabledButton = true;
      this.isLoading = true;
      
      if(form.value._id){            
        this.geographyMasterService.putGeografia(form.value)
          .subscribe(data => {          
            this.getGeografia();
        });
        setTimeout(()=>{
          this.resetForm(form);
          this.isDisabledButton = false;
        },1000);                
      }else{        
        this.geographyMasterService.postGeografia(form.value)
          .subscribe(res =>{          
        });
        setTimeout(()=>{
          this.getGeografia();
          this.resetForm(form);
          this.isDisabledButton = false;             
        }, 1000);        
      }
      this.isLoading = false;        
      this.isEmptyFields = false;    
       
    }
      
  }

  getGeografia(){
    this.isLoading = true;
    this.geographyMasterService.getGeographyMasterByUser(this.auth.user)
      .subscribe((data: any) => {
        this.geographys = data.Items;  
        console.log(this.geographys); 
        this.isLoading = false;     
      });
  }

  editGeofrafia(geography: Geografia) {    
    this.geographyMasterService.selectedGeografia = geography;  
    console.log(this.geographyMasterService.selectedGeografia);
    this.userNameCurrent = this.auth.user;
    console.log(this.userNameCurrent);        
  }

  deleteGeografia(_id: string) {
    if (confirm('Esta seguro de Eliminar barrio o vereda?')) {
      this.geographyMasterService.deleteGeografia(_id)
        .subscribe(res => {        
        this.getGeografia();
      });
    }
  }

  //clean the form
  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.geographyMasterService.selectedGeografia = new Geografia();            
    }
  }

  ngOnDestroy(){
    this.geographyMasterService.selectedGeografia = new Geografia();
  }

}
