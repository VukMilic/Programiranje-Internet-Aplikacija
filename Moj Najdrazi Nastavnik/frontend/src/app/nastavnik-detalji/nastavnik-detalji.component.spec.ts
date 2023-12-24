import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NastavnikDetaljiComponent } from './nastavnik-detalji.component';

describe('NastavnikDetaljiComponent', () => {
  let component: NastavnikDetaljiComponent;
  let fixture: ComponentFixture<NastavnikDetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NastavnikDetaljiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NastavnikDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
