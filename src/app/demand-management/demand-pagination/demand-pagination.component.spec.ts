import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandPaginationComponent } from './demand-pagination.component';

describe('DemandPaginationComponent', () => {
  let component: DemandPaginationComponent;
  let fixture: ComponentFixture<DemandPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
