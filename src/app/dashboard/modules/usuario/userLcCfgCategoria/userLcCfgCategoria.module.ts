import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLcCfgCategoriaComponent } from './userLcCfgCategoria.component'
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { UserLcCfgCategoriaService } from '../../../../services/userLcCfgCategoria.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [UserLcCfgCategoriaComponent,NewComponent,EditComponent],
    exports: [UserLcCfgCategoriaComponent, NewComponent,EditComponent],
    providers:[UserLcCfgCategoriaService]
})

export class UserLcCfgCategoriaModule { }