import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStatusComponentComponent } from './update-status-component.component';

describe('UpdateStatusComponentComponent', () => {
  let component: UpdateStatusComponentComponent;
  let fixture: ComponentFixture<UpdateStatusComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStatusComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStatusComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
