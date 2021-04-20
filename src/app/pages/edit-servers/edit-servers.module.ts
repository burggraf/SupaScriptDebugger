import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditServersPageRoutingModule } from './edit-servers-routing.module';

import { EditServersPage } from './edit-servers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditServersPageRoutingModule
  ],
  declarations: [EditServersPage]
})
export class EditServersPageModule {}
