import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'Home',
    component: HomeComponent,
  },
  {
    /** players component is lazy loaded */
    path: 'team/:_id',
    loadChildren: () =>
      import('./players/players.module').then((mod) => mod.PlayersModule),
  },
  {
    path: '**',
    redirectTo: 'Home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
