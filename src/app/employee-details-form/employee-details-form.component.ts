import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { EmployeeDetailsFormService } from './employee-details-form.service';
import { Department, EmployeeData } from 'src/types/types';

@Component({
  selector: 'app-employee-details-form',
  templateUrl: './employee-details-form.component.html',
  styleUrls: ['./employee-details-form.component.css'],
})
export class EmployeeDetailsFormComponent implements OnInit {
  departments: string[] = [];
  expertiseLevels: string[] = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Master',
  ];
  interestsList: string[] = [
    'Frontend',
    'Backend',
    'Testing and Maintenance',
    'Product Management',
    'UX Design',
  ];
  departmentDetails: Department[] = [];

  workingHrs: number = 5;
  max: number = 10;
  min: number = 5;
  step: number = 1;

  departmentSelect: string = '';
  teams: string[] | undefined = [];

  profilePic!: File;
  profilePicSrc: string = 'assets/img-placeholder.jpeg';

  employeeForm: FormGroup = this.fb.group({
    employeeId: '',
    fullName: '',
    dateOfBirth: '',
    department: '',
    team: '',
    techExpertise: this.fb.array([]),
    areasOfInterests: '',
    preferredWorkingHrs: 5,
  });

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeDetailsFormService
  ) {}

  ngOnInit(): void {
    this.techExpertise.push(
      this.fb.group({
        technology: '',
        expertise: '',
      })
    );

    this.employeeService.fetchDepartmentDetails().subscribe((response) => {
      for (let [deptName, deptDetails] of Object.entries(response)) {
        this.departmentDetails.push(deptDetails);
        this.departments.push(deptDetails.name);
      }
    });
  }

  get techExpertise(): FormArray {
    return this.employeeForm.controls['techExpertise'] as FormArray;
  }

  addNewTechnology(): void {
    const technologyExpertiseForm: FormGroup = this.fb.group({
      technology: '',
      expertise: '',
    });

    this.techExpertise.push(technologyExpertiseForm);
  }

  removeTechnology(index: number): void {
    if (this.techExpertise.length > 1) {
      this.techExpertise.removeAt(index);
    }
  }

  submitForm(): void {
    let allData: EmployeeData = this.employeeForm.getRawValue();

    // const formData = new FormData();

    // for (let [property, value] of Object.entries(allData)) {
    //   formData.append(property, `${value}`);
    // }
    // formData.append('profilePic', this.profilePic, this.profilePic.name);

    allData = { ...allData, profilePicName: this.profilePic.name };

    this.employeeService.registerEmployee(allData).subscribe((response) => {
      console.log(response);
    });
  }

  onFileSelected(event: any) {
    this.profilePic = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      this.profilePicSrc = e.target?.result as string;
    };

    reader.readAsDataURL(this.profilePic);
  }

  departmentSelectHandler(event: any) {
    let selectedDepartment = event.value.split(' ').join('').toLowerCase();

    this.teams = this.departmentDetails.find(
      (dept) => dept.slug === selectedDepartment
    )?.teams;
  }
}
