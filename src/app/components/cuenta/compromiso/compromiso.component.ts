import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommitmentMasterService } from '../../../services/commitment-master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compromiso',
  templateUrl: './compromiso.component.html',
  styleUrls: ['./compromiso.component.css']
})
export class CompromisoComponent implements OnInit {
  
  commitments: any[] = [];
  userNameCurrent;
  isLogged;
  username;
  sessions;

  constructor(public auth: AuthService, private router: Router, private commitmentMasterService: CommitmentMasterService) { 
    this.session();   
  }

  ngOnInit() {
  }

  session(){
    this.auth.session()
      .subscribe((res: any) =>{             
        this.isLogged = res.isLogged;
        if(this.isLogged){          
          this.username = res.user.user.userName;
          this.userNameCurrent = this.username;
          this.sessions = res.session;
          this.getCompromisos(this.username);                             
        }else{          
          this.router.navigate(['login']);
        }
      });
  }

  addCompromiso(form: NgForm) {    
      if(form.value._id) {
        this.commitmentMasterService.putCommitmentMaster(form.value)
          .subscribe(res=>{
            
        });
        setTimeout(()=>{
          this.getCompromisos(this.userNameCurrent);
          form.reset();                        
        }, 500); 
                
      }else {
        this.commitmentMasterService.postCommitmentMaster(form.value)
          .subscribe(res =>{   
                 
        });
        setTimeout(()=>{
          this.getCompromisos(this.userNameCurrent);
          form.reset();                        
        }, 500);                               
      }              
  }

  getCompromisos(username: string){    
    this.commitmentMasterService.getCommitmentMasterByUser(username)
      .subscribe((data: any) => {                          
        this.commitments = data.Items;          
    });
  }
  
  editCompromiso(commitment){
    this.commitmentMasterService.selectedCommitmentMaster = commitment;
    this.userNameCurrent = this.username; 
  }
  
  deleteCompromiso(_id: string) {
    if (confirm('Esta seguro de Eliminar este tipo de compromiso?')) {
      this.commitmentMasterService.deleteCommitmentMaster(_id)
        .subscribe(res => {        
        this.getCompromisos(this.username);
      });
    }
  }



}
