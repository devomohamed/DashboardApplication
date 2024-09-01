import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/core/models/user.model';
import { UserService } from '../../services/user.service';
import { CountryService } from '../../services/country.service';
import { Country } from 'src/app/core/models/country.model';
import { RsponseData } from 'src/app/core/models/response.model';
import { UtilsService } from 'src/app/core/services/utils.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  userForm!: FormGroup;
  initialValues: { [key: string]: any } = {};
  isEditMode: boolean = false;
  userId: number | null = null;
  countries:Country[] =[];
  gender = [
    { name: 'Male', code: 'male' },
    { name: 'Female', code: 'female' },
  ]
  userType = [
    { name: 'User', code: 'user' },
    { name: 'Admin', code: 'admin' },
  ]

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private countryService:CountryService,
    private route: ActivatedRoute,
    private router: Router,
    private utils:UtilsService,
    private messageService: MessageService
  ) {
    this.createFormControl()
  }

  patchUserFormValue(user:IUser){
    console.log(user);
    
    this.userForm.patchValue({
      id: user.id,
      name: user.name,
      father_name:user.father_name,
      grandfather_name: user.grandfather_name,
      family_branch_name: user.grandfather_name,
      gender: this.gender.find(gender=>gender.code == user.gender),
      phone: user.phone,
      email: user.email,
      date_of_birth: user.date_of_birth,
      country_id: this.countries.find((country:Country)=>country.id == user.country_id),
      active: user.active,
      phone_code: user.phone_code,
      tribe: user.tribe,
      is_premium: user.is_premium,
      country_code: user.country_code,
      type: this.userType.find(type=>type.code == user.type),
    })
  }

  createFormControl(){
    console.log(this.isEditMode,"this.isEditMode");
    
    if (!this.isEditMode) {
      this.userForm = this.fb.group({
        id: [null],
        name: ['', Validators.required],
        father_name: [''],
        grandfather_name: [''],
        family_branch_name: [''],
        gender: ['', Validators.required],
        phone: ['', [Validators.required,Validators.maxLength(9),Validators.minLength(9)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        password_confirmation: ['', [Validators.required]],
        date_of_birth: ['', [Validators.required]],
        country_id: ['',[Validators.required]],
        active: [1, Validators.required],
        phone_code: [null],
        tribe: [''],
        is_premium: [0],
        country_code: ['', Validators.required],
        type: ['', Validators.required],
      });
    }else{
      this.userForm = this.fb.group({
        id: [null],
        name: ['', Validators.required],
        father_name: [''],
        grandfather_name: [''],
        family_branch_name: [''],
        gender: ['', Validators.required],
        phone: ['', [Validators.required,Validators.maxLength(9),Validators.minLength(9)]],
        email: ['', [Validators.required, Validators.email]],
        date_of_birth: ['', [Validators.required]],
        country_id: ['',[Validators.required]],
        active: [1, Validators.required],
        phone_code: [null],
        tribe: [''],
        is_premium: [0],
        country_code: ['', Validators.required],
        type: ['', Validators.required],
      });
    }

    this.initialValues['userForm'] = this.userForm.getRawValue();

  }

  async ngOnInit() {
    await this.getCountries();
    this.route.paramMap.subscribe(async params => {
      console.log(params);

      this.userId = Number(params.get('id'));
      console.log(this.userId,"this.userId");
      
      if (this.userId ) {
        this.isEditMode = true;
        await this.createFormControl()
        await this.getUserData(this.userId)
      }else{
        this.isEditMode = false;
        this.createFormControl()
      }
    });
  }

  getUserData(userId:number){
    this.userService.getUser(userId).subscribe((response: RsponseData<IUser>) => {
      // this.userForm.patchValue(user);
      this.patchUserFormValue(response.data)
    });
  }

  getCountries(){
    this.countryService.getAllCountries().subscribe(
      (countries:RsponseData<Country[]>)=>{
        this.countries = countries.data
      }
    )
  }

  onSave() {
    if (this.userForm.invalid) return;

    console.log(this.userForm);
    let frm = this.userForm.value;
    let user = {
      ...frm,
      active:frm.active?1:0,
      type:frm.type.code,
      gender:frm.gender.code,
      country_id:frm.country_id.id,
      date_of_birth:this.utils.convertDateToFormat(frm.date_of_birth)
    }

    console.log(user);
    
    

    if (this.isEditMode) {
      if (Object.keys(this.checkChanges()).length > 0) {
        this.userService.updateUser(user).subscribe(() => {
          // Handle success
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated Successfully' });
          this.router.navigate(['/users']); // Redirect to user list or success page
        });
      }
    } else {
      this.userService.createUser(user).subscribe(() => {
        // Handle success
        this.router.navigate(['/users']); // Redirect to user list or success page
      });
    }
  }

  checkChanges(){
    const changedData: { [key: string]: any } = {};
    const userForm = this.utils.getChangesValueFromFormGroup(this.userForm, this.initialValues['userForm']);
    return userForm
  }

  countryChange(country:Country){
    this.userForm.patchValue({
      country_code:country.emoji,
      phone_code:country.phonecode

    })
  }

  onCancel() {
    this.router.navigate(['/users']);
  }
}
