import { Routes } from "@angular/router";

import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./login/login.component";

export const auth_routes: Routes = [{
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }, {
    path: '', component: AuthComponent,
    children: [
      {
        path: 'login', component: LoginComponent
      },
    ]
  }
  ];