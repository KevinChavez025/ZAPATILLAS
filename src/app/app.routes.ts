import { Routes } from '@angular/router';
import { Home }       from './Pages/home/home';
import { Productos }  from './Pages/productos/productos';
import { Tiendas }    from './Pages/tiendas/tiendas';
import { GuiaTallas } from './Pages/guia-tallas/guia-tallas';

export const routes: Routes = [
  { path: '',            component: Home },
  { path: 'productos',   component: Productos },
  { path: 'tiendas',     component: Tiendas },
  { path: 'guia-tallas', component: GuiaTallas },
  { path: '**',          redirectTo: '' },
];
