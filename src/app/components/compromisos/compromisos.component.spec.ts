import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompromisosComponent } from './compromisos.component';

describe('CompromisosComponent', () => {
  let component: CompromisosComponent;
  let fixture: ComponentFixture<CompromisosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompromisosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompromisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
