import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiComponent2 } from './kanji2.component';

describe('KanjiComponent2', () => {
  let component: KanjiComponent2;
  let fixture: ComponentFixture<KanjiComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KanjiComponent2]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KanjiComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
