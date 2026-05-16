export interface BankingService {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

export interface LoanOffer {
  id: string;
  type: 'personal' | 'home' | 'car' | 'education' | 'business';
  title: string;
  interestRate: number;
  maxAmount: number;
  tenure: string;
  description: string;
  features: string[];
}

export interface CreditCard {
  id: string;
  name: string;
  type: 'visa' | 'mastercard' | 'amex';
  category: 'premium' | 'student' | 'business' | 'rewards';
  features: string[];
  benefits: string[];
  image: string;
}

export interface ExchangeRate {
  currency: string;
  code: string;
  buy: number;
  sell: number;
  flag: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  services: string[];
  mapUrl: string;
}

export interface ATM {
  id: string;
  name: string;
  address: string;
  status: 'active' | 'maintenance' | 'out_of_cash';
  features: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  imageUrl: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
