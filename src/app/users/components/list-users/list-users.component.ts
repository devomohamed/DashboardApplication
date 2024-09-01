import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/models/user.model';
import { UserService } from '../../services/user.service';
import { RsponseData } from 'src/app/core/models/response.model';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {
  users: IUser[] = [];
  filterFRM:FormGroup

  constructor(private userService: UserService, private router: Router,private messageService: MessageService, private fb:FormBuilder) {
    this.filterFRM = this.fb.group({
      
    })
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe((users: RsponseData<IUser[]>) => this.users = users.data);
  }

  viewProfile(userId: number) {
    this.router.navigate(['/users/profile', userId]);
  }

  editUser(userId: number) {
    this.router.navigate(['/users/', userId]);
  }


  toggleActivation(userId: number,status:boolean) {
    this.userService.toggleActivation(userId).subscribe(() => {this.messageService.add({ severity: 'success', summary: 'Success', detail: !status?'Deactivated Successfully':'Activated Successfully' }); this.fetchUsers()});
  }

}
