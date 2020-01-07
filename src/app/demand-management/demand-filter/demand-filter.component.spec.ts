import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandFilterComponent } from './demand-filter.component';

describe('DemandFilterComponent', () => {
  let component: DemandFilterComponent;
  let fixture: ComponentFixture<DemandFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
