import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowseComponent } from './dashboard/browse/browse.component';
import { ListingComponent } from './dashboard/listing/listing.component';
import { LoginregComponent } from './loginreg/loginreg.component';
import { LogoffComponent } from './logoff/logoff.component';
import { AppComponent } from './app.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: LoginregComponent},
    { path: 'dashboard', pathMatch: 'full', redirectTo: 'dashboard/browse' },
    { path: 'dashboard', component: DashboardComponent, children: [
      { path: 'browse', component: BrowseComponent }, 
      { path: 'listings', component: ListingComponent }
    ]},
    { path: 'logoff', component: LogoffComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
