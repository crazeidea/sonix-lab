import { Routes } from '@angular/router';
import { DefaultLayout } from './layout/default/default.layout';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.page'),
      },
      {
        path: 'sound-request',
        loadComponent: () => {
          return import('./pages/sound-request/sound-request.page');
        },
      },
    ],
  },
];
