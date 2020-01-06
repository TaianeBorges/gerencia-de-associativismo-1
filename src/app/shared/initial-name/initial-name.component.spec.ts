import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialNameComponent } from './initial-name.component';

describe('InitialNameComponent', () => {
  let component: InitialNameComponent;
  let fixture: ComponentFixture<InitialNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
