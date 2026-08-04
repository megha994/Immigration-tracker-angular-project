import { Injectable, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class StudyPermitStateMgtService {

  private readonly fb = inject(FormBuilder);

  // 1️⃣ Create the form ONCE (this is the key)
  studyPermitForm: FormGroup = this.fb.group({
    selectedCategory: ['', Validators.required],
    country: ['', Validators.required],
  });

  // 2️⃣ Signal to store the raw form value
  studyPermitFormValue = signal<any>(null);

  constructor() {
    // 3️⃣ Restore saved state if available
    const saved = this.studyPermitFormValue();
    if (saved) {
      this.studyPermitForm.patchValue(saved);
    }

    // 4️⃣ Sync form → signal automatically
    this.studyPermitForm.valueChanges.subscribe(value => {
      this.studyPermitFormValue.set(value);
    });
  }

  // 5️⃣ Optional helper
  reset() {
    this.studyPermitForm.reset();
    this.studyPermitFormValue.set(null);
  }
}
