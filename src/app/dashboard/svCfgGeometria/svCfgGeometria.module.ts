import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgGeometriaComponent } from './svCfgGeometria.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgGeometriaService } from '../../services/svCfgGeometria.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgGeometriaComponent, NewComponent, EditComponent],
    exports: [SvCfgGeometriaComponent, NewComponent, EditComponent],
    providers: [SvCfgGeometriaService]
})

export class SvCfgGeometriaModule { }
