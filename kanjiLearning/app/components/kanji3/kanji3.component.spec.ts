import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiComponent3 } from './kanji3.component';

describe('KanjiComponent2', () => {
  let component: KanjiComponent3;
  let fixture: ComponentFixture<KanjiComponent3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KanjiComponent3]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KanjiComponent3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
