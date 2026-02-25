import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EducationComponent } from './education/education.component';
import { HomeComponent } from './home/home.component';

import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication, BrowserCacheLocation } from '@azure/msal-browser';
import { ProfileComponent } from './profile/profile.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from "@angular/common/http";

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    EducationComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: 'a1b99b18-caf6-4e5d-ab28-4456f87a9ffc',
        authority: 'https://login.microsoftonline.com/common',
        redirectUri: 'http://localhost:4200'
      },
      cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage
      }
    }),
      {
        interactionType: InteractionType.Redirect, // MSAL Guard Configuration
        authRequest: {
          scopes: ['user.read']
        }
      },
      {
        interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
        protectedResourceMap: new Map([
          ['https://graph.microsoft.com/v1.0/me', ['user.read']]
        ])
      })
  ],
  providers: [
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
