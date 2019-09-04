import { Component, OnInit, TemplateRef, Input   } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-detalle-contacto',
  templateUrl: './modal-detalle-contacto.component.html',
  styleUrls: ['./modal-detalle-contacto.component.css']
})
export class ModalDetalleContactoComponent implements OnInit {
  
@Input() message: string = 'Message here...'; // we can set the default value also
@Input() names: string;
@Input() surnames: string;
@Input() identification: number ;
@Input() phone: number ;
@Input() birthdate: string; 
@Input() votingStation: string; 
@Input() votingTable: string; 
@Input() leader: string; 
@Input() subdivision: string; 
  modalRef: BsModalRef;



  constructor(private modalService: BsModalService, public bsModalRef: BsModalRef) { }

  ngOnInit() {    
     
  }

 



}
