import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
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

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
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
  }

  // submit form button
  submit() {
    this.api.postRegistration(this.registerForm.value).subscribe((res) => {
      this.toastService.success({
        detail: 'Success',
        summary: 'Your Details Added Successfully!',
        duration: 3000,
      });
      this.registerForm.reset();
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
}
