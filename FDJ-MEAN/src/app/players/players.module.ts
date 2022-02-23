import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersComponent } from './players.component';
import { PlayersRoutingModule } from './players-routing.module';
import { MaterialModule } from '../shared/modules/material/material.module';

@NgModule({
  imports: [CommonModule, PlayersRoutingModule, MaterialModule],
  exports: [PlayersComponent],
  declarations: [PlayersComponent],
  providers: [],
})
export class PlayersModule {}
