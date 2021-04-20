import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditServersPage } from './edit-servers.page';

const routes: Routes = [
  {
    path: '',
    component: EditServersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditServersPageRoutingModule {}
