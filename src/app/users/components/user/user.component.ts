import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/core/models/user.model';
import { UserService } from '../../services/user.service';
import { CountryService } from '../../services/country.service';
import { Country } from 'src/app/core/models/country.model';
import { RsponseData } from 'src/app/core/models/response.model';
import { UtilsService } from 'src/app/core/services/utils.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  initialValues: { [key: string]: any } = {};
  isEditMode = false;
  userId: number | null = null;
  countries: Country[] = [];
  gender = [
    { name: 'Male', code: 'male' },
    { name: 'Female', code: 'female' },
  ];
  userType = [
    { name: 'User', code: 'user' },
    { name: 'Admin', code: 'admin' },
  ];

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private router: Router,
    private utils: UtilsService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.loadCountries();
    this.handleRouteParams();
  }

  private initializeForm() {
    this.userForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      father_name: [''],
      grandfather_name: [''],
      family_branch_name: [''],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', this.isEditMode ? [] : [Validators.required]],
      password_confirmation: ['', this.isEditMode ? [] : [Validators.required]],
      date_of_birth: ['', Validators.required],
      country_id: ['', Validators.required],
      active: [1, Validators.required],
      phone_code: [null],
      tribe: [''],
      is_premium: [0],
      country_code: ['', Validators.required],
      type: ['', Validators.required],
    });

    this.initialValues['userForm'] = this.userForm.getRawValue();
  }

  private loadCountries() {
    const countrySubscription = this.countryService.getAllCountries().subscribe((response: RsponseData<Country[]>) => {
      this.countries = response.data;
    });
    this.subscriptions.push(countrySubscription);
  }

  private handleRouteParams() {
    const routerSubscription = this.route.paramMap.subscribe(params => {
      this.userId = Number(params.get('id'));
      this.isEditMode = !!this.userId;
      this.initializeForm();

      if (this.isEditMode) {
        this.loadUserData(this.userId);
      }
    });

    this.subscriptions.push(routerSubscription);
  }

  private loadUserData(userId: number) {
    const getUserSubscription = this.userService.getUser(userId).subscribe((response: RsponseData<IUser>) => {
      this.patchUserFormValue(response.data);
    });
    this.subscriptions.push(getUserSubscription);
  }

  private patchUserFormValue(user: IUser) {
    this.userForm.patchValue({
      id: user.id,
      name: user.name,
      father_name: user.father_name,
      grandfather_name: user.grandfather_name,
      family_branch_name: user.grandfather_name,
      gender: this.gender.find(gender => gender.code === user.gender),
      phone: user.phone,
      email: user.email,
      date_of_birth: user.date_of_birth,
      country_id: this.countries.find((country: Country) => country.id === user.country_id),
      active: user.active,
      phone_code: user.phone_code,
      tribe: user.tribe,
      is_premium: user.is_premium,
      country_code: user.country_code,
      type: this.userType.find(type => type.code === user.type),
    });
  }

  onSave() {
    if (this.userForm.invalid) return;

    const formValue = this.userForm.value;
    const user = {
      ...formValue,
      active: formValue.active ? 1 : 0,
      type: formValue.type?.code,
      gender: formValue.gender?.code,
      country_id: formValue.country_id?.id,
      date_of_birth: this.utils.convertDateToFormat(formValue.date_of_birth)
    };

    if (this.isEditMode) {
      this.updateUser(user);
    } else {
      this.createUser(user);
    }
  }

  private updateUser(user: any) {
    if (Object.keys(this.checkChanges()).length > 0) {
      const updateSubscription = this.userService.updateUser(user).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated Successfully' });
        this.router.navigate(['/users']);
      });
      this.subscriptions.push(updateSubscription);
    }
  }

  private createUser(user: any) {
    const createSubscription = this.userService.createUser(user).subscribe(() => {
      this.router.navigate(['/users']);
    });
    this.subscriptions.push(createSubscription);
  }

  checkChanges() {
    return this.utils.getChangesValueFromFormGroup(this.userForm, this.initialValues['userForm']);
  }

  countryChange(country: Country) {
    this.userForm.patchValue({
      country_code: country.iso2,
      phone_code: country.phonecode
    });
  }

  onCancel() {
    this.router.navigate(['/users']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
