import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MsalModule } from '@azure/msal-angular';
import { PublicClientApplication, BrowserCacheLocation, InteractionType } from '@azure/msal-browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        MsalModule.forRoot(
          new PublicClientApplication({
            auth: { clientId: 'test-client-id' },
            cache: { cacheLocation: BrowserCacheLocation.LocalStorage }
          }),
          { interactionType: InteractionType.Redirect, authRequest: { scopes: ['user.read'] } },
          { interactionType: InteractionType.Redirect, protectedResourceMap: new Map() }
        )
      ],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have title 'my-personal-web-angular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.title).toEqual('my-personal-web-angular');
  });
});
