import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FroTrteSolicitudRncComponent } from './froTrteSolicitudRnc.component';
import { FroTrteSolicitudService } from '../../services/froTrteSolicitud.service';

import { NewRncSustratoComponent } from './newRncSustrato/newRncSustrato.component';
import { NewRncExpedicionLicenciaComponent } from './rnc/tramiteExpedicionLicencia/newRncExpedicionLicencia.component';
import { NewRncDuplicadoLicenciaComponent } from './rnc/tramiteDuplicadoLicencia/newRncDuplicadoLicencia.component';
import { NewRncExpedicionLicenciaCambioDocumentoComponent } from './rnc/tramiteExpedicionLicenciaCambioDocumento/newRncExpedicionLicenciaCambioDocumento.component';
import { NewRncRecategorizacionLicenciaAbajoComponent } from './rnc/tramiteRecategorizacionLicenciaAbajo/newRncRecategorizacionLicenciaAbajo.component';
import { NewRncRecategorizacionLicenciaArribaComponent } from './rnc/tramiteRecategorizacionLicenciaArriba/newRncRecategorizacionLicenciaArriba.component';
import { NewRncRefrendacionLicenciaComponent } from './rnc/tramiteRefrendacionLicencia/newRncRefrendacionLicencia.component';
import { NewRncComponent } from './newRnc/newRnc.component';
import { EditComponent } from './edit/edit.component';

import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";

import { UserCiudadanoModule } from '../userCiudadano/userCiudadano.module';

@NgModule({
    imports: [
        CommonModule,
        Ng2BootstrapModule.forRoot(),
        SelectModule,
        TooltipModule,
        UserCiudadanoModule
    ],
    declarations: [
        FroTrteSolicitudRncComponent,
        NewRncComponent,
        EditComponent,
        NewRncSustratoComponent,
        NewRncExpedicionLicenciaComponent,
        NewRncDuplicadoLicenciaComponent,
        NewRncExpedicionLicenciaCambioDocumentoComponent,
        NewRncRecategorizacionLicenciaAbajoComponent,
        NewRncRecategorizacionLicenciaArribaComponent,
        NewRncRefrendacionLicenciaComponent
    ],
    exports: [
        FroTrteSolicitudRncComponent,
        NewRncComponent,
        EditComponent,
        NewRncSustratoComponent,
        NewRncExpedicionLicenciaComponent,
        NewRncDuplicadoLicenciaComponent,
        NewRncExpedicionLicenciaCambioDocumentoComponent,
        NewRncRecategorizacionLicenciaAbajoComponent,
        NewRncRecategorizacionLicenciaArribaComponent,
        NewRncRefrendacionLicenciaComponent
    ],
    providers: [FroTrteSolicitudService]
})

export class FroTrteSolicitudRncModule { }
