import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MpersonalAsignacionComponent } from './mpersonalAsignacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MpersonalAsignacionService } from '../../services/mpersonalAsignacion.service';
import { MpersonalComparendoService } from '../../services/mpersonalComparendo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MpersonalAsignacionComponent,NewComponent,EditComponent,ShowComponent],
    exports: [MpersonalAsignacionComponent, NewComponent,EditComponent,ShowComponent],
    providers:[MpersonalAsignacionService,MpersonalComparendoService]
})

export class MpersonalAsignacionModule { }