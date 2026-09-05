import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppSection } from '../../../shared/ui/section/app-section';
import { AppButton } from '../../../shared/ui/button/app-button';
import { ContactRequest } from '../contact.models';

/**
 * Contact page: a typed reactive form with accessible validation. A valid
 * submission opens Gmail's compose page with the message prefilled.
 */
@Component({
  selector: 'app-contact-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, AppSection, AppButton],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss',
})
export class ContactPage {
  private readonly fb = inject(FormBuilder);
  private readonly document = inject(DOCUMENT);
  private readonly recipientEmail = 'prasanthpalanisamy5@gmail.com';

  protected readonly feedback = signal('');

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    subject: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
  });

  /** True when a control is invalid and has been touched/dirtied. */
  protected showError(control: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[control];
    return c.invalid && (c.dirty || c.touched);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue() as ContactRequest;
    const subject = encodeURIComponent(payload.subject.trim());
    const body = encodeURIComponent(
      `Hi Prasanth,\n\n${payload.message.trim()}\n\nFrom: ${payload.name.trim()}\nReply to: ${payload.email.trim()}`,
    );
    const gmailComposeUrl =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=${encodeURIComponent(this.recipientEmail)}&su=${subject}&body=${body}`;

    this.feedback.set(
      'Gmail should open with this message prefilled. Please review it and press Send.',
    );
    const browserWindow = this.document.defaultView;
    const gmailWindow = browserWindow?.open('', '_blank');

    // Some browsers block new tabs. Continue in the current tab as a reliable fallback.
    if (gmailWindow) {
      gmailWindow.opener = null;
      gmailWindow.location.assign(gmailComposeUrl);
    } else {
      browserWindow?.location.assign(gmailComposeUrl);
    }

    this.form.reset();
  }
}
