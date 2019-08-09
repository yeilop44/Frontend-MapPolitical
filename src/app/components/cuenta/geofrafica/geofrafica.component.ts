import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { DivipolMasterService } from '../../../services/divipol-master.service';
import { GeographyMasterService } from '../../../services/geography-master.service'
import { Geografia } from '../../../models/geografia';
import { Router } from '@angular/router';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';

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
  isLogged;
  username;
  sessions;
  
  constructor( public auth: AuthService, private router: Router, private geographyMasterService: GeographyMasterService, 
    private divipolMasterService: DivipolMasterService ) { 
    this.session();   
  }

  ngOnInit() {
    this.getDivipolInfo();        
  }

  session(){
    this.auth.session()
      .subscribe((res: any) =>{     
        console.log(res);     
        this.isLogged = res.isLogged;
        if(this.isLogged){          
          this.username = res.user.userName;
          this.userNameCurrent = this.username;
          this.sessions = res.session;  
          this.getGeografia(this.userNameCurrent);                  
        }else{          
          this.router.navigate(['login']);
        }
      });
  }

  getDivipolInfo() {
    this.divipolMasterService.getDivipolMasters()
      .subscribe((data: any ) => {        
        this.divipols = data.Items;        
        for(let i=0; i<this.divipols.length;i++){
            this.states[i] = this.divipols[i].state;            
        }      
      });
  }

  onOptionsSelectedState(value: string){ 
    this.geographyMasterService.selectedGeografia.municipality = null;   
    this.municipalitys = [];  
    for(let i=0;i<this.divipols.length;i++){
      if(value == this.divipols[i].state){      
        for(let j=0;j<this.divipols[i].municipality.length; j++){
          this.municipalitys[j] = this.divipols[i].municipality[j];    
        }               
      }      
    }    
    this.userNameCurrent = this.username;  
    this.isEmptyFields = false;
  }

  addGeografia(form: NgForm) {
    this.isDisabledButton = true;
    this.isEmptyFields = false;
    if(!this.geographyMasterService.selectedGeografia.state || !this.geographyMasterService.selectedGeografia.municipality ||
       !this.geographyMasterService.selectedGeografia.zone || !this.geographyMasterService.selectedGeografia.subdivision){
      console.log("campos vacios");
      
      setTimeout(()=>{
        this.isDisabledButton = false;
        this.isEmptyFields = true;
      }, 100);
      
    }else{
      if(form.value._id) {
        console.log(form.value);      
        this.geographyMasterService.putGeografia(form.value)
          .subscribe(res=>{
            console.log(res);           
        });
          
        setTimeout(()=>{
          this.getGeografia(this.userNameCurrent);
          form.reset();
          this.isDisabledButton = false;              
        }, 500); 
            
      }else {
        this.geographyMasterService.postGeografia(form.value)
          .subscribe(res =>{          
        });
        
        setTimeout(()=>{        
        this.getGeografia(this.userNameCurrent);         
        form.reset();
        this.isDisabledButton = false;                
        }, 500);                
      }
      this.isEmptyFields = false;        
    }        
  }

  getGeografia(username: string){
    this.isLoading = true;
    this.geographyMasterService.getGeographyMasterByUser(username)
      .subscribe((data: any) => {
        this.geographys = data.Items;  
        console.log(this.geographys); 
        this.isLoading = false;     
      });
  }

  editGeografia(geography: Geografia) {    
    console.log(geography);
    this.geographyMasterService.selectedGeografia = geography;      
    this.userNameCurrent = this.username;    
  }

  deleteGeografia(_id: string) {
    if (confirm('Esta seguro de Eliminar barrio o vereda?')) {
      this.geographyMasterService.deleteGeografia(_id)
        .subscribe(res => {        
        this.getGeografia(this.username);
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
