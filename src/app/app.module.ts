import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardSelectorComponent } from './card-selector/card-selector.component';
import { CardViewerComponent } from './card-viewer/card-viewer.component';
import { CardsService } from './services/cards.service';
import { FactionsService } from './services/factions.service';
import { SeasonsService } from './services/seasons.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [
    AppComponent,
    CardSelectorComponent,
    CardViewerComponent
],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    OrderModule
  ],
  providers: [
    CardsService,
    FactionsService,
    SeasonsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
