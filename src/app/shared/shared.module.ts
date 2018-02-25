import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsersService } from './services/users.service';

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
      UsersService
    ],
})

export class SharedModule {}
