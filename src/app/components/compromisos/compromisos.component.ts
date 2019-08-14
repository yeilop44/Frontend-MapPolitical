import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AffiliatesService } from '../../services/affiliates.service';
import { CommitmentMasterService } from '../../services/commitment-master.service';
import { CommitmentsService } from '../../services/commitments.service';
import { Chart } from 'chart.js'
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';

 
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { Compromiso } from '../../models/compromiso';

export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-compromisos',
  templateUrl: './compromisos.component.html',
  styleUrls: ['./compromisos.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class CompromisosComponent implements OnInit {
  
  userNameCurrent;
  typeCommitmentText;
  isLogged: boolean;
  user: any;
  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;
  
  afiliados: any [] = [];  
  compromisos: any [] = [];
  compromisosType: any [] = [];
  compromisoMaster: any [] = [];  
  compromisoMasterUnique: any [] = [];  
  compromisoDescriptionsSelect: any [] = [];
  compromiso : Compromiso;
  contactosComprometidos: any[] = [];

  chart: any;
  compromisosDescriptions: any[] = [];
  compromisosDescriptionsName: any[] = [];
  compromisosDescriptionsCount: any[] = [];
  color:any[]=[];

  model1: Date;
  model2: Date;

  constructor(private auth: AuthService, private affiliateService: AffiliatesService, private router: Router, 
              private commitmentMasterService: CommitmentMasterService, private  commitmentService: CommitmentsService) { 
    this.session();  
    
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.afiliados.slice())
    );

    this.compromiso = new Compromiso();
    

  }

  ngOnInit() {
    
  }



  get today() {
    return new Date();
  }

  session(){
    this.auth.session()
      .subscribe((res: any) =>{                  
        this.isLogged = res.isLogged;
        if(this.isLogged){          
          this.user = res.user;   
          this.userNameCurrent = this.user.user.userName;
          this.compromiso.userName = this.user.user.userName;    
          this.getCommitments(this.user.user.userName); 
          this.getCommitmentsMaster(this.user.user.userName);             
          this.affiliateService.getAffiliatesByUser(this.user.user.userName)
            .subscribe((data:any) => {              
              this.afiliados = data.affiliates;              
              for(let i=0; i<this.afiliados.length; i++){
                 this.afiliados[i].fullName = this.afiliados[i].names + ' ' + this.afiliados[i].surnames; 
              }
          });                                                                                    
        }else{        
          this.router.navigate(['login']);
        }
    });
  }

  private _filterStates(value: any): State[] {
    const filterValue = value.toLowerCase();

    return this.afiliados.filter(state => state.fullName.toLowerCase().indexOf(filterValue) === 0);
    
  }

  getCommitments(user: string){
    this.commitmentService.getCommitmentsByUser(user)
      .subscribe((data: any) => {        
        this.compromisos = data.commitments;
        this.compromisosType = _.uniqBy(this.compromisos, 'typeCommitment');   
        let compromisoType = this.compromisosType[0];        
        if(compromisoType){
          this.verTipoCompromiso(compromisoType); 
        }
           
    });
  }

  getCommitmentsMaster(user: string){
    this.commitmentMasterService.getCommitmentMasterByUser(user)
    .subscribe((res:any)=>{
      this.compromisoMaster  = res.Items;
      this.compromisoMasterUnique = _.uniqBy(this.compromisoMaster, 'typeCommitment');          
    });
  }

  onOptionsSelectedTypeCommitment(value: string) {    
    const compromisoDescriptions1 = []       
    for (let i = 0; i < this.compromisoMaster.length; i++) {      
      if (value == this.compromisoMaster[i].typeCommitment) {
        compromisoDescriptions1[i] = this.compromisoMaster[i].commitmentDescription;
      }
    }
    this.compromisoDescriptionsSelect = compromisoDescriptions1.filter( () => true)
  }

  getFullName(value: string){    
    this.compromiso.affiliate.fullname = value;
    this.compromiso.userName = this.user.user.userName;  
  }

  addCompromisos(compromiso: Compromiso){    
    this.commitmentService.postCompromiso(compromiso)
      .subscribe(res =>{        
        this.getCommitments(this.user.user.userName);
    });
    this.compromiso = new Compromiso();
  }

  verTipoCompromiso(compromiso: Compromiso){    
    this.commitmentService.getCommitmentsByType(compromiso)
    .subscribe((data:any)=>{      
      this.contactosComprometidos = data.commitment;
    });
 
    this.getCountCommitmentsDescription(compromiso);
  }
  
  deleteCompromiso(_id: string){
    if (confirm('Esta seguro de Eliminar este compromiso?')) {
      this.commitmentService.deleteCompromiso(_id)
        .subscribe(res => {
        console.log('deleted');
        this.getCommitments(this.user.user.userName);
      });
    }    
  }
   
  dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
 };

  getCountCommitmentsDescription(compromiso: Compromiso){  
    if (this.chart) this.chart.destroy();
    this.compromisosDescriptions = [];
    this.compromisosDescriptionsCount = [];
    this.compromisosDescriptionsName = [];
    this.commitmentService.getCountcommitmentDescription(compromiso)
      .subscribe((data: any) => {
        this.compromisosDescriptions = data.commitmentDescriptions;
        let typeTitle = compromiso.typeCommitment;
      
        for(let i=0;i<this.compromisosDescriptions.length;i++){         
          this.compromisosDescriptionsName[i] = this.compromisosDescriptions[i]._id;
          this.compromisosDescriptionsCount[i] = this.compromisosDescriptions[i].totalAmount;         
          this.color[i] = this.dynamicColors();          
        }

       this.chart = new Chart('canvas', {
          type: 'doughnut',
          data: {
            datasets: [{
                data: this.compromisosDescriptionsCount,
                backgroundColor: this.color
            }],
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: this.compromisosDescriptionsName
          },
          options: {
            title: {
              display: true,
              text: typeTitle
            }
          } 
        });
      });
  } 

}
