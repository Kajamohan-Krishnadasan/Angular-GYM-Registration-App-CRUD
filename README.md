# AngularCRUD

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.2.

## default angular readme

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

`ng test`

### Running end-to-end tests

`ng e2e`

### Further help

`ng help`

## Angular CRUD tutorial

1. Create Angular Project
2. Install required packages
3. Design Header and Form
4. Create Reactive Form

### packages are required

\*_Angular Material_

- <https://material.angular.io/>
- **ng add @angular/material**

\*_Bootstrab_

- <https://getbootstrap.com/>
- add link to index.html

  <!--
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
   -->

\*_Font Awesome_

- <https://fontawesome.com/>
- add link to index.html
<!--
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
-->

\*_Angular popup and Angular confirm box_

- **npm i ng-angular-popup --force**
- **npm i ng-confirm-box --force**

- add to app.module.ts

  <!--
  import { NgConfirmBoxModule } from 'ng-confirm-box';
  import { NgAngularPopupModule } from 'ng-angular-popup';

  @NgModule({
    imports: [
      NgConfirmBoxModule,
      NgAngularPopupModule
    ],
  })
  -->

### Design Header and Form

- create components using **ng g c componentsName**

  1. Create Registration
  2. Registration List
  3. User Details

- inside app-routing.module.ts

  <!-- for routing
    const routes: Routes = [
    { path: '', redirectTo: 'registration', pathMatch: 'full' },
    { path: 'registration', component: RegistrationComponent },
    { path: 'registration-list', component: RegistrationListComponent },
    { path: 'user-details/:id', component: UserDetailsComponent },
    ];
  -->

- inside app.component.html add
  <!-- for routing
    <router-outlet></router-outlet>
  -->

- **MatDatepickerModule** and **MatNativeDateModule** are required for datepicker

### Create Reactive Form

- **npm i @angular/forms**
- import **FormBuilder** and **FormGroup** in component
  **import { FormBuilder, FormGroup } from '@angular/forms';**
  public registerForm!: FormGroup;

- Constructor to initialize form
  <!--
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private toastService: NgToastService
  ) {

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: [''],
    });
  -->

- this will display the value of height in bmi and bmiResult
  <!--
    this.registerForm.controls['height'].valueChanges.subscribe((res) => {
      this.calculateBMI(res);
    });
  }
  -->

- calculate BMI
  <!--
  calculateBMI(heightValue: number) {
    const weight = this.registerForm.value.weight;
    const height = heightValue;
    const bmi = weight / (height \* height);
  -->

  - display the bmi value
  <!--
      this.registerForm.controls['bmi'].patchValue(bmi.toFixed(2));
  -->

  - check the bmi result
  <!--
      if (bmi < 18.5) {
        this.registerForm.controls['bmiResult'].patchValue('Underweight');
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        this.registerForm.controls['bmiResult'].patchValue('Normal');
      } else if (bmi >= 25 && bmi <= 29.9) {
        this.registerForm.controls['bmiResult'].patchValue('Overweight');
      } else {
        this.registerForm.controls['bmiResult'].patchValue('Obese');
      }
    }
  -->

- if value is not entered in weight then height will be readonly
  [readonly]="!this.registerForm.value?.weight"

- access form value
  - **this.registerForm.value.elementFormControlName** // here elementFormControlName is varies

### Create API service

- using json-server: **npm i -g json-server**
- create db.json file: **json-server --watch db.json**
- create api.service.ts: **ng g s api**
- import **HttpClientModule** in app.module.ts

- angular popup: **import { NgToastService } from 'ng-angular-popup';**
- add submit button click function
  <!--
  submit() {
    this.api.postRegistration(this.registerForm.value).subscribe( res =>{
      this.toastService.success({
        detail: "success", // title of the popup
        summary: "Entered Added", // message of the popup
        duration: 3000  // duration of the popup to hide
        });
      this.registerForm.reset();
    })
  }

  -->

  - success : green color, warning: orange, error: red color, info: blue color
