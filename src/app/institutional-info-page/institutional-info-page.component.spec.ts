import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionalInfoPageComponent } from './institutional-info-page.component';

describe('InstitutionalInfoPageComponent', () => {
  let component: InstitutionalInfoPageComponent;
  let fixture: ComponentFixture<InstitutionalInfoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionalInfoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionalInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
