import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandAddHistoryComponent } from './demand-add-history.component';

describe('DemandAddHistoryComponent', () => {
  let component: DemandAddHistoryComponent;
  let fixture: ComponentFixture<DemandAddHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandAddHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandAddHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
