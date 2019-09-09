import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLcCfgCategoriaComponent } from './userLcCfgCategoria.component'
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { UserLcCfgCategoriaService } from '../../../../services/userLcCfgCategoria.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [NewComponent,EditComponent],
    exports: [NewComponent,EditComponent],
    providers:[UserLcCfgCategoriaService]
})

export class UserLcCfgCategoriaModule { }
