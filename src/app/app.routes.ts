import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';

export const routes: Routes = [
  { path: '',            component: Home }, // eager — es la página principal, no lazy
  { path: 'productos',   loadComponent: () => import('./Pages/productos/productos').then(m => m.Productos) },
  { path: 'tiendas',     loadComponent: () => import('./Pages/tiendas/tiendas').then(m => m.Tiendas) },
  { path: 'guia-tallas', loadComponent: () => import('./Pages/guia-tallas/guia-tallas').then(m => m.GuiaTallas) },
  { path: 'nosotros',    loadComponent: () => import('./Pages/nosotros/nosotros').then(m => m.Nosotros) },
  { path: '**',          redirectTo: '' },
];
