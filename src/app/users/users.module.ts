import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenService } from '../core/interceptors/token.service';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { UserComponent } from './components/user/user.component';
import { ToggleButtonModule } from 'primeng/togglebutton';


import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';



@NgModule({
  declarations: [
    ListUsersComponent,
    UserComponent,
    
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ToggleButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
    PasswordModule
  ],
  providers:[{ provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true }]
})
export class UsersModule { }
