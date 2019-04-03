import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BpProyectoComponent } from './bpProyecto.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { BpProyectoService } from '../../services/bpProyecto.service';
import { BpCuentaService } from '../../services/bpCuenta.service';
import { BpActividadService } from '../../services/bpActividad.service';
import { BpInsumoService } from '../../services/bpInsumo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [BpProyectoComponent,NewComponent,EditComponent,ShowComponent],
    exports: [BpProyectoComponent, NewComponent,EditComponent,ShowComponent],
    providers: [BpProyectoService, BpCuentaService, BpActividadService, BpInsumoService]
})

export class BpProyectoModule { }
