import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivreDetailsPageRoutingModule } from './livre-details-routing.module';

import { LivreDetailsPage } from './livre-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivreDetailsPageRoutingModule
  ],
  declarations: [LivreDetailsPage]
})
export class LivreDetailsPageModule {}
