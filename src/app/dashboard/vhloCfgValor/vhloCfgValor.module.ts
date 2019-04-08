import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgValorComponent } from './vhloCfgValor.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloValorService } from '../../services/vholCfgValor.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloCfgValorComponent,NewComponent,EditComponent],
    exports: [VhloCfgValorComponent, NewComponent,EditComponent],
    providers:[VhloValorService]
})

export class VhloCfgValorModule { } 
