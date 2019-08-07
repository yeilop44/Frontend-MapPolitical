import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { DivipolMasterService } from '../../../services/divipol-master.service';
import { ElectoralMasterService } from '../../../services/electoral-master.service'
import { Electoral } from 'src/app/models/electoral';
import { Router } from '@angular/router';


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
  isLoading: boolean = false;
  isEmptyFields: boolean = false;
  isDisabledButton = false;
  isLogged;
  username;
  sessions;

  constructor(public auth: AuthService, private router: Router, private divipolMasterService: DivipolMasterService, 
    private electoralService: ElectoralMasterService) { 
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
          this.getElectoral(this.userNameCurrent);                  
        }else{          
          this.router.navigate(['login']);
        }
      });
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
    this.electoralService.selectedElectoral.municipality = null;   
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
    this.isDisabledButton = true;
    this.isEmptyFields = false;
    if(!this.electoralService.selectedElectoral.state || !this.electoralService.selectedElectoral.municipality ||
      !this.electoralService.selectedElectoral.votingStation || !this.electoralService.selectedElectoral.votingPlace ||
       !this.electoralService.selectedElectoral.numberTables){
     console.log("campos vacios");
     
     setTimeout(()=>{
       this.isDisabledButton = false;
       this.isEmptyFields = true;
     }, 100);
     
   }else{
     if(form.value._id) {      
       this.electoralService.putElectoral(form.value)
         .subscribe(res=>{           
       });
         
       setTimeout(()=>{
         this.getElectoral(this.userNameCurrent);
         form.reset();
         this.isDisabledButton = false;              
       }, 500); 
           
     }else {
       this.electoralService.postElectoral(form.value)
         .subscribe(res =>{          
       });
       
       setTimeout(()=>{        
       this.getElectoral(this.userNameCurrent);         
       form.reset();
       this.isDisabledButton = false;                
       }, 500);                
     }
     this.isEmptyFields = false;
       
   }      
    
  }

  getElectoral(username: string){
    this.isLoading = true;
    this.electoralService.getElectoralMastersByUser(username)
      .subscribe((data: any) => {
        this.electorals = data.Items; 
        this.isLoading = false;         
      });
  }

  editElectoral(electoral: Electoral){
    this.electoralService.selectedElectoral = electoral;
    this.userNameCurrent = this.username;
  }

  deleteElectoral(_id: string){
    if (confirm('Esta seguro de Eliminar este afiliado?')) {
      this.electoralService.deleteElectoral(_id)
        .subscribe(res => {
        console.log('Geografia deleted');
        this.getElectoral(this.userNameCurrent);
      });
    }
  }

  ngOnDestroy(){
    this.electoralService.selectedElectoral = new Electoral();
  }  

}
