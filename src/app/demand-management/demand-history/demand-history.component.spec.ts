import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandHistoryComponent } from './demand-history.component';

describe('DemandHistoryComponent', () => {
  let component: DemandHistoryComponent;
  let fixture: ComponentFixture<DemandHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
