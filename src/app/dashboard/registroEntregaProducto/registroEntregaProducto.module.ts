import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewRegistroEntregaProductoComponent } from './new.registroEntregaProducto.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VehiculoService } from '../../services/vehiculo.service';
import { SelectModule } from 'angular2-select';
import { showRegistroEntregaProductoComponent } from './show/showRegistroEntregaProducto.component';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [NewRegistroEntregaProductoComponent, showRegistroEntregaProductoComponent],
    exports: [NewRegistroEntregaProductoComponent, showRegistroEntregaProductoComponent],
    providers:[VehiculoService]
})

export class registroEntregaProductoModule { }
