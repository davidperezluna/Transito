import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsvRegistroIpatComponent } from './msvRegistroIpat.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MsvRegistroIpatService } from '../../services/msvRegistroIpat.service';

 import { NewComponent } from './new/new.component';
// import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
import { MsvConsecutivoService } from '../../services/msvConsecutivo.service';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MsvRegistroIpatComponent,NewComponent/*,EditComponent*/],
    exports: [MsvRegistroIpatComponent, NewComponent/*,EditComponent*/],
    providers: [MsvRegistroIpatService, MsvConsecutivoService]
})

export class MsvRegistroIpatModule { }