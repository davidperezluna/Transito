import { Route } from '@angular/router';
import { MsvRegistroIpatComponent } from '.';
import { ExportComponent } from '.';

export const MsvRegistroIpatRoutes: Route[] = [
    {
    path: 'msvRegistroIpat',
    component: MsvRegistroIpatComponent
    },
    {
        path: 'seguridadvial/svregistroipat/export',
        component: ExportComponent
    }
];