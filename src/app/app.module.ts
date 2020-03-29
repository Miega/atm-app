import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from './_alert';

import { AppComponent } from './app.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { RestockComponent } from './restock/restock.component';
import { OverviewComponent } from './overview/overview.component';

const appRoutes: Routes = [
  {
    path: '',
    component: WithdrawComponent
  },
  {
    path: 'restock',
    component: RestockComponent
  },
  {
    path: 'overview',
    component: OverviewComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    WithdrawComponent,
    RestockComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AlertModule,
    RouterModule.forRoot(
      appRoutes,
      {onSameUrlNavigation: 'reload'}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
