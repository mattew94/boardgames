import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
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
      getFirestore()),
    /* 
    TODO: aggiungere quando creerò lo store
    provideStore(),
    provideEffects([]), 
    */
  ],
};
