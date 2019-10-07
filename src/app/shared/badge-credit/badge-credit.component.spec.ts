import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeCreditComponent } from './badge-credit.component';

describe('BadgeCreditComponent', () => {
  let component: BadgeCreditComponent;
  let fixture: ComponentFixture<BadgeCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
