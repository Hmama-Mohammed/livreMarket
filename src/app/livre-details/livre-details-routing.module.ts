import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivreDetailsPage } from './livre-details.page';

const routes: Routes = [
  {
    path: '',
    component: LivreDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivreDetailsPageRoutingModule {}
