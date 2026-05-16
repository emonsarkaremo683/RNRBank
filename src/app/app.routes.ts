import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout';
import { AdminLayoutComponent } from './admin/layouts/admin-layout/admin-layout';
import { authGuard, guestGuard } from './core/guards/auth.guard';

import { CustomerLayoutComponent } from './customer/layouts/customer-layout/customer-layout';
import { EmployeeLayoutComponent } from './employee/layouts/employee-layout/employee-layout';
import { OperationsLayoutComponent } from './operations/layouts/operations-layout/operations-layout';
import { SecurityLayoutComponent } from './security/layouts/security-layout/security-layout';
import { AnalyticsLayoutComponent } from './analytics/layouts/analytics-layout/analytics-layout';
import { CashierLayoutComponent } from './cashier/layouts/cashier-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./public/pages/home/home').then(m => m.HomeComponent)
      },
      {
        path: 'about',
        loadComponent: () => import('./public/pages/about/about').then(m => m.AboutComponent)
      },
      {
        path: 'services',
        children: [
          {
            path: '',
            loadComponent: () => import('./public/pages/services/services').then(m => m.ServicesComponent)
          },
          {
            path: 'savings',
            loadComponent: () => import('./public/pages/account-types/account-types').then(m => m.AccountTypesComponent)
          },
          {
            path: 'current',
            loadComponent: () => import('./public/pages/account-types/account-types').then(m => m.AccountTypesComponent)
          },
          {
            path: 'loans/:type',
            loadComponent: () => import('./public/pages/loans/loans').then(m => m.LoansComponent)
          },
          {
            path: 'cards',
            loadComponent: () => import('./public/pages/cards/cards').then(m => m.CardsComponent)
          },
          {
            path: 'mobile-banking',
            loadComponent: () => import('./public/pages/mobile-banking/mobile-banking').then(m => m.MobileBankingComponent)
          },
          {
            path: 'forex',
            loadComponent: () => import('./public/pages/forex/forex').then(m => m.ForexComponent)
          }
        ]
      },
      {
        path: 'locators',
        children: [
          {
            path: 'branches',
            loadComponent: () => import('./public/pages/branch-locator/branch-locator').then(m => m.BranchLocatorComponent)
          }
        ]
      },
      {
        path: 'faq',
        loadComponent: () => import('./public/pages/faq/faq').then(m => m.FaqComponent)
      },
      {
        path: 'investors',
        loadComponent: () => import('./public/pages/investors/investors').then(m => m.InvestorsComponent)
      },
      {
        path: 'careers',
        loadComponent: () => import('./public/pages/careers/careers').then(m => m.CareersComponent)
      },
      {
        path: 'news',
        loadComponent: () => import('./public/pages/news/news').then(m => m.NewsComponent)
      },
      {
        path: 'security',
        loadComponent: () => import('./public/pages/security-awareness/security-awareness').then(m => m.SecurityAwarenessComponent)
      },
      {
        path: 'kyc',
        loadComponent: () => import('./public/pages/kyc-info/kyc-info').then(m => m.KycInfoComponent)
      },
      {
        path: 'terms',
        loadComponent: () => import('./public/pages/terms/terms').then(m => m.TermsComponent)
      },
      {
        path: 'privacy',
        loadComponent: () => import('./public/pages/privacy/privacy').then(m => m.PrivacyComponent)
      },
      {
        path: 'help',
        loadComponent: () => import('./public/pages/help-support/help-support').then(m => m.HelpSupportComponent)
      },
      {
        path: 'contact',
        loadComponent: () => import('./public/pages/contact/contact').then(m => m.ContactComponent)
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/pages/login/login').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/pages/register/register').then(m => m.RegisterComponent)
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./auth/pages/forgot-password/forgot-password').then(m => m.ForgotPasswordComponent)
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./auth/pages/reset-password/reset-password').then(m => m.ResetPasswordComponent)
      },
      {
        path: 'otp',
        loadComponent: () => import('./auth/pages/otp-verification/otp-verification').then(m => m.OtpVerificationComponent)
      }
    ]
  },
  {
    path: 'customer',
    component: CustomerLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./customer/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: 'accounts',
        loadComponent: () => import('./customer/accounts/accounts').then(m => m.AccountsComponent)
      },
      {
        path: 'transactions',
        loadComponent: () => import('./customer/transactions/transactions').then(m => m.TransactionsComponent)
      },
      {
        path: 'beneficiaries',
        loadComponent: () => import('./customer/beneficiaries/beneficiaries').then(m => m.BeneficiariesComponent)
      },
      {
        path: 'cards',
        loadComponent: () => import('./customer/cards/cards').then(m => m.CardsComponent)
      },
      {
        path: 'loans',
        loadComponent: () => import('./customer/loans/loans').then(m => m.LoansComponent)
      },
      {
        path: 'mobile-banking',
        loadComponent: () => import('./customer/mobile-banking/mobile-banking').then(m => m.MobileBankingComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./customer/profile/profile').then(m => m.ProfileComponent)
      },
      {
        path: 'notifications',
        loadComponent: () => import('./customer/notifications/notifications').then(m => m.NotificationsComponent)
      },
      {
        path: 'support',
        loadComponent: () => import('./customer/support/support').then(m => m.SupportComponent)
      },
      {
        path: 'security',
        loadComponent: () => import('./customer/security/security').then(m => m.SecurityComponent)
      }
    ]
  },
  {
    path: 'employee',
    component: EmployeeLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./employee/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: 'ess',
        loadComponent: () => import('./employee/ess/ess').then(m => m.EssComponent)
      },
      {
        path: 'customers',
        loadComponent: () => import('./employee/customers/customers').then(m => m.CustomersComponent)
      },
      {
        path: 'kyc',
        loadComponent: () => import('./employee/kyc/kyc').then(m => m.KycComponent)
      },
      {
        path: 'accounts',
        loadComponent: () => import('./employee/accounts/accounts').then(m => m.AccountsComponent)
      },
      {
        path: 'transactions',
        loadComponent: () => import('./employee/transactions/transactions').then(m => m.TransactionsComponent)
      },
      {
        path: 'loans',
        loadComponent: () => import('./employee/loans/loans').then(m => m.LoansComponent)
      },
      {
        path: 'atm',
        loadComponent: () => import('./employee/atm/atm').then(m => m.AtmComponent)
      },
      {
        path: 'cards',
        loadComponent: () => import('./employee/cards/cards').then(m => m.CardsComponent)
      },
      {
        path: 'cash-operations',
        loadComponent: () => import('./employee/cash-operations/cash-operations').then(m => m.CashOperationsComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./employee/reports/reports').then(m => m.ReportsComponent)
      },
      {
        path: 'notifications',
        loadComponent: () => import('./employee/notifications/notifications').then(m => m.NotificationsComponent)
      },
      {
        path: 'tasks',
        loadComponent: () => import('./employee/tasks/tasks').then(m => m.TasksComponent)
      }
    ]
  },
  {
    path: 'operations',
    component: OperationsLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./operations/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: 'accounts',
        loadComponent: () => import('./operations/accounts/accounts').then(m => m.AccountsComponent)
      },
      {
        path: 'transactions',
        loadComponent: () => import('./operations/transactions/transactions').then(m => m.TransactionsComponent)
      },
      {
        path: 'cash',
        loadComponent: () => import('./operations/cash/cash').then(m => m.CashComponent)
      },
      {
        path: 'transfers',
        loadComponent: () => import('./operations/transfers/transfers').then(m => m.TransfersComponent)
      },
      {
        path: 'beneficiaries',
        loadComponent: () => import('./operations/beneficiaries/beneficiaries').then(m => m.BeneficiariesComponent)
      },
      {
        path: 'statements',
        loadComponent: () => import('./operations/statements/statements').then(m => m.StatementsComponent)
      },
      {
        path: 'mobile-banking',
        loadComponent: () => import('./operations/mobile-banking/mobile-banking').then(m => m.MobileBankingComponent)
      },
      {
        path: 'teller',
        loadComponent: () => import('./operations/teller/teller').then(m => m.TellerComponent)
      },
      {
        path: 'branch',
        loadComponent: () => import('./operations/branch/branch').then(m => m.BranchComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./operations/reports/reports').then(m => m.ReportsComponent)
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./admin/pages/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: 'branches',
        loadComponent: () => import('./admin/pages/branches/branches').then(m => m.BranchesComponent)
      },
      {
        path: 'employees',
        loadComponent: () => import('./admin/pages/employees/employees').then(m => m.EmployeesComponent)
      },
      {
        path: 'customers',
        loadComponent: () => import('./admin/pages/customers/customers').then(m => m.CustomersComponent)
      },
      {
        path: 'kyc',
        loadComponent: () => import('./admin/pages/kyc/kyc').then(m => m.KycComponent)
      },
      {
        path: 'accounts',
        loadComponent: () => import('./admin/pages/accounts/accounts').then(m => m.AccountsComponent)
      },
      {
        path: 'transactions',
        loadComponent: () => import('./admin/pages/transactions/transactions').then(m => m.TransactionsComponent)
      },
      {
        path: 'loans',
        loadComponent: () => import('./admin/pages/loans/loans').then(m => m.LoansComponent)
      },
      {
        path: 'cards',
        loadComponent: () => import('./admin/pages/cards/cards').then(m => m.CardsComponent)
      },
      {
        path: 'atm',
        loadComponent: () => import('./admin/pages/atm/atm').then(m => m.AtmComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./admin/pages/reports/reports').then(m => m.ReportsComponent)
      },
      {
        path: 'hrm',
        loadComponent: () => import('./admin/pages/hrm-dashboard/hrm-dashboard').then(m => m.HrmDashboardComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./admin/pages/settings/settings').then(m => m.SettingsComponent)
      }
    ]
  },
  {
    path: 'security',
    component: SecurityLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./security/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: 'fraud',
        loadComponent: () => import('./security/fraud/fraud').then(m => m.FraudComponent)
      },
      {
        path: 'audit',
        loadComponent: () => import('./security/audit/audit').then(m => m.AuditComponent)
      },
      {
        path: 'sessions',
        loadComponent: () => import('./security/sessions/sessions').then(m => m.SessionsComponent)
      },
      {
        path: 'devices',
        loadComponent: () => import('./security/devices/devices').then(m => m.DevicesComponent)
      },
      {
        path: 'ip-monitoring',
        loadComponent: () => import('./security/ip-monitoring/ip-monitoring').then(m => m.IpMonitoringComponent)
      },
      {
        path: 'compliance',
        loadComponent: () => import('./security/compliance/compliance').then(m => m.ComplianceComponent)
      },
      {
        path: 'aml',
        loadComponent: () => import('./security/aml/aml').then(m => m.AmlComponent)
      },
      {
        path: 'risks',
        loadComponent: () => import('./security/risks/risks').then(m => m.RisksComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./security/reports/reports').then(m => m.ReportsComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./security/pages/security-settings/security-settings').then(m => m.SecuritySettingsComponent)
      }
    ]
  },
  {
    path: 'analytics',
    component: AnalyticsLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'executive', pathMatch: 'full' },
      {
        path: 'executive',
        loadComponent: () => import('./analytics/executive-dashboard/executive-dashboard').then(m => m.ExecutiveDashboardComponent)
      },
      {
        path: 'financial',
        loadComponent: () => import('./analytics/financial/financial').then(m => m.FinancialComponent)
      },
      {
        path: 'transactions',
        loadComponent: () => import('./analytics/transactions/transactions').then(m => m.TransactionsComponent)
      },
      {
        path: 'customers',
        loadComponent: () => import('./analytics/customers/customers').then(m => m.CustomersComponent)
      },
      {
        path: 'branches',
        loadComponent: () => import('./analytics/branches/branches').then(m => m.BranchesComponent)
      },
      {
        path: 'employees',
        loadComponent: () => import('./analytics/employees/employees').then(m => m.EmployeesComponent)
      },
      {
        path: 'loans',
        loadComponent: () => import('./analytics/loans/loans').then(m => m.LoansComponent)
      },
      {
        path: 'atm',
        loadComponent: () => import('./analytics/atm/atm').then(m => m.AtmComponent)
      },
      {
        path: 'fraud',
        loadComponent: () => import('./analytics/fraud/fraud').then(m => m.FraudComponent)
      },
      {
        path: 'bi',
        loadComponent: () => import('./analytics/business-intelligence/business-intelligence').then(m => m.BusinessIntelligenceComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./analytics/reports/reports').then(m => m.ReportsComponent)
      }
    ]
  },
  {
    path: 'cashier',
    component: CashierLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./cashier/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: 'deposits',
        loadComponent: () => import('./cashier/deposits/cash-deposits').then(m => m.CashDepositsComponent)
      },
      {
        path: 'withdrawals',
        loadComponent: () => import('./cashier/withdrawals/cash-withdrawals').then(m => m.CashWithdrawalsComponent)
      },
      {
        path: 'teller-queue',
        loadComponent: () => import('./cashier/teller-queue/teller-queue').then(m => m.TellerQueueComponent)
      },
      {
        path: 'transfers',
        loadComponent: () => import('./cashier/transfers/cash-transfers').then(m => m.CashTransfersComponent)
      },
      {
        path: 'transactions',
        loadComponent: () => import('./cashier/transactions/transactions').then(m => m.TransactionsComponent)
      },
      {
        path: 'daily-summary',
        loadComponent: () => import('./cashier/daily-summary/daily-summary').then(m => m.DailySummaryComponent)
      },
      {
        path: 'vault',
        loadComponent: () => import('./cashier/vault/vault-requests').then(m => m.VaultRequestsComponent)
      },
      {
        path: 'customer-services',
        loadComponent: () => import('./cashier/customer-services/customer-services').then(m => m.CustomerServicesComponent)
      },
      {
        path: 'notifications',
        loadComponent: () => import('./cashier/notifications/notifications').then(m => m.NotificationsComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./cashier/reports/reports').then(m => m.ReportsComponent)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
