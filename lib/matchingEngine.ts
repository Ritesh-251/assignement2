import type { Profile, ScoredMatch } from "@/types/profile";

const familyValueScore: Record<Profile["familyValues"], number> = {
  Traditional: 0,
  Moderate: 1,
  Liberal: 2
};

const industryTiers: Record<string, string[]> = {
  tech: ["software engineer", "product manager", "data scientist", "ux designer"],
  medicine: ["doctor", "surgeon", "dentist", "clinical researcher"],
  finance: ["ca", "banker", "investment analyst", "portfolio manager"],
  law: ["lawyer", "legal counsel"],
  government: ["ias officer", "civil servant", "policy advisor"]
};

function getIndustryTier(designation: string): string {
  const normalized = designation.toLowerCase();
  const found = Object.entries(industryTiers).find(([, titles]) =>
    titles.some((title) => normalized.includes(title))
  );

  return found?.[0] ?? "general";
}

function hasCompatiblePreference(a: string, b: string): boolean {
  return a === b || (a === "Maybe" && b !== "No") || (b === "Maybe" && a !== "No");
}

function hasCompatibleFamilyValues(a: Profile["familyValues"], b: Profile["familyValues"]): boolean {
  return Math.abs(familyValueScore[a] - familyValueScore[b]) <= 1;
}

function scoreMaleCustomer(customer: Profile, candidate: Profile) {
  let score = 0;
  const matchedCriteria: string[] = [];

  if (new Date(candidate.dateOfBirth) > new Date(customer.dateOfBirth)) {
    score += 20;
    matchedCriteria.push("Younger profile");
  }

  if (candidate.income < customer.income) {
    score += 15;
    matchedCriteria.push("Income preference aligned");
  }

  if (candidate.height < customer.height) {
    score += 10;
    matchedCriteria.push("Height preference aligned");
  }

  if (hasCompatiblePreference(customer.wantKids, candidate.wantKids)) {
    score += 20;
    matchedCriteria.push("Compatible on Kids");
  }

  if (customer.religion === candidate.religion) {
    score += 15;
    matchedCriteria.push("Same Religion");
  }

  if (customer.motherTongue === candidate.motherTongue) {
    score += 10;
    matchedCriteria.push("Same Mother Tongue");
  }

  if (hasCompatibleFamilyValues(customer.familyValues, candidate.familyValues)) {
    score += 10;
    matchedCriteria.push("Family Values Aligned");
  }

  return { score, matchedCriteria };
}

function scoreFemaleCustomer(customer: Profile, candidate: Profile) {
  let score = 0;
  const matchedCriteria: string[] = [];

  if (getIndustryTier(customer.designation) === getIndustryTier(candidate.designation)) {
    score += 20;
    matchedCriteria.push("Profession Compatibility");
  }

  if (customer.familyValues === candidate.familyValues) {
    score += 20;
    matchedCriteria.push("Family Values Match");
  }

  if (customer.openToRelocate === "Yes" || candidate.openToRelocate === "Yes") {
    score += 15;
    matchedCriteria.push("Relocation Match");
  }

  if (hasCompatiblePreference(customer.wantKids, candidate.wantKids)) {
    score += 20;
    matchedCriteria.push("Compatible on Kids");
  }

  if (customer.religion === candidate.religion) {
    score += 10;
    matchedCriteria.push("Same Religion");
  }

  if (candidate.income >= customer.income) {
    score += 10;
    matchedCriteria.push("Income Aligned");
  }

  if (customer.diet === candidate.diet) {
    score += 5;
    matchedCriteria.push("Diet Match");
  }

  return { score, matchedCriteria };
}

export function getMatches(customer: Profile, pool: Profile[]): ScoredMatch[] {
  return pool
    .filter((candidate) => candidate.id !== customer.id && candidate.gender !== customer.gender)
    .map((candidate) => {
      const result =
        customer.gender === "Male"
          ? scoreMaleCustomer(customer, candidate)
          : scoreFemaleCustomer(customer, candidate);

      return {
        ...candidate,
        score: result.score,
        matchedCriteria: result.matchedCriteria
      };
    })
    .filter((candidate) => candidate.score >= 40)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}
