import {
  DoBootstrap,
  NgModule,
  Injector,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { FeaturesModule } from './features/features.module';

import { MainMenuComponent } from './shared';
import { CustomTableComponent } from './features/components';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, MainMenuComponent],
  imports: [BrowserModule, FeaturesModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    
    const appComponent = createCustomElement(AppComponent, {
      injector: this.injector,
    });
    customElements.define('app-root', appComponent);

    const customTableComponent = createCustomElement(CustomTableComponent, {
      injector: this.injector,
    });
    customElements.define('custom-table', customTableComponent);

  }
}
