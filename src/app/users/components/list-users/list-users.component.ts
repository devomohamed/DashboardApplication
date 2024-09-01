import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/models/user.model';
import { UserService } from '../../services/user.service';
import { RsponseData } from 'src/app/core/models/response.model';
import { MessageService } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit , OnDestroy {
  users: IUser[] = [];
  filterSubscription!:Subscription
  usersSubscription!:Subscription
  loading:boolean = false;

  userTypes = [
    { label: 'User', value: 'user' },
    { label: 'Admin', value: 'admin' },
  ];

  genders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  premiumOptions = [
    { label: 'Yes', value: 1 },
    { label: 'No', value: 0 },
  ];

  selectedType: string | null = null;
  selectedGender: string | null = null;
  selectedIsPremium: number | null = null;

  constructor(private userService: UserService, private router: Router,private messageService: MessageService) {
  }
  

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true
    this.usersSubscription = this.userService.getUsers().subscribe((users: RsponseData<IUser[]>) => {
      this.users = users.data;
      this.loading = false
    });
  }

  viewProfile(userId: number) {
    this.router.navigate(['/users/profile', userId]);
  }

  editUser(userId: number) {
    this.router.navigate(['/users/', userId]);
  }


  toggleActivation(userId: number,status:boolean) {
    this.userService.toggleActivation(userId).subscribe(() => {this.messageService.add({ severity: 'success', summary: 'Success', detail: !status?'Deactivated Successfully':'Activated Successfully' }); this.filterUsers(0)});
  }

  resetFilters(){
    this.selectedType = null;
    this.selectedGender = null;
    this.selectedIsPremium = null;
    this.filterUsers()
  }

  filterUsers(returnAll = 1){
    const params: any = {};

    if(returnAll == 1){
      this.fetchUsers()
    }else{
      if (this.selectedType) {
        params['type'] = this.selectedType;
      }
  
      if (this.selectedGender) {
        params['gender'] = this.selectedGender;
      }
  
      if (this.selectedIsPremium !== null) {
        params['is_premium'] = this.selectedIsPremium;
      }
    }
    this.loading = true

     this.filterSubscription = this.userService.filterUsers(this.paramsConverter(params)).subscribe((res:any) =>{
      this.users = res.data['data']
      this.loading = false
    })

    // console.log(this.paramsConverter(params));
    
  }

  paramsConverter(params:{}){
    return new URLSearchParams(params).toString()
  }

  ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe()
    }
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe()
    }
  }

}
