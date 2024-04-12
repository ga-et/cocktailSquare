import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import  routes  from './app.routes';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDWBI7zpvwB_P0XNd1Nv_YILnvxMpeS74g",
  authDomain: "cocktailsquaregame.firebaseapp.com",
  projectId: "cocktailsquaregame",
  storageBucket: "cocktailsquaregame.appspot.com",
  messagingSenderId: "389241714553",
  appId: "1:389241714553:web:57ff616881b2d8096421a8",
  measurementId: "G-94RW1B5B1M"
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ])],

};
