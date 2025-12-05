import { Routes } from '@angular/router';
import { DefaultLayout } from './layout/default/default.layout';
import AdminLayout from './layout/admin/admin.layout';

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
{
  path: 'admin',
  
  children: [
    {
      path: '',
      loadComponent: () => import('./pages/admin/login/login.page'),
    },
    {
      path: '',
      canActivateChild: [],
      component: AdminLayout,
      children: [
        {
          path: 'home',
          loadComponent: () => import('./pages/admin/home/home.page'),
        },
        {
          path: 'sound-request',
          children: [
            {
              path: '',
              loadComponent: () => import('./pages/admin/sound-request/sound-request.page'),
            },
            {
              path: ':soundRequestId',
              loadComponent: () => import('./pages/admin/sound-request/sound-request-detail/sound-request-detail.page'),
            }
          ]
        }
      ]
    }
  ]
}
];
