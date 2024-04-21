import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MockApiModule } from './core/mock-api/mock-api.module';
import { mockApiServices } from './shared/mock-services';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(APP_ROUTES,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
    ),
    /* importProvidersFrom(
      MockApiModule.forRoot(mockApiServices)
    ), */
    provideClientHydration(),
    provideAnimationsAsync(),
  ]
};
