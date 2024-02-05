import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiriganaComponent } from './hirigana.component';

describe('HiriganaComponent', () => {
  let component: HiriganaComponent;
  let fixture: ComponentFixture<HiriganaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HiriganaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HiriganaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
