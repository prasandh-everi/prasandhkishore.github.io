import { Directive, ElementRef, HostListener, inject } from '@angular/core';

/**
 * Gracefully handles image loading failures.
 *
 * When the image fails to load (missing/broken asset), it hides the <img> and
 * adds a `img-fallback` class to its parent so a neutral placeholder can be
 * shown via CSS. This keeps the UI resilient when project/profile images are
 * absent (a required scenario for optional media).
 */
@Directive({
  selector: 'img[appImgFallback]',
})
export class ImgFallback {
  private readonly el = inject(ElementRef<HTMLImageElement>);

  @HostListener('error')
  onError(): void {
    const img = this.el.nativeElement as HTMLImageElement;
    img.style.display = 'none';
    img.parentElement?.classList.add('img-fallback');
  }
}
