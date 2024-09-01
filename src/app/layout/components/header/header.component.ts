import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  @Input() sidebar:boolean = false;
  // @Input() showSidebar: boolean = false;

  @Output() showSidebar = new EventEmitter<boolean>();


  items: any = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => { /* Handle profile action */ }
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      command: () => { /* Handle settings action */ }
    },
    {
      separator: true
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => { this.logout() }
    }
  ];

  constructor(private router: Router,private messageService: MessageService){}

  logout(){
    localStorage.removeItem('token')
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logout Successfully' });
    this.router.navigate(['login']);
  }


}
