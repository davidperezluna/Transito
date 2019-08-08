import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";

import { CvCdoTrazabilidadService } from '../../../../services/cvCdoTrazabilidad.service';
import { CvCdoComparendoService } from '../../../../services/cvCdoComparendo.service';
import { CvCdoCfgEstadoService } from '../../../../services/cvCdoCfgEstado.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule, TooltipModule],
    declarations: [NewComponent,EditComponent],
    exports: [NewComponent,EditComponent],
    providers:[
        CvCdoTrazabilidadService,
        CvCdoComparendoService,
        CvCdoCfgEstadoService,
    ]
})

export class CvCdoTrazabilidadModule { }
