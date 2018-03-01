import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardViewerComponent } from './card-viewer/card-viewer.component';
import { CardSelectorComponent } from './card-selector/card-selector.component';

export const routes: Routes = [
  { path: 'card/:number', component: CardViewerComponent },
  { path: 'selector', component: CardSelectorComponent },
  { path: '', redirectTo: '/selector', pathMatch: 'full' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { useHash: true })]
})

export class AppRoutingModule { }
