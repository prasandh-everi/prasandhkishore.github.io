import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PortfolioService } from './core/services/portfolio-service';
import { ThemeService } from './core/services/theme-service';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';

/** Root application shell. */
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly portfolio = inject(PortfolioService);
  // Injected so the theme effect is created at startup (applies data-theme).
  private readonly theme = inject(ThemeService);

  ngOnInit(): void {
    // Kick off the single portfolio load as early as possible.
    this.portfolio.load();
  }
}
