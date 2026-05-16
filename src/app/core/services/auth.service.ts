import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, of, map, forkJoin } from 'rxjs';
import { User, Role, Permission, AuthResponse } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Placeholder for JSON Server
  
  // Using Angular Signals for reactive state
  currentUser = signal<User | null>(null);
  userPermissions = signal<string[]>([]);
  isAuthenticated = signal<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.checkSession();
  }

  private checkSession() {
    const savedUser = localStorage.getItem('rnr_user');
    const savedPerms = localStorage.getItem('rnr_perms');
    if (savedUser && savedPerms) {
      const user = JSON.parse(savedUser);
      this.currentUser.set(user);
      this.userPermissions.set(JSON.parse(savedPerms));
      this.isAuthenticated.set(true);

      // If role is missing (due to model update), re-fetch role name
      if (!user.role && user.roleId) {
        this.http.get<Role>(`${this.apiUrl}/roles/${user.roleId}`).subscribe(role => {
          user.role = role.name;
          this.currentUser.set(user);
          localStorage.setItem('rnr_user', JSON.stringify(user));
        });
      }
    }
  }

  login(credentials: any): Observable<AuthResponse> {
    // For JSON Server, we'll simulate it by fetching the user by email
    return this.http.get<User[]>(`${this.apiUrl}/users?email=${credentials.email}`).pipe(
      map(users => {
        if (users.length > 0) {
          const user = users[0];
          // Basic password check (in a real app, this is done server-side)
          if ((user as any).password === credentials.password) {
            return { token: 'mock-jwt-token', user };
          }
          throw new Error('Invalid password');
        }
        throw new Error('User not found');
      }),
      tap(response => this.handleAuthSuccess(response))
    );
  }

  private handleAuthSuccess(response: AuthResponse) {
    const user = response.user;
    
    // Fetch role details, permissions, and employee info
    const requests: any = {
      role: this.http.get<Role>(`${this.apiUrl}/roles/${user.roleId}`),
      perms: this.fetchPermissions(user.roleId)
    };

    if (user.employeeId) {
      requests.employee = this.http.get<any>(`${this.apiUrl}/employees/${user.employeeId}`);
    }

    forkJoin(requests).subscribe((results: any) => {
      user.role = results.role.name;
      if (results.employee) {
        user.branchId = results.employee.branchId;
      }
      
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
      this.userPermissions.set(results.perms);
      
      localStorage.setItem('rnr_token', response.token);
      localStorage.setItem('rnr_user', JSON.stringify(user));
      localStorage.setItem('rnr_perms', JSON.stringify(results.perms));
    });
  }

  private fetchPermissions(roleId: string): Observable<string[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rolePermissions?roleId=${roleId}`).pipe(
      map(rp => rp.map(item => item.permissionId))
    );
  }

  logout() {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.userPermissions.set([]);
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  hasPermission(permissionCode: string): boolean {
    return this.userPermissions().includes(permissionCode);
  }

  hasRole(roleCode: string): boolean {
    const user = this.currentUser();
    if (!user) return false;
    
    // Super Admin has all access
    if (user.roleId === 'ROL-001') return true;

    // ROL-001: SUPER_ADMIN, ROL-002: HO_ADMIN, ROL-003: BRANCH_MANAGER
    // ROL-004: KYC_OFFICER, ROL-005: LOAN_OFFICER, ROL-006: CUSTOMER
    
    const roleMap: Record<string, string> = {
      'ROL-001': 'ADMIN',
      'ROL-002': 'ADMIN',
      'ROL-003': 'MANAGER',
      'ROL-004': 'KYC_OFFICER',
      'ROL-005': 'LOAN_OFFICER',
      'ROL-006': 'CUSTOMER',
      'ROL-007': 'CASHIER'
    };

    const userRole = roleMap[user.roleId];
    
    if (roleCode === 'EMPLOYEE') {
      return userRole !== 'CUSTOMER';
    }

    return userRole === roleCode;
  }

  updateCurrentUser(updatedData: Partial<User>) {
    const current = this.currentUser();
    if (current) {
      const updatedUser = { ...current, ...updatedData };
      this.currentUser.set(updatedUser);
      localStorage.setItem('rnr_user', JSON.stringify(updatedUser));
    }
  }

  getDashboardPath(): string {
    const user = this.currentUser();
    if (user?.roleId === 'ROL-006') return '/customer/dashboard';
    if (user?.roleId === 'ROL-001' || user?.roleId === 'ROL-002') return '/admin/dashboard';
    if (user?.roleId === 'ROL-007') return '/cashier/dashboard';
    return '/employee/dashboard';
  }
}
