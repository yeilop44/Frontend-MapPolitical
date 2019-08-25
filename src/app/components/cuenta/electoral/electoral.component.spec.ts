import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectoralComponent } from './electoral.component';

describe('ElectoralComponent', () => {
  let component: ElectoralComponent;
  let fixture: ComponentFixture<ElectoralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectoralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectoralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
