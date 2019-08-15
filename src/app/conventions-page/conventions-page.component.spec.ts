import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionsPageComponent } from './conventions-page.component';

describe('ConventionsPageComponent', () => {
  let component: ConventionsPageComponent;
  let fixture: ComponentFixture<ConventionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConventionsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConventionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
