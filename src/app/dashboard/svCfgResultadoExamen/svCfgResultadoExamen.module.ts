import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgResultadoExamenComponent } from './svCfgResultadoExamen.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgResultadoExamenService } from '../../services/svCfgResultadoExamen.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgResultadoExamenComponent, NewComponent, EditComponent],
    exports: [SvCfgResultadoExamenComponent, NewComponent, EditComponent],
    providers: [SvCfgResultadoExamenService]
})

export class SvCfgResultadoExamenModule { }