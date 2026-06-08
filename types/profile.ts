export type Gender = "Male" | "Female";
export type StatusTag = "Active" | "Pending" | "Matched" | "Paused";
export type Preference = "Yes" | "No" | "Maybe";

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  dateOfBirth: string;
  country: string;
  city: string;
  height: number;
  email: string;
  phone: string;
  undergraduateCollege: string;
  degree: string;
  income: number;
  currentCompany: string;
  designation: string;
  maritalStatus: string;
  languagesKnown: string[];
  siblings: number;
  caste: string;
  religion: string;
  wantKids: Preference;
  openToRelocate: Preference;
  openToPets: Preference;
  profilePhoto: string;
  statusTag: StatusTag;
  hobbies: string[];
  diet: "Veg" | "Non-Veg" | "Eggetarian";
  smokingHabits: "Never" | "Occasionally" | "Regularly";
  drinkingHabits: "Never" | "Occasionally" | "Regularly";
  motherTongue: string;
  familyType: "Nuclear" | "Joint";
  familyValues: "Traditional" | "Moderate" | "Liberal";
  manglik: "Yes" | "No" | "Doesn't Matter";
  annualFamilyIncome: number;
  fatherOccupation: string;
  motherOccupation: string;
  aboutMe: string;
}

export interface ScoredMatch extends Profile {
  score: number;
  matchedCriteria: string[];
}
