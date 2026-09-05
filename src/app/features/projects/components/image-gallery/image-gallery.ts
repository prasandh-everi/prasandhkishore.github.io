import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  input,
  signal,
} from '@angular/core';
import { ImgFallback } from '../../../../shared/directives/img-fallback';

/**
 * Reusable, accessible image gallery.
 *
 * - Thumbnails select a large "current" image (state held in signals).
 * - Clicking the current image opens a full-screen lightbox modal.
 * - Keyboard: ArrowLeft/Right navigate, Escape closes (handled while open).
 * - `computed` derives the current image so the template stays declarative.
 *
 * Screenshots are optional at the data level; this component simply renders
 * nothing when there are no images.
 */
@Component({
  selector: 'app-image-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ImgFallback],
  templateUrl: './image-gallery.html',
  styleUrl: './image-gallery.scss',
})
export class ImageGallery {
  readonly images = input.required<readonly string[]>();
  readonly label = input('Screenshot');

  private readonly index = signal(0);
  protected readonly isOpen = signal(false);

  protected readonly currentIndex = this.index.asReadonly();
  protected readonly current = computed(() => this.images()[this.index()] ?? '');
  protected readonly count = computed(() => this.images().length);

  select(i: number): void {
    this.index.set(i);
  }

  next(): void {
    this.index.update((i) => (i + 1) % this.count());
  }

  prev(): void {
    this.index.update((i) => (i - 1 + this.count()) % this.count());
  }

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.isOpen()) {
      return;
    }
    switch (event.key) {
      case 'ArrowRight':
        this.next();
        break;
      case 'ArrowLeft':
        this.prev();
        break;
      case 'Escape':
        this.close();
        break;
    }
  }
}
