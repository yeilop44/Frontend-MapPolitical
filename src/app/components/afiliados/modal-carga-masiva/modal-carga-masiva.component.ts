import {
    Component,
    OnInit,
    ViewChild,
    TemplateRef,
    ChangeDetectorRef,
    ElementRef, AfterViewInit, Output, EventEmitter
} from '@angular/core';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { combineLatest, Subscription } from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Label} from 'ng2-charts';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3000/upload';

@Component({
  selector: 'app-modal-carga-masiva',
  templateUrl: './modal-carga-masiva.component.html',
  styleUrls: ['./modal-carga-masiva.component.css']
})
export class ModalCargaMasivaComponent implements OnInit, AfterViewInit{
  @ViewChild('labelCampoImport') labelCampoImport: ElementRef;

  title = 'ng8fileupload';
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'file' });

  closeResult: string;
  modalRef: BsModalRef;
  archivo = 'algo';

  subscriptions: Subscription[] = [];
  messages: string[] = [];

  formImport: FormGroup;
  fileToUpload: File = null;

  @Output() datosGuardadosEvent: EventEmitter<any> = new EventEmitter();
  @Output() datosNoGuardadosEvent: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: BsModalService, public bsModalRef: BsModalRef) {
    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required)
    });

    //jonathan.velez: cuando un archivo es terminado de cargar, se ejecuta este evento.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.datosGuardadosEvent.emit(null);
    };
  }

  ngAfterViewInit() {

  }

  ngOnInit(): void {

  }



  /*open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal fade bd-example-modal-lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }*/

  openModal(template: TemplateRef<any>) {
    this.messages = [];
    /*const _combine = combineLatest(
        this.modalService.onShow,
        this.modalService.onShown,
        this.modalService.onHide,
        this.modalService.onHidden
    ).subscribe(() => this.changeDetection.markForCheck());

    this.subscriptions.push(
        this.modalService.onShow.subscribe((reason: string) => {
          this.messages.push(`onShow event has been fired`);
        })
    );
    this.subscriptions.push(
        this.modalService.onShown.subscribe((reason: string) => {
          this.messages.push(`onShown event has been fired`);
        })
    );
    this.subscriptions.push(
        this.modalService.onHide.subscribe((reason: string) => {
          const _reason = reason ? `, dismissed by ${reason}` : '';
          this.messages.push(`onHide event has been fired${_reason}`);
        })
    );
    this.subscriptions.push(
        this.modalService.onHidden.subscribe((reason: string) => {
          const _reason = reason ? `, dismissed by ${reason}` : '';
          this.messages.push(`onHidden event has been fired${_reason}`);
          this.unsubscribe();
        })
    );

    this.subscriptions.push(_combine);*/

    this.modalRef = this.modalService.show(template);
  }

  closeModalCargaMasiva(){
    this.modalRef.hide();
  }

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  printRoute() {
    alert('Este es el valor de la variable archivo: ' + this.archivo);
  }

  onFileChange(files: FileList) {

    this.labelCampoImport.nativeElement.innerText = Array.from(files)
        .map(f => f.name)
        .join(', ');
    this.fileToUpload = files.item(0);
  }

  import(): void {
    console.log('import ' + this.fileToUpload.name);
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

}
