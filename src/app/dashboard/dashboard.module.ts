import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { HomeModule } from './home/home.module';
import { VehiculoModule } from './vehiculo/vehiculo.module';
import { MarcaModule } from './marca/marca.module';
import { DashboardComponent } from './dashboard.component';

import {TopNavComponent} from '../shared/index';
import {SidebarComponent} from '../shared/index';
import {FooterComponent} from '../shared/index';
import {RightsidebarComponent} from '../shared/index';


@NgModule({
    imports: [
        CommonModule,
      RouterModule,
      Ng2BootstrapModule.forRoot(),
      HomeModule,
      VehiculoModule,
      MarcaModule,
    ],
    declarations: [DashboardComponent, TopNavComponent, SidebarComponent, FooterComponent, RightsidebarComponent],
    exports: [DashboardComponent, TopNavComponent, SidebarComponent, FooterComponent, RightsidebarComponent],
    
})

export class DashboardModule { }
