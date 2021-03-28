import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from './_alert';

import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
  path: 'console',
    component: InputComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    LoginComponent
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
