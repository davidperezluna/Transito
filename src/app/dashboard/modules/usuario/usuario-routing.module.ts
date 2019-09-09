import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserCfgMenuComponent } from './userCfgMenu/userCfgMenu.component';
import { UserUsuarioMenuComponent } from './userUsuarioMenu/userUsuarioMenu.component';
import { UserEmpresaTransporteComponent } from './userEmpresaTransporte/userEmpresaTransporte.component';
import { UserEmpresaComponent } from './userEmpresa/userEmpresa.component';
import { UserCiudadanoComponent } from './userCiudadano/userCiudadano.component';
import { UserLcCfgRestriccionComponent } from './userLcCfgRestriccion/userLcCfgRestriccion.component';

const routes: Routes = [
  {
    path: 'userCfgMenu',
    component: UserCfgMenuComponent
  },
  {
    path: 'userUsuarioMenu',
    component: UserUsuarioMenuComponent
  },
  {
    path: 'userEmpresaTransporte',
    component: UserEmpresaTransporteComponent
  },
  {
    path: 'userEmpresa',
    component: UserEmpresaComponent
  },
  {
    path: 'userCiudadano',
    component: UserCiudadanoComponent
  },
  {
    path: 'userLcCfgRestriccion',
    component: UserLcCfgRestriccionComponent
  }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
