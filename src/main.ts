import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
  MsalGuard,
  MsalInterceptor,
  MsalModule,
  MsalRedirectComponent,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalBroadcastService,
  MsalService
} from '@azure/msal-angular';
import {
  InteractionType,
  PublicClientApplication,
  BrowserCacheLocation
} from '@azure/msal-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

const isIframe = window !== window.parent && !window.opener;

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: MSAL_INSTANCE,
      useValue: new PublicClientApplication({
        auth: {
          clientId: 'a1b99b18-caf6-4e5d-ab28-4456f87a9ffc',
          authority: 'https://login.microsoftonline.com/common',
          redirectUri: 'http://localhost:4200'
        },
        cache: {
          cacheLocation: BrowserCacheLocation.LocalStorage
        }
      })
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useValue: {
        interactionType: InteractionType.Redirect,
        authRequest: { scopes: ['user.read'] }
      }
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useValue: {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          ['https://graph.microsoft.com/v1.0/me', ['user.read']]
        ])
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard,
    MsalService,
    MsalBroadcastService
  ]
}).catch(err => console.error(err));
