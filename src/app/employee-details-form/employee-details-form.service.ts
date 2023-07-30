import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeeData } from 'src/types/types';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDetailsFormService {
  private baseURL = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  fetchDepartmentDetails() {
    return this.http.get<JSON>(this.baseURL + 'departments');
  }

  registerEmployee(employeeDetails: EmployeeData) {
    return this.http.post<EmployeeData>(
      this.baseURL + 'employee',
      employeeDetails
    );
  }
}
