import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: () => import('./routes/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'renovate',
        loadChildren: () => import('./routes/renovate/renovate.module').then(m => m.RenovateModule)
    },
    {
        path: 'renovateDetail',
        loadChildren: () => import('./routes/renovate-detail/renovate-detail.module').then(m => m.RenovateDetailModule)
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
