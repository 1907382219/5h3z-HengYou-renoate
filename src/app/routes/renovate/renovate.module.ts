import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { RenovateComponent } from './renovate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadModule } from '@shared/components/upload/upload.module';
import { ApplyComponent } from './apply/apply.component';
import { LogsComponent } from './logs/logs.component';



@NgModule({
    declarations: [
        RenovateComponent,
        ApplyComponent,
        LogsComponent
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        UploadModule,
        RouterModule.forChild([
            {
                path: '',
                component: RenovateComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'apply',
                        pathMatch: 'full'
                    },
                    {
                        path: 'apply',
                        component: ApplyComponent
                    },
                    {
                        path: 'logs',
                        component: LogsComponent
                    },
                ]
            }
        ])
    ]
})
export class RenovateModule { }
