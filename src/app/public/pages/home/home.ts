import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MockBankingService } from '../../../services/banking.service';
import { AuthService } from '../../../core/services/auth.service';
import { BankingService, FAQItem, NewsItem, LoanOffer } from '../../../models/banking.models';

interface StatCounter {
  label: string;
  value: string;
  icon: string;
  color: string;
  suffix: string;
}

interface QuickService {
  title: string;
  icon: string;
  color: string;
  bg: string;
  link: string;
  description: string;
}

interface AccountType {
  name: string;
  icon: string;
  color: string;
  badge: string;
  features: string[];
  interest?: string;
  link: string;
}

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
}

interface Branch {
  name: string;
  address: string;
  phone: string;
  manager: string;
  hours: string;
  type: 'branch' | 'sub-branch' | 'atm';
  district: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit, AfterViewInit {
  private bankingService = inject(MockBankingService);
  private authService = inject(AuthService);

  services: BankingService[] = [];
  faqs: FAQItem[] = [];
  news: NewsItem[] = [];
  loanOffers: LoanOffer[] = [];

  selectedDistrict = '';
  selectedArea = '';
  selectedBranchType = 'all';
  activeTestimonialIndex = 0;

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  get dashboardLink(): string {
    return this.authService.getDashboardPath();
  }

  // ---- Quick Services ----
  quickServices: QuickService[] = [
    { title: 'Open Account', icon: 'bi-person-plus-fill', color: 'text-primary', bg: 'bg-primary', link: '/auth/register', description: 'Start your banking journey today' },
    { title: 'Money Transfer', icon: 'bi-arrow-left-right', color: 'text-success', bg: 'bg-success', link: '/services', description: 'Send money instantly & securely' },
    { title: 'Mobile Banking', icon: 'bi-phone-fill', color: 'text-info', bg: 'bg-info', link: '/services/mobile-banking', description: 'Bank from your smartphone' },
    { title: 'ATM Services', icon: 'bi-cash-coin', color: 'text-warning', bg: 'bg-warning', link: '/locators/branches', description: 'Find ATMs near you' },
    { title: 'Loans', icon: 'bi-bank', color: 'text-danger', bg: 'bg-danger', link: '/services/loans/personal', description: 'Quick & easy loan approval' },
    { title: 'Cards', icon: 'bi-credit-card-2-front-fill', color: 'text-purple', bg: 'bg-purple', link: '/services/cards', description: 'Debit & credit cards' },
    { title: 'Bill Payment', icon: 'bi-receipt-cutoff', color: 'text-teal', bg: 'bg-teal', link: '/services', description: 'Pay utility bills instantly' },
    { title: 'Support', icon: 'bi-headset', color: 'text-secondary', bg: 'bg-secondary', link: '/help', description: '24/7 customer assistance' }
  ];

  // ---- Statistics ----
  stats: StatCounter[] = [
    { label: 'Total Customers', value: '2', suffix: 'M+', icon: 'bi-people-fill', color: '#0a3d91' },
    { label: 'Total Branches', value: '150', suffix: '+', icon: 'bi-building-fill', color: '#059669' },
    { label: 'Sub Branches', value: '380', suffix: '+', icon: 'bi-building-add', color: '#d97706' },
    { label: 'ATM Booths', value: '450', suffix: '+', icon: 'bi-cash-coin', color: '#dc2626' },
    { label: 'Daily Transactions', value: '1.2', suffix: 'M+', icon: 'bi-arrow-left-right', color: '#7c3aed' },
    { label: 'Approved Loans', value: '85', suffix: 'K+', icon: 'bi-check-circle-fill', color: '#0891b2' }
  ];

  // ---- Branches ----
  allBranches: Branch[] = [
    { name: 'Dhaka Main Branch', address: 'Motijheel, Dhaka-1000', phone: '+880 2 9570123', manager: 'Md. Karim Hossain', hours: 'Sun–Thu 9AM–4PM', type: 'branch', district: 'Dhaka' },
    { name: 'Gulshan Branch', address: 'Gulshan-2, Dhaka-1212', phone: '+880 2 9890456', manager: 'Ms. Nasrin Akter', hours: 'Sun–Thu 9AM–4PM', type: 'branch', district: 'Dhaka' },
    { name: 'Chittagong Main Branch', address: 'Agrabad, Chittagong-4100', phone: '+880 31 716789', manager: 'Md. Rafiqul Islam', hours: 'Sun–Thu 9AM–4PM', type: 'branch', district: 'Chittagong' },
    { name: 'Sylhet Branch', address: 'Zindabazar, Sylhet-3100', phone: '+880 821 712345', manager: 'Ms. Fatema Begum', hours: 'Sun–Thu 9AM–4PM', type: 'branch', district: 'Sylhet' },
    { name: 'Dhanmondi Sub Branch', address: 'Road 27, Dhanmondi, Dhaka', phone: '+880 2 9124567', manager: 'Md. Arif Hasan', hours: 'Sun–Thu 10AM–3PM', type: 'sub-branch', district: 'Dhaka' },
    { name: 'Uttara Sub Branch', address: 'Sector 7, Uttara, Dhaka', phone: '+880 2 8921345', manager: 'Ms. Rima Khatun', hours: 'Sun–Thu 10AM–3PM', type: 'sub-branch', district: 'Dhaka' },
    { name: 'ATM Booth - Gulshan', address: 'Gulshan Circle-1, Dhaka', phone: '16247', manager: '24/7 Available', hours: '24/7 Open', type: 'atm', district: 'Dhaka' },
    { name: 'ATM Booth - Mirpur', address: 'Mirpur-10, Dhaka', phone: '16247', manager: '24/7 Available', hours: '24/7 Open', type: 'atm', district: 'Dhaka' }
  ];

  get filteredBranches(): Branch[] {
    return this.allBranches.filter(b => {
      const typeMatch = this.selectedBranchType === 'all' || b.type === this.selectedBranchType;
      const districtMatch = !this.selectedDistrict || b.district === this.selectedDistrict;
      return typeMatch && districtMatch;
    });
  }

  filterBranches(type: string): void {
    this.selectedBranchType = type;
  }

  onDistrictChange(event: Event): void {
    this.selectedDistrict = (event.target as HTMLSelectElement).value;
  }

  // ---- Account Types ----
  accountTypes: AccountType[] = [
    {
      name: 'Savings Account',
      icon: 'bi-piggy-bank-fill',
      color: 'primary',
      badge: 'Most Popular',
      interest: '5.5% p.a.',
      features: ['Zero minimum balance', 'Free debit card', 'Online & mobile banking', 'Free ATM withdrawals', 'Interest on daily balance'],
      link: '/services/savings'
    },
    {
      name: 'Current Account',
      icon: 'bi-cash-stack',
      color: 'success',
      badge: 'Business',
      features: ['Overdraft facility', 'Unlimited transactions', 'Business banking portal', 'Multi-user access', 'Bulk payment support'],
      link: '/services/current'
    },
    {
      name: 'Student Account',
      icon: 'bi-mortarboard-fill',
      color: 'warning',
      badge: 'Youth',
      interest: '4.0% p.a.',
      features: ['Zero fee account', 'Student discounts', 'No minimum balance', 'Digital-first banking', 'Education loan benefits'],
      link: '/services'
    },
    {
      name: 'Business Account',
      icon: 'bi-briefcase-fill',
      color: 'danger',
      badge: 'Enterprise',
      features: ['Dedicated RM', 'Priority support', 'Trade finance', 'Bulk payroll', 'FX & hedging solutions'],
      link: '/services'
    },
    {
      name: 'Fixed Deposit',
      icon: 'bi-graph-up-arrow',
      color: 'info',
      badge: 'High Yield',
      interest: '9.0% p.a.',
      features: ['Up to 9% interest', 'Flexible tenures', 'Loan against FD', 'Auto-renewal option', 'Tax benefits available'],
      link: '/services'
    }
  ];

  // ---- Loan Services ----
  loanServices = [
    { title: 'Personal Loan', icon: 'bi-person-check-fill', color: 'primary', amount: '৳50 Lakh', rate: '9%', tenure: '5 yrs', link: '/services/loans/personal' },
    { title: 'Home Loan', icon: 'bi-house-fill', color: 'success', amount: '৳2 Crore', rate: '7.5%', tenure: '20 yrs', link: '/services/loans/home' },
    { title: 'Business Loan', icon: 'bi-briefcase-fill', color: 'warning', amount: '৳5 Crore', rate: '10%', tenure: '10 yrs', link: '/services/loans/business' },
    { title: 'Education Loan', icon: 'bi-mortarboard-fill', color: 'info', amount: '৳20 Lakh', rate: '6%', tenure: '10 yrs', link: '/services/loans/education' },
    { title: 'Car Loan', icon: 'bi-car-front-fill', color: 'danger', amount: '৳40 Lakh', rate: '8%', tenure: '7 yrs', link: '/services/loans/car' }
  ];

  // ---- Mobile Features ----
  mobileFeatures = [
    { icon: 'bi-bar-chart-fill', label: 'Balance Check', desc: 'Real-time account balance' },
    { icon: 'bi-send-fill', label: 'Instant Transfer', desc: 'Send money in seconds' },
    { icon: 'bi-receipt', label: 'Bill Payment', desc: 'Pay all utility bills' },
    { icon: 'bi-phone-fill', label: 'Mobile Recharge', desc: 'Top up any operator' },
    { icon: 'bi-credit-card-2-back-fill', label: 'Card Control', desc: 'Lock/unlock your cards' }
  ];

  // ---- Security Features ----
  securityFeatures = [
    { icon: 'bi-shield-lock-fill', title: '256-bit Encryption', desc: 'Military-grade AES-256 encryption protects all your transactions and data.', color: 'primary' },
    { icon: 'bi-eye-slash-fill', title: 'Fraud Monitoring', desc: 'AI-powered real-time fraud detection running 24/7 across all channels.', color: 'danger' },
    { icon: 'bi-lock-fill', title: 'Secure Transactions', desc: 'Every transaction is secured with tokenization and multi-layer verification.', color: 'success' },
    { icon: 'bi-phone-vibrate-fill', title: 'Multi-factor Auth', desc: 'Biometric + OTP + PIN triple-factor authentication for all logins.', color: 'warning' }
  ];

  // ---- Testimonials ----
  testimonials: Testimonial[] = [
    { name: 'Md. Ariful Islam', role: 'Small Business Owner', avatar: 'AI', rating: 5, comment: 'RNR Bank has transformed how I manage my business finances. The mobile app is exceptional and the loan approval was incredibly fast. Highly recommended!' },
    { name: 'Nasrin Sultana', role: 'University Student', avatar: 'NS', rating: 5, comment: 'The student account is perfect for my needs. Zero fees, easy mobile banking, and the customer support team is always helpful. Great banking experience!' },
    { name: 'Kamal Hossain', role: 'Corporate Executive', avatar: 'KH', rating: 5, comment: 'The enterprise banking solutions at RNR Bank are world-class. The dedicated relationship manager and priority service make a real difference for our business.' },
    { name: 'Fatema Khatun', role: 'Homemaker', avatar: 'FK', rating: 5, comment: 'I love the bill payment feature. I can pay all my utility bills in one place through the mobile app. It saves me so much time every month!' }
  ];

  // ---- Banking Features ----
  bankingFeatures = [
    { icon: 'bi-shield-check-fill', title: 'Secure Banking', desc: 'Bank-grade security with 256-bit SSL encryption and real-time fraud protection.', color: 'primary' },
    { icon: 'bi-lightning-charge-fill', title: 'Real-time Transfers', desc: 'Instant fund transfers to any bank account with BEFTN and RTGS support.', color: 'warning' },
    { icon: 'bi-clock-fill', title: '24/7 ATM Support', desc: 'Access your money anytime at our 450+ ATM booths across the country.', color: 'success' },
    { icon: 'bi-phone-fill', title: 'Digital Banking', desc: 'Complete banking services on mobile and web with intuitive UX.', color: 'info' },
    { icon: 'bi-check2-circle', title: 'Fast Loan Approval', desc: 'Get loan decisions in 24 hours with our streamlined digital process.', color: 'danger' },
    { icon: 'bi-buildings-fill', title: 'Enterprise Security', desc: 'ISO 27001 certified infrastructure with zero-trust security architecture.', color: 'dark' }
  ];

  // ---- News ----
  newsItems: NewsItem[] = [
    { id: '1', title: 'RNR Bank Opens 5 New Branches Across Bangladesh', summary: 'As part of our expansion strategy, we are proud to announce the opening of 5 new branches in key districts.', date: '2026-05-10', category: 'Branch Opening', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80' },
    { id: '2', title: 'Introducing AI-Powered Fraud Detection System', summary: 'RNR Bank launches next-generation AI fraud monitoring to protect customers round the clock.', date: '2026-05-05', category: 'Security', imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80' },
    { id: '3', title: 'New Mobile App 3.0 Released with Enhanced Features', summary: 'Our all-new mobile banking app brings faster performance, biometric login, and a refreshed interface.', date: '2026-04-28', category: 'Product Update', imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80' }
  ];

  // ---- FAQ ----
  faqItems = [
    { q: 'How do I open a bank account at RNR Bank?', a: 'You can open an account online through our website or mobile app in minutes. You will need a valid NID, recent photograph, and initial deposit. Visit our Open Account page to get started.' },
    { q: 'What documents are required for KYC verification?', a: 'For KYC, you need your National ID Card (NID) or passport, recent utility bill for address proof, TIN certificate (for business accounts), and a passport-sized photograph.' },
    { q: 'What is the daily ATM withdrawal limit?', a: 'The standard daily ATM withdrawal limit is ৳50,000. This can be increased up to ৳1,00,000 for premium account holders by contacting your branch or through the mobile app.' },
    { q: 'How long does a fund transfer take?', a: 'RNR-to-RNR transfers are instant 24/7. BEFTN transfers to other banks take 1-2 business days. RTGS transfers for amounts above ৳1 Lakh are processed within same business day.' },
    { q: 'How do I activate mobile banking?', a: 'Download the RNR Bank app from Google Play or App Store, register using your account number and registered mobile number, set a PIN, and activate with OTP verification.' },
    { q: 'What is the interest rate on savings accounts?', a: 'Our standard savings account offers 5.5% per annum interest calculated on daily balance. Fixed deposits offer up to 9% per annum depending on tenure.' }
  ];

  districts = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'];

  ngOnInit(): void {
    this.bankingService.getServices().subscribe({ next: data => this.services = data.slice(0, 8), error: () => {} });
    this.bankingService.getFAQs().subscribe({ next: data => this.faqs = data.length ? data : this.faqItems as any, error: () => { this.faqs = this.faqItems as any; } });
    this.bankingService.getNews().subscribe({ next: data => this.news = data.length ? data : this.newsItems, error: () => { this.news = this.newsItems; } });
  }

  ngAfterViewInit(): void {
    this.startCounterAnimation();
  }

  startCounterAnimation(): void {
    const counters = document.querySelectorAll('.stat-counter');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    counters.forEach(counter => observer.observe(counter));
  }

  nextTestimonial(): void {
    this.activeTestimonialIndex = (this.activeTestimonialIndex + 1) % this.testimonials.length;
  }

  prevTestimonial(): void {
    this.activeTestimonialIndex = (this.activeTestimonialIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  setTestimonial(index: number): void {
    this.activeTestimonialIndex = index;
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
