export interface Ticket {
  id: string;
  competition: string;
  round: string;
  home: string;
  away: string;
  date: string;
  time: string;
  stadium: string;
  seat: string;
}

export interface PaymentMethod {
  id: string;
  last4: string;
  expiry: string;
  brand: string;
  isPrimary: boolean;
}

export interface FanProfile {
  id: string;
  email: string;
  fullName: string;
  bio: string;
  headline: string;
  jobTitle: string;
  company: string;
  location: string;
  websiteUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  xUrl: string;
  skills: string[];
  tags: string[];
  roles: string[];
  isVerified: boolean;
  completionScore: number;
  joinedYear: string;
  avatarUrl?: string;
  tickets: Ticket[];
  paymentMethods: PaymentMethod[];
  loyaltyXp: number;
  loyaltyLevel: string;
  loyaltyXpToNext: number;
  matchesAttended: number;
  seasonMatchesAttended: number;
  seasonMatchesTotal: number;
  membershipType: string | null;
  membershipExpiresAt: string | null;
}
