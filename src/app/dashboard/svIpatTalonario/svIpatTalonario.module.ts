import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvIpatTalonarioComponent } from './svIpatTalonario.component';
import { SvIpatTalonarioService } from '../../services/svIpatTalonario.service';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [SvIpatTalonarioComponent,NewComponent,EditComponent, ShowComponent],
    exports: [SvIpatTalonarioComponent, NewComponent,EditComponent, ShowComponent],
    providers: [SvIpatTalonarioService]
})

export class SvIpatTalonarioModule { }