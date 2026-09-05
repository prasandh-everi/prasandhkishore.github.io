import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme-service';
import { AppIcon } from '../../shared/ui/icon/app-icon';

/**
 * Button that toggles between light and dark themes.
 * Reads the resolved theme from ThemeService (a signal) and shows the icon of
 * the theme the user would switch *to*.
 */
@Component({
  selector: 'app-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppIcon],
  template: `
    <button
      type="button"
      class="theme-toggle"
      (click)="theme.toggle()"
      [attr.aria-label]="label()"
      [title]="label()"
    >
      <app-icon [name]="isDark() ? 'sun' : 'moon'" />
    </button>
  `,
  styles: `
    .theme-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      color: var(--color-text);
      background: transparent;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-full);
      cursor: pointer;
      transition:
        border-color var(--transition-fast),
        color var(--transition-fast);
    }

    .theme-toggle:hover {
      border-color: var(--color-primary);
      color: var(--color-primary);
    }
  `,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
  protected readonly isDark = computed(() => this.theme.resolved() === 'dark');
  protected readonly label = computed(() =>
    this.isDark() ? 'Switch to light theme' : 'Switch to dark theme',
  );
}
