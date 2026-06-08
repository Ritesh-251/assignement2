import fs from "node:fs";

const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow"];
const religions = {
  Hindu: ["Brahmin", "Rajput", "Agarwal", "Kayastha", "Maratha", "Iyer", "Nair", "Baniya"],
  Muslim: ["Sunni", "Shia", "Pathan", "Syed", "Sheikh"],
  Sikh: ["Jat Sikh", "Khatri", "Ramgarhia", "Arora"],
  Christian: ["Roman Catholic", "Protestant", "Syrian Christian", "Goan Catholic"],
  Jain: ["Shwetambar", "Digambar", "Oswal", "Sthanakvasi"],
  Parsi: ["Parsi", "Irani"]
};
const motherTongues = ["Hindi", "Marathi", "Gujarati", "Punjabi", "Tamil", "Telugu", "Bengali", "Kannada", "Malayalam", "Urdu"];
const maleNames = ["Aarav", "Vivaan", "Aditya", "Arjun", "Reyansh", "Kabir", "Ishaan", "Rohan", "Kunal", "Nikhil", "Samar", "Dev", "Aniket", "Rahul", "Varun", "Siddharth", "Akshay", "Raghav", "Yash", "Pranav", "Karan", "Ritvik", "Aman", "Harsh", "Dhruv", "Mihir", "Neel", "Sahil", "Tanish", "Vikram", "Abhay", "Armaan", "Rishi", "Manav", "Omkar", "Naveen", "Rajat", "Sameer", "Tejas", "Uday", "Zubin", "Farhan", "Ayaan", "Gurpreet", "Christopher", "Neil", "Darshan", "Mayank", "Parth", "Saurabh", "Rakesh", "Amit", "Irfan", "Jaspreet", "Rohan"];
const femaleNames = ["Aanya", "Diya", "Anika", "Sara", "Meera", "Ira", "Kiara", "Riya", "Tara", "Nisha", "Pooja", "Sneha", "Kavya", "Ananya", "Avni", "Priya", "Simran", "Aditi", "Ishita", "Radhika", "Tanvi", "Shruti", "Neha", "Maya", "Sanya", "Rhea", "Anushka", "Mahika", "Jhanvi", "Naina", "Divya", "Esha", "Fatima", "Zara", "Gurleen", "Alisha", "Natasha", "Pearl", "Dimple", "Krisha", "Bhavya", "Vaishnavi", "Shreya", "Trisha", "Mitali", "Roshni", "Ritu", "Sakshi", "Juhi", "Pallavi", "Rumana", "Jasleen", "Mira", "Noor", "Leah"];
const lastNames = ["Sharma", "Mehta", "Kapoor", "Iyer", "Reddy", "Nair", "Bose", "Patel", "Khan", "Singh", "Gill", "Fernandes", "D'Souza", "Jain", "Sethna", "Agarwal", "Malhotra", "Chopra", "Kulkarni", "Joshi", "Gupta", "Banerjee", "Desai", "Bhatia", "Saxena"];
const colleges = ["St. Xavier's College Mumbai", "Delhi University", "IIT Bombay", "IIT Delhi", "BITS Pilani", "Christ University Bangalore", "Loyola College Chennai", "Fergusson College Pune", "Jadavpur University", "Nirma University"];
const degrees = ["B.Tech Computer Science", "MBBS", "B.Com Honours", "LLB", "MBA", "B.Des", "BA Economics", "B.Sc Statistics", "B.Arch", "Chartered Accountancy"];
const careers = [
  ["Infosys", "Software Engineer", 1800000],
  ["Apollo Hospitals", "Doctor", 2400000],
  ["Deloitte", "CA", 2200000],
  ["Khaitan & Co", "Lawyer", 2000000],
  ["HDFC Bank", "Banker", 1600000],
  ["Studio Lotus", "Designer", 1200000],
  ["IIM Ahmedabad", "Professor", 2600000],
  ["Government of India", "IAS Officer", 1800000],
  ["Nykaa", "Marketing Manager", 1700000],
  ["Urban Company", "Entrepreneur", 3500000],
  ["TCS", "Product Manager", 2800000],
  ["Max Healthcare", "Surgeon", 4200000],
  ["EY", "Investment Analyst", 1900000],
  ["AZB & Partners", "Legal Counsel", 3000000],
  ["Razorpay", "Data Scientist", 3200000]
];
const hobbies = ["Travel", "Classical Music", "Reading", "Tennis", "Yoga", "Cooking", "Theatre", "Photography", "Trekking", "Badminton", "Art", "Volunteering", "Dancing", "Films", "Cycling"];
const fatherJobs = ["Business Owner", "Retired Banker", "Professor", "Chartered Accountant", "Civil Engineer", "Doctor", "Government Officer", "Lawyer"];
const motherJobs = ["Homemaker", "Teacher", "Doctor", "Boutique Owner", "Professor", "Bank Manager", "Artist", "Social Worker"];
const statuses = ["Active", "Pending", "Matched", "Paused"];
const diets = ["Veg", "Non-Veg", "Eggetarian"];
const habits = ["Never", "Occasionally", "Regularly"];
const preferences = ["Yes", "No", "Maybe"];
const values = ["Traditional", "Moderate", "Liberal"];
const familyTypes = ["Nuclear", "Joint"];
const maritalStatuses = ["Never Married", "Divorced", "Widowed"];

function pick(list, i, offset = 0) {
  return list[(i + offset) % list.length];
}

function dobFor(i) {
  const year = 1988 + (i % 15);
  const month = String(1 + ((i * 5) % 12)).padStart(2, "0");
  const day = String(5 + ((i * 7) % 23)).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function profile(gender, i) {
  const global = gender === "Male" ? i : i + 55;
  const religion = pick(Object.keys(religions), global);
  const [company, designation, baseIncome] = pick(careers, global, gender === "Male" ? 0 : 4);
  const firstName = gender === "Male" ? pick(maleNames, i) : pick(femaleNames, i);
  const income = Math.min(8000000, Math.max(400000, baseIncome + ((global * 375000) % 4600000) - 900000));
  const city = pick(cities, global);
  const languageA = pick(motherTongues, global);
  const languageB = pick(motherTongues, global, 3);
  const languageC = pick(["English", "Hindi", "Marathi", "Gujarati", "Tamil", "Telugu"], global, 2);

  return {
    id: `TDC-${String(global + 1).padStart(3, "0")}`,
    firstName,
    lastName: pick(lastNames, global),
    gender,
    dateOfBirth: dobFor(global),
    country: "India",
    city,
    height: gender === "Male" ? 165 + ((i * 3) % 26) : 150 + ((i * 2) % 24),
    email: `${firstName.toLowerCase()}.${pick(lastNames, global).toLowerCase().replace(/[^a-z]/g, "")}@example.com`,
    phone: `+91 9${String(100000000 + global * 73129).slice(0, 9)}`,
    undergraduateCollege: pick(colleges, global),
    degree: pick(degrees, global),
    income,
    currentCompany: company,
    designation,
    maritalStatus: pick(maritalStatuses, global),
    languagesKnown: Array.from(new Set([languageA, languageB, languageC, "English"])).slice(0, 4),
    siblings: global % 4,
    caste: pick(religions[religion], global),
    religion,
    wantKids: pick(preferences, global),
    openToRelocate: pick(preferences, global, 1),
    openToPets: pick(preferences, global, 2),
    profilePhoto: `https://i.pravatar.cc/150?img=${(global % 70) + 1}`,
    statusTag: pick(statuses, global),
    hobbies: [pick(hobbies, global), pick(hobbies, global, 5), pick(hobbies, global, 9)],
    diet: pick(diets, global),
    smokingHabits: global % 9 === 0 ? "Occasionally" : pick(habits, global) === "Regularly" ? "Never" : pick(habits, global),
    drinkingHabits: pick(habits, global, 1),
    motherTongue: languageA,
    familyType: pick(familyTypes, global),
    familyValues: pick(values, global),
    manglik: pick(["Yes", "No", "Doesn't Matter"], global),
    annualFamilyIncome: income + 1200000 + ((global * 525000) % 5200000),
    fatherOccupation: pick(fatherJobs, global),
    motherOccupation: pick(motherJobs, global, 2),
    aboutMe: `${firstName} is a grounded ${designation.toLowerCase()} based in ${city}, with a close-knit family and a thoughtful approach to relationships. Outside work, ${gender === "Male" ? "he" : "she"} enjoys ${pick(hobbies, global).toLowerCase()}, ${pick(hobbies, global, 5).toLowerCase()}, and meaningful conversations over good food.`
  };
}

const profiles = [
  ...Array.from({ length: 105 }, (_, i) => profile("Male", i)),
  ...Array.from({ length: 105 }, (_, i) => profile("Female", i))
];

fs.writeFileSync("data/profiles.json", `${JSON.stringify(profiles, null, 2)}\n`);
