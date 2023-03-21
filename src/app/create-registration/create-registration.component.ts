import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss'],
})
export class CreateRegistrationComponent implements OnInit {
  public package: string[] = ['Monthly', 'Quartely', 'Yearly'];
  public Genders: string[] = ['Male', 'Female'];

  public ImportantList: string[] = [
    'Toxi Fat Reduction',
    'Energy and Endurance',
    'Fitness',
    'Building Lean Muscle',
    'Weight Loss',
  ];

  public registerForm!: FormGroup;
  public userIdToUpdate!: number;

  public isUpdateActive: boolean = false;

  /**
   *
   * @param fb
   * @param activatedRoute: get the user information from the url using id
   * @param api
   * @param toastService : show the popup message (success, error or warning)
   */
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private toastService: NgToastService
  ) {}

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

    this.registerForm.controls['height'].valueChanges.subscribe((res) => {
      this.calculateBMI(res);
    });

    this.activatedRoute.params.subscribe((val) => {
      this.userIdToUpdate = val['id'];
      this.api.getRegisterUserById(this.userIdToUpdate).subscribe((res) => {
        this.isUpdateActive = true;
        this.fillFormUpdate(res);
      });
    });
  }

  // submit form button
  submit() {
    this.api.postRegistration(this.registerForm.value).subscribe((res) => {
      // show the success message
      this.toastService.success({
        detail: 'Success',
        summary: 'Your Details Added Successfully!',
        duration: 3000,
      });

      // reset the form
      this.registerForm.reset();
    });
  }

  // update form button
  update() {
    this.api
      .updateRegisterUser(this.registerForm.value, this.userIdToUpdate)
      .subscribe((res) => {
        this.toastService.success({
          detail: 'Updated Success',
          summary: 'Your Details are Updated Successfully!',
          duration: 3000,
        });

        // reset the form
        this.registerForm.reset();

        // navigate to the list page if the user update is success
        this.router.navigate(['list']);
      });
  }

  // calculate BMI
  calculateBMI(heightValue: number) {
    const weight = this.registerForm.value.weight;
    const height = heightValue;
    const bmi = weight / (height * height);

    this.registerForm.controls['bmi'].patchValue(bmi.toFixed(2));

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

  // fill the form with the user information
  fillFormUpdate(user: User) {
    this.registerForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiResult: user.bmiResult,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      package: user.package,
      important: user.important,
      haveGymBefore: user.haveGymBefore,
      enquiryDate: user.enquiryDate,
    });
  }
}
