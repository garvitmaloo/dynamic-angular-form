export interface Department {
  name: string;
  slug: string;
  teams: string[];
  headOfDepartment: string;
}

export interface TechExpertise {
  technology: string;
  expertise: string;
}

export interface EmployeeData {
  employeeId: string;
  profilePicName: string;
  fullName: string;
  dateOfBirth: Date;
  department: string;
  team: string;
  techExpertise: TechExpertise[];
  areasOfInterest: string[];
  preferredWorkingHours: number;
}
