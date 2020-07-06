import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTechnicalAreaComponent } from './card-technical-area.component';

describe('CardTechnicalAreaComponent', () => {
  let component: CardTechnicalAreaComponent;
  let fixture: ComponentFixture<CardTechnicalAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardTechnicalAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTechnicalAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
