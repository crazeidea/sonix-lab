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
        path: 'sand-in-your-eyes',
        loadComponent: () =>
          import(
            './pages/sand-in-your-eyes/sand-in-your-eyes/sand-in-your-eyes.page'
          ),
      },
    ],
  },
];
