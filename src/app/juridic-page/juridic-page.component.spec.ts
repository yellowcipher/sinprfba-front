import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuridicPageComponent } from './juridic-page.component';

describe('JuridicPageComponent', () => {
  let component: JuridicPageComponent;
  let fixture: ComponentFixture<JuridicPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuridicPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuridicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
