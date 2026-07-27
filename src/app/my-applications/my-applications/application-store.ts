// study-permit.store.ts

import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStore {

  readonly refreshRequired = signal(false);

  readonly successMessage = signal('');

  notifyUpdated(message: string) {

    this.successMessage.set(message);

    this.refreshRequired.set(true);

  }

  clear() {

    this.refreshRequired.set(false);

    this.successMessage.set('');

  }

}