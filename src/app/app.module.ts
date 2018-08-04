import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import 'hammerjs';
import { MenuComponent } from './menu/menu.component';

import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
