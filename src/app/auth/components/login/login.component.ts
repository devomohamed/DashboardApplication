import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IError } from 'src/app/core/models/error.model';
import { MessageService } from 'primeng/api';
import { IUser } from 'src/app/core/models/user.model';
import { RsponseData } from 'src/app/core/models/response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: any = null;

  constructor(private fb: FormBuilder,private auth:AuthService,private messageService: MessageService,private router:Router) {
    this.loginForm = this.fb.group({
      field: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe((res:RsponseData<IUser>)=>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Successfully' });
        this.setTokenInLocalStorage(res.data.token)
        this.router.navigate(['/']);
      },(err:IError)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
      })
    }
  }

  setTokenInLocalStorage(token:string){
    localStorage.setItem('token',token)
  }
}
