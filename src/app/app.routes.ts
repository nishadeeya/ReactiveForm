import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'', loadChildren: () =>
        import('./auth/auth.routes').then(
          (mod) => mod.auth_routes
        )}, 
        {path:'pages', loadChildren: () =>
        import('./page/page.routes').then(
          (mod) => mod.page_routes
        )},
];
