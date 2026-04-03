import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MsalModule } from '@azure/msal-angular';
import { PublicClientApplication, BrowserCacheLocation, InteractionType } from '@azure/msal-browser';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        MsalModule.forRoot(
          new PublicClientApplication({
            auth: { clientId: 'test-client-id' },
            cache: { cacheLocation: BrowserCacheLocation.LocalStorage }
          }),
          { interactionType: InteractionType.Redirect, authRequest: { scopes: ['user.read'] } },
          { interactionType: InteractionType.Redirect, protectedResourceMap: new Map() }
        )
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
