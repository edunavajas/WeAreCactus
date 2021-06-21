import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { LOGIN_ROUTE } from './login.route';
import { LoginComponent } from './login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([LOGIN_ROUTE]), MatFormFieldModule, MatInputModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginModule {}
