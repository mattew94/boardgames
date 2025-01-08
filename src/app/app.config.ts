import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient() /* TODO: poi aggiungere gli interceptor al suo interno -> withInterceptors([httpInterceptor]) */,
    provideRouter(routes),
    /* 
    TODO: aggiungere quando creerò lo store
    provideStore(),
    provideEffects([]), 
    */
  ],
};
