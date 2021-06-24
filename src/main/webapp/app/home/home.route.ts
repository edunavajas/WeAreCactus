import { Route } from '@angular/router';

import { LoginComponent } from 'app/login/login.component';

export const HOME_ROUTE: Route = {
  path: '',
  component: LoginComponent,
  data: {
    pageTitle: 'home.title',
  },
};
