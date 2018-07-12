import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MparqSalidaComponent } from './mparqSalida.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MparqEntradaSalidaService } from '../../services/mparqEntradaSalida.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MparqSalidaComponent,NewComponent,EditComponent],
    exports: [MparqSalidaComponent, NewComponent,EditComponent],
    providers:[MparqEntradaSalidaService]
})

export class MparqSalidaModule { }