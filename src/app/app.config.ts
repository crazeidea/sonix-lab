import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import ko from '@angular/common/locales/ko'
import { registerLocaleData } from '@angular/common';
registerLocaleData(ko, 'ko-KR')

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions(), withInMemoryScrolling({anchorScrolling:"enabled"}) ),
    provideClientHydration(withEventReplay()),
    {
      provide: LOCALE_ID, 
      useValue: 'ko-KR'
    }
  ],
};
