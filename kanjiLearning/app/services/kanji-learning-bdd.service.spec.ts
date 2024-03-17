import { TestBed } from '@angular/core/testing';

import { KanjiLearningBddService } from './kanji-learning-bdd.service';

describe('KanjiLearningBddService', () => {
  let service: KanjiLearningBddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KanjiLearningBddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
