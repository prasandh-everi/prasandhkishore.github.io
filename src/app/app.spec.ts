import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { App } from './app';
import { PortfolioRepository } from './core/data/portfolio-repository';
import { PortfolioData } from './shared/models';

const emptyData = {
  profile: {
    name: 'Test',
    role: '',
    profileImage: '',
    shortIntroduction: '',
    longIntroduction: [],
    location: '',
    availability: '',
  },
  social: [],
  documents: [],
  experience: [],
  projects: [],
  skills: [],
  meta: { seoTitle: '', seoDescription: '', canonicalUrl: '', ogImage: '' },
} as PortfolioData;

class StubRepo extends PortfolioRepository {
  load() {
    return of(emptyData);
  }
}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), { provide: PortfolioRepository, useClass: StubRepo }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the routed-content region', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('main#main-content')).toBeTruthy();
  });
});
