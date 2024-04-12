import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { importProvidersFrom } from '@angular/core';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

bootstrapApplication(AppComponent,
  {
    providers: [
      provideRouter(routeConfig), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"cocktailsquaregame","appId":"1:389241714553:web:57ff616881b2d8096421a8","storageBucket":"cocktailsquaregame.appspot.com","apiKey":"AIzaSyDWBI7zpvwB_P0XNd1Nv_YILnvxMpeS74g","authDomain":"cocktailsquaregame.firebaseapp.com","messagingSenderId":"389241714553","measurementId":"G-94RW1B5B1M"}))), importProvidersFrom(provideAnalytics(() => getAnalytics())), ScreenTrackingService, importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideDatabase(() => getDatabase())), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"cocktailsquaregame","appId":"1:389241714553:web:57ff616881b2d8096421a8","storageBucket":"cocktailsquaregame.appspot.com","apiKey":"AIzaSyDWBI7zpvwB_P0XNd1Nv_YILnvxMpeS74g","authDomain":"cocktailsquaregame.firebaseapp.com","messagingSenderId":"389241714553","measurementId":"G-94RW1B5B1M"}))), importProvidersFrom(provideFirestore(() => getFirestore()))
    ]
  }
).catch(err => console.error(err));