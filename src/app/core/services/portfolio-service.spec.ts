import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { PortfolioData } from '../../shared/models';
import { PortfolioRepository } from '../data/portfolio-repository';
import { PortfolioService } from './portfolio-service';

function makeData(): PortfolioData {
  return {
    profile: {
      name: 'Test User',
      role: 'Engineer',
      profileImage: 'p.webp',
      shortIntroduction: 'short',
      longIntroduction: ['long'],
      location: 'Remote',
      availability: 'Open',
    },
    social: [],
    documents: [
      {
        id: 'resume',
        type: 'resume',
        title: 'Resume',
        description: '',
        file: 'r.pdf',
        viewable: true,
        downloadable: true,
      },
    ],
    experience: [
      {
        id: 'a',
        company: 'Old',
        role: 'Dev',
        startDate: '2018-01',
        endDate: '2019-01',
        location: '',
        description: '',
        responsibilities: [],
        achievements: [],
        technologies: [],
      },
      {
        id: 'b',
        company: 'Current',
        role: 'Senior',
        startDate: '2022-01',
        endDate: null,
        location: '',
        description: '',
        responsibilities: [],
        achievements: [],
        technologies: [],
      },
    ],
    projects: [],
    skills: [],
    meta: { seoTitle: '', seoDescription: '', canonicalUrl: '', ogImage: '' },
  };
}

class FakeRepo extends PortfolioRepository {
  constructor(private readonly behavior: 'ok' | 'error') {
    super();
  }
  load() {
    return this.behavior === 'ok' ? of(makeData()) : throwError(() => new Error('boom'));
  }
}

describe('PortfolioService', () => {
  function setup(behavior: 'ok' | 'error') {
    TestBed.configureTestingModule({
      providers: [
        PortfolioService,
        { provide: PortfolioRepository, useValue: new FakeRepo(behavior) },
      ],
    });
    return TestBed.inject(PortfolioService);
  }

  it('loads data and sets success status', () => {
    const service = setup('ok');
    service.load();
    expect(service.status()).toBe('success');
    expect(service.profile()?.name).toBe('Test User');
  });

  it('sorts experience most-recent-first (Present first)', () => {
    const service = setup('ok');
    service.load();
    expect(service.experience()[0].id).toBe('b');
  });

  it('exposes the resume document', () => {
    const service = setup('ok');
    service.load();
    expect(service.resume()?.file).toBe('r.pdf');
  });

  it('sets error status on failure', () => {
    const service = setup('error');
    service.load();
    expect(service.hasError()).toBeTrue();
    expect(service.profile()).toBeNull();
  });
});
