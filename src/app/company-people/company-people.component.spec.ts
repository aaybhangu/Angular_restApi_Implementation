import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPeopleComponent } from './company-people.component';

describe('CompanyPeopleComponent', () => {
  let component: CompanyPeopleComponent;
  let fixture: ComponentFixture<CompanyPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
