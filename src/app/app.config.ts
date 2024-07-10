import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAppConfig } from './core/config/app-config.provider'
import { loaderInterceptor } from './core/ui/loader.interceptor';
import { httpErrorInterceptor } from './core/ui/error.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(
      withFetch(),
      withInterceptors([loaderInterceptor, httpErrorInterceptor])
    ),
    provideRouter(routes),
    provideAppConfig(),
  ]
};
