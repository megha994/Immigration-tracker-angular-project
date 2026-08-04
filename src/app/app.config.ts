import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {providePrimeNG} from 'primeng/config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { mockBackendInterceptor  } from './my-applications/mock-backend.interceptor';
import { routes } from './app.routes';
import Aura from '@primeuix/themes/aura';
// import { provideAnimations} from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideAnimations,
    providePrimeNG({
theme:{
  preset:Aura
}
    }),
    provideHttpClient(
      withInterceptors([mockBackendInterceptor ])
    ),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
