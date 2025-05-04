import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection, isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: true,
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient() /* TODO: poi aggiungere gli interceptor al suo interno -> withInterceptors([httpInterceptor]) */,
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp(
      {
        "projectId":"boardgames-b49a8",
        "appId":"1:1091777576407:web:45cc945bd3374e59239f92",
        "storageBucket":"boardgames-b49a8.appspot.com"
        ,"apiKey":"AIzaSyCyVc2tLS0Bszz0PyUZH8Lex5WRZYXOQ0k"
        ,"authDomain":"boardgames-b49a8.firebaseapp.com"
        ,"messagingSenderId":"1091777576407"
        ,"measurementId":"G-DJEJ02BRBC"

      })), 
      provideAuth(() => getAuth()), 
      provideFirestore(() => 
      getFirestore()), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
    /* 
    TODO: aggiungere quando creerò lo store
    provideStore(),
    provideEffects([]), 
    */
  ],
};
