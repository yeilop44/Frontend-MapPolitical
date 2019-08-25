import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleContactoComponent } from './modal-detalle-contacto.component';

describe('ModalDetalleContactoComponent', () => {
  let component: ModalDetalleContactoComponent;
  let fixture: ComponentFixture<ModalDetalleContactoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalleContactoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalleContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
