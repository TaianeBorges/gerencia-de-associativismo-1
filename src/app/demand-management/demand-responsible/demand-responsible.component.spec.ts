import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandResponsibleComponent } from './demand-responsible.component';

describe('DemandResponsibleComponent', () => {
  let component: DemandResponsibleComponent;
  let fixture: ComponentFixture<DemandResponsibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandResponsibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandResponsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
