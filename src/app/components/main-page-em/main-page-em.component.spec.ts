import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageEmComponent } from './main-page-em.component';

describe('MainPageEmComponent', () => {
  let component: MainPageEmComponent;
  let fixture: ComponentFixture<MainPageEmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageEmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPageEmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
