import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CardSelectorComponent } from './card-selector/card-selector.component';
import { CardViewerComponent } from './card-viewer/card-viewer.component';


@NgModule({
  declarations: [
    AppComponent,
    CardSelectorComponent,
    CardViewerComponent
],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
