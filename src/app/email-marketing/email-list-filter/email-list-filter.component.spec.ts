import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailListFilterComponent } from './email-list-filter.component';

describe('EmailListFilterComponent', () => {
  let component: EmailListFilterComponent;
  let fixture: ComponentFixture<EmailListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
