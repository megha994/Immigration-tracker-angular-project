import { Injectable, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class StudyPermitStateMgtService {

  private readonly fb = inject(FormBuilder);

  // Create the form once
  studyPermitForm: FormGroup = this.fb.group({
    selectedCategory: ['', Validators.required],
    country: ['', Validators.required],
  });

  // Signal to store the raw form value
  studyPermitFormValue = signal<any>(null);

  constructor() {
    // Restore saved state if available
    const saved = this.studyPermitFormValue();
    if (saved) {
      this.studyPermitForm.patchValue(saved);
    }

    // Sync form → signal automatically
    this.studyPermitForm.valueChanges.subscribe(value => {
      this.studyPermitFormValue.set(value);
    });
  }

  /**
   * Restore saved signal values back into the form
   * Called when user returns to the page and state should be preserved
   */
  restoreIntoForm() {
    const saved = this.studyPermitFormValue();
    if (!saved) return;

    this.studyPermitForm.patchValue({
      selectedCategory: saved.selectedCategory ?? '',
      country: saved.country ?? ''
    });
  }

  /**
   * Reset both the form and the stored signal
   * Called when user starts a fresh workflow
   */
  reset() {
    this.studyPermitForm.reset({
      selectedCategory: '',
      country: ''
    });

    this.studyPermitFormValue.set(null);
  }
}
