import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionalPageComponent } from './institutional-page.component';

describe('InstitutionalPageComponent', () => {
  let component: InstitutionalPageComponent;
  let fixture: ComponentFixture<InstitutionalPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionalPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
