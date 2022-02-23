import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent } from './players.component';

export const playersRouteList: Routes = [
  { path: '', component: PlayersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(playersRouteList)],
  exports: [RouterModule],
})
export class PlayersRoutingModule {}
