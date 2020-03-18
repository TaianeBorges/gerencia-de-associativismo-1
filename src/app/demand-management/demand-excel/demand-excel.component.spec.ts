import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandExcelComponent } from './demand-excel.component';

describe('DemandExcelComponent', () => {
  let component: DemandExcelComponent;
  let fixture: ComponentFixture<DemandExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
