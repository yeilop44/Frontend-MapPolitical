import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AffiliatesService } from '../../../services/affiliates.service';
import { AuthService } from '../../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Afiliado } from '../../../models/afiliado';
import { Router } from '@angular/router';
import {} from 'googlemaps';

@Component({
  selector: 'app-modal-nuevo-contacto',
  templateUrl: './modal-nuevo-contacto.component.html',
  styleUrls: ['./modal-nuevo-contacto.component.css']
})
export class ModalNuevoContactoComponent implements OnInit {

  @ViewChild('map') mapElement: any;
  @ViewChild('search') public searchElement: any;

  closeResult: string;

  isNewAffiliate: boolean = false;
  isLoading: boolean = false;

  affiliates: any[] = [];
  userNameCurrent;

  constructor(
                private modalService: NgbModal,
                private affiliateService: AffiliatesService,
                public auth: AuthService,
                private router: Router
  ) {
    if(!this.auth.isLogged){
      this.router.navigate(['/login']);
    }

    this.userNameCurrent = this.auth.user;
    console.log(this.userNameCurrent);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit() {
  }

  addAfiliado(form: NgForm) {
    if (form.value._id) {
      this.affiliateService.putAfiliado(form.value)
          .subscribe(res => {
            console.log('Affiliate Updated');
            this.isNewAffiliate = false;

          });

    } else {
      this.affiliateService.postAfiliado(form.value)
          .subscribe(res => {
            console.log('Affiliate Saved');
            this.isNewAffiliate = false;
          });
    }
  }

}
